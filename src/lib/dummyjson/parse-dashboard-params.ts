export type DashboardUrlState = {
  page: number;
  limit: number;
  q: string;
  sortBy: string;
  order: "asc" | "desc";
};

const LIMITS = new Set([10, 20, 30]);
const SORT_FIELDS = new Set(["firstName", "lastName", "email"]);

const first = (v: string | string[] | undefined): string | undefined =>
  v === undefined ? undefined : Array.isArray(v) ? v[0] : v;

export const parseDashboardSearchParams = (
  raw: Record<string, string | string[] | undefined>,
): DashboardUrlState => {
  const pageRaw = Number(first(raw.page));
  const page = Number.isFinite(pageRaw) && pageRaw >= 1 ? Math.floor(pageRaw) : 1;

  const limitRaw = Number(first(raw.limit));
  const limit = LIMITS.has(limitRaw) ? limitRaw : 20;

  const q = (first(raw.q) ?? "").trim();

  const sortCandidate = first(raw.sortBy) ?? "firstName";
  const sortBy = SORT_FIELDS.has(sortCandidate) ? sortCandidate : "firstName";

  const orderRaw = (first(raw.order) ?? "asc").toLowerCase();
  const order: "asc" | "desc" = orderRaw === "desc" ? "desc" : "asc";

  return { page, limit, q, sortBy, order };
};

export const skipForPage = (page: number, limit: number): number =>
  (page - 1) * limit;
