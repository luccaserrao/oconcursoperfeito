import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { chromium } from "playwright";

const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, "dist");
const BLOG_DIR = path.join(ROOT_DIR, "content", "blog");

const STATIC_ROUTES = [
  "/",
  "/blog",
  "/privacy",
  "/terms",
  "/resultado/area-administrativa",
  "/resultado/area-tribunais",
  "/resultado/area-policial",
  "/resultado/area-fiscal",
];

const getBlogRoutes = () => {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const entries = fs.readdirSync(BLOG_DIR);
  const slugs = new Set();

  for (const entry of entries) {
    if (!entry.endsWith(".md")) continue;
    const filePath = path.join(BLOG_DIR, entry);
    const raw = fs.readFileSync(filePath, "utf8");
    const match = raw.match(/^---\s*[\r\n]+([\s\S]*?)\r?\n---/);
    let slug = "";

    if (match) {
      const frontmatter = match[1];
      for (const line of frontmatter.split(/\r?\n/)) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("slug:")) continue;
        slug = trimmed.slice("slug:".length).trim();
        slug = slug.replace(/^["']|["']$/g, "");
        break;
      }
    }

    if (!slug) {
      slug = entry.replace(/\.md$/, "").toLowerCase();
    }

    if (slug) slugs.add(slug.replace(/^\/+|\/+$/g, ""));
  }

  return Array.from(slugs).sort().map((slug) => `/blog/${slug}`);
};

const normalizeRoute = (routePath) => {
  if (routePath === "/") return "/";
  return routePath.replace(/\/+$/, "");
};

const routes = [
  ...STATIC_ROUTES.map(normalizeRoute),
  ...getBlogRoutes().map(normalizeRoute),
];

const contentTypeFor = (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".html":
      return "text/html; charset=UTF-8";
    case ".js":
      return "text/javascript; charset=UTF-8";
    case ".css":
      return "text/css; charset=UTF-8";
    case ".json":
      return "application/json; charset=UTF-8";
    case ".svg":
      return "image/svg+xml";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".webp":
      return "image/webp";
    default:
      return "application/octet-stream";
  }
};

const startStaticServer = (rootDir) =>
  new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const url = new URL(req.url || "/", "http://localhost");
      let pathname = decodeURIComponent(url.pathname);
      if (pathname.endsWith("/")) {
        pathname = `${pathname}index.html`;
      }

      let filePath = path.join(rootDir, pathname);

      if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
        filePath = path.join(rootDir, "index.html");
      }

      try {
        const content = fs.readFileSync(filePath);
        res.writeHead(200, { "Content-Type": contentTypeFor(filePath) });
        res.end(content);
      } catch (error) {
        res.writeHead(500, { "Content-Type": "text/plain; charset=UTF-8" });
        res.end("Failed to read file.");
      }
    });

    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (!address || typeof address === "string") {
        reject(new Error("Failed to bind server."));
        return;
      }
      resolve({ server, baseUrl: `http://127.0.0.1:${address.port}` });
    });
  });

const writeHtml = (routePath, html) => {
  const targetPath =
    routePath === "/"
      ? path.join(DIST_DIR, "index.html")
      : path.join(DIST_DIR, routePath.replace(/^\//, ""), "index.html");

  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, html, "utf8");
  console.log(`[prerender] ${routePath} -> ${path.relative(ROOT_DIR, targetPath)}`);
};

const prerender = async () => {
  if (!fs.existsSync(path.join(DIST_DIR, "index.html"))) {
    throw new Error("dist/index.html not found. Run `npm run build` first.");
  }

  const { server, baseUrl } = await startStaticServer(DIST_DIR);
  let browser;
  try {
    browser = await chromium.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
    });
  } catch (error) {
    console.error("[prerender] Failed to launch Chromium:", error);
    throw error;
  }
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(20000);
  page.setDefaultTimeout(20000);

  await page.route("**/*", (route) => {
    const requestUrl = route.request().url();
    if (requestUrl.startsWith(baseUrl)) {
      return route.continue();
    }
    return route.abort();
  });

  for (const routePath of routes) {
    const targetUrl = `${baseUrl}${routePath}`;
    await page.goto(targetUrl, { waitUntil: "domcontentloaded" });
    await page.waitForSelector('link[rel="canonical"]', { timeout: 10000 }).catch(() => {});
    const html = await page.content();
    writeHtml(routePath, html);
  }

  await browser.close();
  await new Promise((resolve) => server.close(resolve));
};

prerender().catch((error) => {
  console.error("[prerender] Failed:", error);
  console.error("[prerender] Exiting with error. Check Playwright install and Chromium launch flags.");
  process.exit(1);
});
