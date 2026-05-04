import { getDummyJsonBaseUrl } from "./config";
import { readJson } from "./read-json";
import type { DummyJsonUsersListResponse } from "./types";

export type UsersListQuery = {
  limit: number;
  skip: number;
  q?: string;
  sortBy?: string;
  order?: "asc" | "desc";
};

export const fetchUsersList = async (
  query: UsersListQuery,
): Promise<DummyJsonUsersListResponse> => {
  const base = getDummyJsonBaseUrl();
  const { limit, skip, q, sortBy = "firstName", order = "asc" } = query;
  const trimmed = q?.trim() ?? "";

  const params = new URLSearchParams({
    limit: String(limit),
    skip: String(skip),
  });

  let url: string;
  if (trimmed) {
    params.set("q", trimmed);
    url = `${base}/users/search?${params.toString()}`;
  } else {
    params.set("sortBy", sortBy);
    params.set("order", order);
    url = `${base}/users?${params.toString()}`;
  }

  const res = await fetch(url, { next: { revalidate: 60 } });
  return readJson<DummyJsonUsersListResponse>(res);
};
