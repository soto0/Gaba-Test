"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { createDashboardHref } from "@/lib/dashboard-url";
import type { DashboardUrlState } from "@/lib/dummyjson/parse-dashboard-params";

export const useDashboardUrl = (url: DashboardUrlState) => {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  const href = React.useMemo(() => createDashboardHref(url), [url]);

  const replace = React.useCallback(
    (patch: Partial<DashboardUrlState>) => {
      const next = href(patch);
      startTransition(() => {
        router.replace(next);
      });
    },
    [href, router],
  );

  return { href, replace, isPending };
};
