// common
export enum LoadingState {
  pending,
  fulfilled,
  error,
}

export enum ParamOrder {
  asc = "asc",
  desc = "desc",
}

export type TUser = {
  avatar_url: string;
  id: number;
  login: string;
};

export type TLicense = {
  name: string;
  url: string;
};

export type RepositoryItem = {
  id: number;
  name: string;
  full_name: string;
  language: string;
  open_issues_count: number;
  owner: TUser;
  private: boolean;
  stargazers_count: number;
};

export type RepoItemValueType =
  | string
  | boolean
  | number
  | string[]
  | TLicense
  | TUser;

export type ExtendedRepositoryItem = RepositoryItem & {
  [key: string]: RepoItemValueType;
  archived: boolean;
  created_at: string;
  description: string;
  disabled: boolean;
  homepage: string;
  language: string;
  license: TLicense;
  open_issues_count: number;
  topics: string[];
  updated_at: string;
  visibility: string;
  watchers_count: number;
};

export type StoredRepositoryItem = {
  id: number;
  name: string;
  language: string;
  stargazers_count: number;
  full_name: string;
};

export type Filters = {
  order: ParamOrder;
  page: number;
  per_page: number;
  q: string;
};

export type RepositoryItemResponce<T> = {
  total_count: number;
  incomplete_results: boolean;
  items: Array<T>;
};

export type PRItem = {
  id: number;
  title: string;
  user: TUser;
};

export type TRequest = (url: string) => Promise<unknown>;
