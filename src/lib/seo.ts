export const CANONICAL_BASE = "https://www.futuroperfeito.com.br";

export const buildCanonicalUrl = (pathname: string) => {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${CANONICAL_BASE}${normalizedPath}`;
};
