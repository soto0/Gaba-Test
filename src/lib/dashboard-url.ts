import type { DashboardUrlState } from "@/lib/dummyjson/parse-dashboard-params";

export const mergeDashboardUrl = (
  base: DashboardUrlState,
  patch: Partial<DashboardUrlState>,
): DashboardUrlState => ({ ...base, ...patch });

export const createDashboardHref =
  (base: DashboardUrlState) => (patch: Partial<DashboardUrlState>) =>
    serializeDashboardUrl(mergeDashboardUrl(base, patch));

export type DashboardHref = ReturnType<typeof createDashboardHref>;

const defaults: DashboardUrlState = {
  page: 1,
  limit: 20,
  q: "",
  sortBy: "firstName",
  order: "asc",
};

export const serializeDashboardUrl = (state: DashboardUrlState): string => {
  const p = new URLSearchParams();
  if (state.page !== defaults.page) p.set("page", String(state.page));
  if (state.limit !== defaults.limit) p.set("limit", String(state.limit));
  if (state.q) p.set("q", state.q);
  if (state.sortBy !== defaults.sortBy) p.set("sortBy", state.sortBy);
  if (state.order !== defaults.order) p.set("order", state.order);
  const s = p.toString();
  return s ? `/?${s}` : "/";
};
