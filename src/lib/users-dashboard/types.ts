import type { DashboardUrlState } from "@/lib/dummyjson/parse-dashboard-params";
import type { DummyJsonUsersListResponse } from "@/lib/dummyjson/types";

export type UsersDashboardProps = {
  data: DummyJsonUsersListResponse;
  url: DashboardUrlState;
};
