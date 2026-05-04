"use client";

import Link from "next/link";
import * as React from "react";

import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { DashboardUrlState } from "@/lib/dummyjson/parse-dashboard-params";
import type { DashboardHref } from "@/lib/dashboard-url";
import {
  PAGE_SIZES,
  SORT_DISABLED_TITLE,
  SORT_FIELD_ITEMS,
  SORT_FIELDS,
  SORT_ORDER_ITEMS,
  SORT_ORDERS,
} from "@/lib/users-dashboard/constants";

type UserToolbarProps = {
  url: DashboardUrlState;
  href: DashboardHref;
  replace: (patch: Partial<DashboardUrlState>) => void;
  draftQ: string;
  setDraftQ: (q: string) => void;
  total: number;
};

export const UserToolbar = ({
  url,
  href,
  replace,
  draftQ,
  setDraftQ,
  total,
}: UserToolbarProps) => {
  const sortDisabled = Boolean(url.q);

  const onSortFieldChange = React.useCallback(
    (next: string | null) => {
      if (!next || sortDisabled) return;
      replace({ sortBy: next, page: 1 });
    },
    [replace, sortDisabled],
  );

  const onSortOrderChange = React.useCallback(
    (next: string | null) => {
      if (!next || sortDisabled) return;
      replace({ order: next as "asc" | "desc", page: 1 });
    },
    [replace, sortDisabled],
  );

  const onSearchChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDraftQ(e.target.value);
    },
    [setDraftQ],
  );

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex max-w-md flex-1 flex-col gap-2">
        <label
          htmlFor="user-search"
          className="text-sm font-medium text-foreground"
        >
          Поиск
        </label>
        <Input
          id="user-search"
          placeholder="Имя, фамилия, email…"
          value={draftQ}
          onChange={onSearchChange}
          autoComplete="off"
        />
        <p className="text-xs text-muted-foreground">
          Найдено записей:{" "}
          <span className="font-medium text-foreground">{total}</span>
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-muted-foreground">
            На странице
          </span>
          <div className="flex gap-1">
            {PAGE_SIZES.map((n) => (
              <Link
                key={n}
                href={href({ limit: n, page: 1 })}
                scroll={false}
                className={cn(
                  buttonVariants({
                    size: "sm",
                    variant: url.limit === n ? "default" : "outline",
                  }),
                )}
              >
                {n}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            Сортировка списка
          </span>
          <div className="flex flex-wrap items-end gap-3">
            <div className="flex min-w-[10.5rem] flex-1 flex-col gap-1 sm:max-w-[12rem]">
              <label
                htmlFor="sort-field"
                className="text-xs text-muted-foreground"
              >
                Поле
              </label>
              <Select
                value={url.sortBy}
                items={SORT_FIELD_ITEMS}
                disabled={sortDisabled}
                onValueChange={onSortFieldChange}
              >
                <SelectTrigger
                  id="sort-field"
                  size="sm"
                  className="w-full"
                  title={sortDisabled ? SORT_DISABLED_TITLE : undefined}
                >
                  <SelectValue placeholder="Выберите поле" />
                </SelectTrigger>
                <SelectContent>
                  {SORT_FIELDS.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex min-w-[11rem] flex-1 flex-col gap-1 sm:max-w-[13rem]">
              <label
                htmlFor="sort-order"
                className="text-xs text-muted-foreground"
              >
                Порядок
              </label>
              <Select
                value={url.order}
                items={SORT_ORDER_ITEMS}
                disabled={sortDisabled}
                onValueChange={onSortOrderChange}
              >
                <SelectTrigger
                  id="sort-order"
                  size="sm"
                  className="w-full"
                  title={sortDisabled ? SORT_DISABLED_TITLE : undefined}
                >
                  <SelectValue placeholder="Порядок" />
                </SelectTrigger>
                <SelectContent>
                  {SORT_ORDERS.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
