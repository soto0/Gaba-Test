import { getDummyJsonBaseUrl } from "@/lib/dummyjson/config";
import { readJson } from "@/lib/dummyjson/read-json";
import type { DummyJsonUserDetail } from "@/lib/dummyjson/types";

export const fetchUserDetail = async (
  id: number,
): Promise<DummyJsonUserDetail> => {
  if (!Number.isFinite(id) || id < 1) {
    throw new Error("Некорректный id");
  }

  const base = getDummyJsonBaseUrl();

  const res = await fetch(`${base}/users/${id}`, { cache: "no-store" });
  const raw = await readJson<Record<string, unknown>>(res);

  delete raw.password;
  delete raw.bank;

  return raw as unknown as DummyJsonUserDetail;
};
