"use client";

import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import type { DummyJsonUserDetail } from "@/lib/dummyjson/types";
import { roleBadgeVariant } from "@/lib/users-dashboard/format";

type UserDetailDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  loading: boolean;
  user: DummyJsonUserDetail | null;
  error: string | null;
};

export const UserDetailDialog = ({
  open,
  onOpenChange,
  loading,
  user,
  error,
}: UserDetailDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-h-[min(90vh,640px)] overflow-y-auto sm:max-w-lg"
        showCloseButton
      >
        {loading ? (
          <div className="flex flex-col gap-3 py-2">
            <Skeleton className="h-24 w-full rounded-lg" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ) : error ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : user ? (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Image
                src={user.image}
                alt=""
                width={72}
                height={72}
                className="size-[72px] rounded-full border bg-muted object-cover"
              />
              <div>
                <p className="text-base font-semibold">
                  {user.firstName} {user.lastName}
                </p>
                {user.role ? (
                  <Badge className="mt-1" variant={roleBadgeVariant(user.role)}>
                    {user.role}
                  </Badge>
                ) : null}
              </div>
            </div>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-2 text-sm sm:grid-cols-2">
              <DetailItem label="Email" value={user.email} />
              <DetailItem label="Телефон" value={user.phone} />
              <DetailItem label="Пол" value={user.gender} />
              <DetailItem label="Дата рождения" value={user.birthDate} />
              <DetailItem
                label="Университет"
                value={user.university}
                className="sm:col-span-2"
              />
              <DetailItem
                label="Компания"
                value={user.company?.name}
                className="sm:col-span-2"
              />
              <DetailItem label="Должность" value={user.company?.title} />
              <DetailItem label="Отдел" value={user.company?.department} />
              <DetailItem
                label="Адрес"
                value={[
                  user.address?.address,
                  [user.address?.city, user.address?.stateCode]
                    .filter(Boolean)
                    .join(", "),
                  user.address?.country,
                ]
                  .filter(Boolean)
                  .join(" · ")}
                className="sm:col-span-2"
              />
            </dl>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

const DetailItem = ({
  label,
  value,
  className,
}: {
  label: string;
  value?: string | null;
  className?: string;
}) => {
  const v = value?.trim();
  return (
    <div className={className}>
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium wrap-break-word">
        {v && v.length > 0 ? v : "—"}
      </dd>
    </div>
  );
};
