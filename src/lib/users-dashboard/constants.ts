import type { ReactNode } from "react";

export const PAGE_SIZES = [10, 20, 30] as const;

export const SEARCH_DEBOUNCE_MS = 360;

export const SORT_DISABLED_TITLE =
  "При активном поиске сортировка недоступна (ограничение API)";

/** Одна таблица полей — и для SelectItem, и для items (подпись в триггере). */
export const SORT_FIELDS = [
  { value: "firstName", label: "Имя" },
  { value: "lastName", label: "Фамилия" },
  { value: "email", label: "Email" },
] as const;

export const SORT_FIELD_ITEMS: Record<string, ReactNode> = Object.fromEntries(
  SORT_FIELDS.map(({ value, label }) => [value, label]),
);

export const SORT_ORDERS = [
  { value: "asc", label: "По возрастанию" },
  { value: "desc", label: "По убыванию" },
] as const;

export const SORT_ORDER_ITEMS: Record<string, ReactNode> = Object.fromEntries(
  SORT_ORDERS.map(({ value, label }) => [value, label]),
);
