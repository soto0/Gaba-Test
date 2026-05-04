"use client";

import { useDashboardUrl } from "@/hooks/use-dashboard-url";
import { useDebouncedSearch } from "@/hooks/use-debounced-search";
import { useUserDetail } from "@/hooks/use-user-detail";
import type { UsersDashboardProps } from "@/lib/users-dashboard/types";

import { UserDetailDialog } from "./user-detail-dialog";
import { UserToolbar } from "./user-toolbar";
import { UsersPagination } from "./users-pagination";
import { UsersTable } from "./users-table";

export const UsersDashboard = ({ data, url }: UsersDashboardProps) => {
  const { users, total, limit } = data;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  const { href, replace } = useDashboardUrl(url);
  const { draftQ, setDraftQ } = useDebouncedSearch(url, replace);
  const detail = useUserDetail();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6">
      <UserToolbar
        url={url}
        href={href}
        replace={replace}
        draftQ={draftQ}
        setDraftQ={setDraftQ}
        total={total}
      />

      <div className="overflow-hidden rounded-xl border bg-card">
        <UsersTable users={users} onOpenUser={detail.openUser} />
      </div>

      <UsersPagination url={url} totalPages={totalPages} href={href} />

      <UserDetailDialog
        open={detail.open}
        onOpenChange={detail.onOpenChange}
        loading={detail.loading}
        user={detail.user}
        error={detail.error}
      />
    </div>
  );
};
