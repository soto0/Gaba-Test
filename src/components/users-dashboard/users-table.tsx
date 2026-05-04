"use client";

import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { DummyJsonUserListItem } from "@/lib/dummyjson/types";
import { formatUserLocation, roleBadgeVariant } from "@/lib/users-dashboard/format";

type UsersTableProps = {
  users: DummyJsonUserListItem[];
  onOpenUser: (id: number) => void;
};

export const UsersTable = ({ users, onOpenUser }: UsersTableProps) => {
  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 px-6 py-16 text-center">
        <p className="text-sm font-medium text-foreground">Нет пользователей</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          Попробуйте изменить запрос или сбросить фильтры. Если вы открыли
          несуществующую страницу пагинации, вернитесь на первую.
        </p>
        <Link href="/" className={cn(buttonVariants())}>
          Сбросить
        </Link>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-14" />
          <TableHead>Пользователь</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Роль</TableHead>
          <TableHead>Компания</TableHead>
          <TableHead>Локация</TableHead>
          <TableHead className="text-right">Действия</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((u) => (
          <TableRow key={u.id}>
            <TableCell>
              <Image
                src={u.image}
                alt=""
                width={40}
                height={40}
                className="size-10 rounded-full border bg-muted object-cover"
              />
            </TableCell>
            <TableCell className="font-medium whitespace-normal">
              {u.firstName} {u.lastName}
            </TableCell>
            <TableCell className="max-w-[200px] truncate text-muted-foreground">
              {u.email}
            </TableCell>
            <TableCell>
              {u.role ? (
                <Badge variant={roleBadgeVariant(u.role)}>{u.role}</Badge>
              ) : (
                "—"
              )}
            </TableCell>
            <TableCell className="max-w-[220px] whitespace-normal">
              {u.company?.name ?? "—"}
              {u.company?.title ? (
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  {u.company.title}
                </span>
              ) : null}
            </TableCell>
            <TableCell className="text-muted-foreground whitespace-normal">
              {formatUserLocation(u)}
            </TableCell>
            <TableCell className="text-right">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onOpenUser(u.id)}
              >
                Подробнее
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
