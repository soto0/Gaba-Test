"use client";

import * as React from "react";

import type { DashboardUrlState } from "@/lib/dummyjson/parse-dashboard-params";
import { SEARCH_DEBOUNCE_MS } from "@/lib/users-dashboard/constants";

export const useDebouncedSearch = (
  url: DashboardUrlState,
  replace: (patch: Partial<DashboardUrlState>) => void,
) => {
  const [draftQ, setDraftQ] = React.useState(url.q);

  React.useEffect(() => {
    const id = window.setTimeout(() => {
      if (draftQ === url.q) return;
      replace({ q: draftQ, page: 1 });
    }, SEARCH_DEBOUNCE_MS);
    return () => window.clearTimeout(id);
  }, [draftQ, replace, url.q]);

  return { draftQ, setDraftQ };
};
