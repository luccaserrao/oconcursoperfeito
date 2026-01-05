export type BlogPost = {
  title: string;
  description: string;
  slug: string;
  date: string;
  tags: string[];
  content: string;
};

type FrontMatter = {
  title?: string;
  description?: string;
  slug?: string;
  date?: string;
  tags?: unknown;
};

type ParsedFrontMatter = {
  data: Record<string, unknown>;
  content: string;
};

// Minimal front-matter parser (no Node Buffer) to keep it browser-safe.
const parseFrontMatter = (raw: string): ParsedFrontMatter => {
  const match = raw.match(/^---\s*[\r\n]+([\s\S]*?)\r?\n---\s*[\r\n]*([\s\S]*)$/);
  if (!match) {
    return { data: {}, content: raw };
  }

  const [, frontmatter, body] = match;
  const data: Record<string, unknown> = {};

  frontmatter.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    const separatorIndex = trimmed.indexOf(":");
    if (separatorIndex === -1) return;

    const key = trimmed.slice(0, separatorIndex).trim();
    const rawValue = trimmed.slice(separatorIndex + 1).trim();

    if (!key) return;

    let value: unknown = rawValue;

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

const markdownFiles = import.meta.glob("/content/blog/*.md", {
  import: "default",
  query: "?raw",
  eager: true,
}) as Record<string, string>;

const posts: BlogPost[] = Object.entries(markdownFiles)
  .map(([filePath, fileContent]) => {
    const { data, content } = parseFrontMatter(fileContent);
    const fm = data as FrontMatter;

    const slug =
      fm.slug ??
      filePath
        .split("/")
        .pop()
        ?.replace(".md", "")
        ?.toLowerCase();

    const tags = Array.isArray(fm.tags)
      ? fm.tags.map((tag) => String(tag))
      : [];

    if (!fm.title || !fm.description || !slug || !fm.date) {
      console.warn(`Skipping blog file with missing fields: ${filePath}`);
      return null;
    }

    return {
      title: fm.title,
      description: fm.description,
      slug,
      date: fm.date,
      tags,
      content: content.trim(),
    };
  })
  .filter((post): post is BlogPost => Boolean(post))
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const getAllPosts = (): BlogPost[] => posts;

export const getPostBySlug = (slug?: string): BlogPost | undefined =>
  posts.find((post) => post.slug === slug);
