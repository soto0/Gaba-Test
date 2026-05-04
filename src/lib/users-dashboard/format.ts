import type { ComponentProps } from "react";

import type { Badge } from "@/components/ui/badge";
import type { DummyJsonUserListItem } from "@/lib/dummyjson/types";

export const formatUserLocation = (
  u: Pick<DummyJsonUserListItem, "address">,
): string => {
  const a = u.address;
  if (!a) return "—";
  const parts = [a.city, a.country].filter(Boolean);
  return parts.length ? parts.join(", ") : "—";
};

export const roleBadgeVariant = (
  role: string | undefined,
): ComponentProps<typeof Badge>["variant"] => {
  switch (role) {
    case "admin":
      return "default";
    case "moderator":
      return "secondary";
    default:
      return "outline";
  }
};
