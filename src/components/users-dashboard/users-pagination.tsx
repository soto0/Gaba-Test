"use client";

import Link from "next/link";
import * as React from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DashboardUrlState } from "@/lib/dummyjson/parse-dashboard-params";
import type { DashboardHref } from "@/lib/dashboard-url";
import { getPageWindow } from "@/lib/users-dashboard/pagination";

type UsersPaginationProps = {
  url: DashboardUrlState;
  totalPages: number;
  href: DashboardHref;
};

export const UsersPagination = ({
  url,
  totalPages,
  href,
}: UsersPaginationProps) => {
  const pageWindow = React.useMemo(
    () => getPageWindow(url.page, totalPages),
    [url.page, totalPages],
  );

  return (
    <nav
      className="flex flex-col items-center justify-between gap-4 border-t pt-4 sm:flex-row"
      aria-label="Пагинация"
    >
      <p className="text-sm text-muted-foreground">
        Страница {url.page} из {totalPages}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-1">
        {url.page <= 1 ? (
          <span
            className={cn(
              buttonVariants({ size: "sm", variant: "outline" }),
              "pointer-events-none opacity-50",
            )}
          >
            Назад
          </span>
        ) : (
          <Link
            href={href({ page: url.page - 1 })}
            scroll={false}
            className={cn(buttonVariants({ size: "sm", variant: "outline" }))}
          >
            Назад
          </Link>
        )}
        {pageWindow.map((p) => (
          <Link
            key={p}
            href={href({ page: p })}
            scroll={false}
            className={cn(
              buttonVariants({
                size: "sm",
                variant: p === url.page ? "default" : "outline",
              }),
            )}
          >
            {p}
          </Link>
        ))}
        {url.page >= totalPages ? (
          <span
            className={cn(
              buttonVariants({ size: "sm", variant: "outline" }),
              "pointer-events-none opacity-50",
            )}
          >
            Вперёд
          </span>
        ) : (
          <Link
            href={href({ page: url.page + 1 })}
            scroll={false}
            className={cn(buttonVariants({ size: "sm", variant: "outline" }))}
          >
            Вперёд
          </Link>
        )}
      </div>
    </nav>
  );
};
