export const CANONICAL_BASE = "https://futuroperfeito.com.br";

export const buildCanonicalUrl = (pathname: string) => {
  const base = CANONICAL_BASE.replace(/\/+$/, "");
  const path = `/${String(pathname || "").replace(/^\/+/, "").replace(/\/+$/, "")}`;
  return `${base}${path || "/"}`;
};
