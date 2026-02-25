import { promises as fs } from "fs";
import path from "path";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const CANONICAL_BASE = "https://www.futuroperfeito.com.br";

const parseFrontMatter = (raw) => {
  const match = raw.match(/^---\s*[\r\n]+([\s\S]*?)\r?\n---\s*[\r\n]*([\s\S]*)$/);
  if (!match) {
    return { data: {}, content: raw };
  }

  const [, frontmatter, body] = match;
  const data = {};

  frontmatter.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    const separatorIndex = trimmed.indexOf(":");
    if (separatorIndex === -1) return;

    const key = trimmed.slice(0, separatorIndex).trim();
    const rawValue = trimmed.slice(separatorIndex + 1).trim();
    if (!key) return;

    let value = rawValue;

    if (rawValue.startsWith("[") && rawValue.endsWith("]")) {
      try {
        value = JSON.parse(rawValue.replace(/'/g, '"'));
      } catch {
        value = rawValue
          .slice(1, -1)
          .split(",")
          .map((item) => item.trim().replace(/^["']|["']$/g, ""))
          .filter(Boolean);
      }
    } else {
      value = rawValue.replace(/^["']|["']$/g, "");
    }

    data[key] = value;
  });

  return { data, content: body.trim() };
};

const toIsoDate = (value) => {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toISOString().split("T")[0];
};

const getStaticLastMod = () => {
  const commitTimestamp = process.env.VERCEL_GIT_COMMIT_TIMESTAMP;
  if (commitTimestamp) {
    const parsed = new Date(Number(commitTimestamp) * 1000);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed.toISOString().split("T")[0];
    }
  }
  return new Date().toISOString().split("T")[0];
};

const escapeXml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const buildUrlEntry = ({ loc, lastmod, priority }) => {
  const locTag = `    <loc>${escapeXml(loc)}</loc>`;
  const lastModTag = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : "";
  const priorityTag =
    typeof priority === "number" ? `\n    <priority>${priority.toFixed(1)}</priority>` : "";
  return `  <url>\n${locTag}${lastModTag}${priorityTag}\n  </url>`;
};

const getBlogEntries = async () => {
  let entries = [];
  try {
    entries = await fs.readdir(BLOG_DIR, { withFileTypes: true });
  } catch (error) {
    console.warn("Sitemap: blog directory not found.", error?.message || error);
    return [];
  }

  const resultsBySlug = new Map();
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".md")) continue;
    const filePath = path.join(BLOG_DIR, entry.name);

    let raw = "";
    try {
      raw = await fs.readFile(filePath, "utf8");
    } catch (error) {
      console.warn("Sitemap: failed to read blog file.", entry.name, error?.message || error);
      continue;
    }

    const { data } = parseFrontMatter(raw);
    const title = data.title ? String(data.title).trim() : "";
    const description = data.description ? String(data.description).trim() : "";
    const slug = data.slug
      ? String(data.slug).trim()
      : entry.name.replace(/\.md$/, "").toLowerCase();
    const date = data.date ? String(data.date).trim() : "";
    const lastmod = toIsoDate(date);

    if (!title || !description || !slug || !lastmod) {
      continue;
    }

    const nextEntry = {
      loc: `/blog/${slug}`,
      lastmod,
      priority: 0.7,
    };

    const existing = resultsBySlug.get(slug);
    if (!existing) {
      resultsBySlug.set(slug, nextEntry);
      continue;
    }

    if (existing.lastmod && lastmod && existing.lastmod < lastmod) {
      resultsBySlug.set(slug, nextEntry);
    }

    console.warn("Sitemap: duplicate blog slug detected.", slug, entry.name);
  }

  return Array.from(resultsBySlug.values());
};

export default async function handler(req, res) {
  const baseUrl = CANONICAL_BASE;
  const staticLastMod = getStaticLastMod();

  // Primary routes for the public site.
  const staticRoutes = [
    { loc: "/", priority: 1.0, lastmod: staticLastMod },
    { loc: "/testevocacional", priority: 0.9, lastmod: staticLastMod },
    { loc: "/blog", priority: 0.8, lastmod: staticLastMod },
    { loc: "/terms", priority: 0.3, lastmod: staticLastMod },
    { loc: "/privacy", priority: 0.3, lastmod: staticLastMod },
  ];

  const resultRoutes = [
    { loc: "/resultado/area-administrativa", priority: 0.8, lastmod: staticLastMod },
    { loc: "/resultado/area-tribunais", priority: 0.8, lastmod: staticLastMod },
    { loc: "/resultado/area-policial", priority: 0.8, lastmod: staticLastMod },
    { loc: "/resultado/area-fiscal", priority: 0.8, lastmod: staticLastMod },
  ];

  const blogEntries = await getBlogEntries();

  const allEntries = [...staticRoutes, ...resultRoutes, ...blogEntries].map((entry) => ({
    ...entry,
    loc: `${baseUrl}${entry.loc}`,
  }));

  const urls = allEntries.map(buildUrlEntry).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `${urls}\n` +
    `</urlset>\n`;

  res.setHeader("Content-Type", "application/xml; charset=UTF-8");
  res.setHeader("Cache-Control", "public, max-age=0, s-maxage=300, stale-while-revalidate=3600");
  res.status(200).send(xml);
}
