"use client";

import * as React from "react";

import { fetchUserDetail } from "@/api/users";
import type { DummyJsonUserDetail } from "@/lib/dummyjson/types";

export const useUserDetail = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState<DummyJsonUserDetail | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const openUser = React.useCallback(async (id: number) => {
    setOpen(true);
    setLoading(true);
    setUser(null);
    setError(null);

    try {
      const data = await fetchUserDetail(id);
      setUser(data);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Не удалось загрузить пользователя",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const onOpenChange = React.useCallback((next: boolean) => {
    setOpen(next);
    if (!next) {
      setUser(null);
      setError(null);
      setLoading(false);
    }
  }, []);

  return { open, onOpenChange, loading, user, error, openUser };
};
