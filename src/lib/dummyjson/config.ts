const DEFAULT_BASE = "https://dummyjson.com";

export const getDummyJsonBaseUrl = (): string => {
  const fromEnv = process.env.NEXT_PUBLIC_DUMMYJSON_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  return DEFAULT_BASE;
};
