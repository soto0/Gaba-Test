/** Подмножество полей пользователя DummyJSON для списка и деталки (без password, bank и т.д.). */

export type DummyJsonUserRole = "admin" | "moderator" | "user" | string;

export interface DummyJsonAddress {
  address?: string;
  city?: string;
  state?: string;
  stateCode?: string;
  postalCode?: string;
  country?: string;
}

export interface DummyJsonCompany {
  department?: string;
  name?: string;
  title?: string;
  address?: DummyJsonAddress;
}

export interface DummyJsonUserListItem {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  role?: DummyJsonUserRole;
  phone?: string;
  gender?: string;
  birthDate?: string;
  university?: string;
  company?: DummyJsonCompany;
  address?: DummyJsonAddress;
}

export interface DummyJsonUsersListResponse {
  users: DummyJsonUserListItem[];
  total: number;
  skip: number;
  limit: number;
}

export type DummyJsonUserDetail = DummyJsonUserListItem;
