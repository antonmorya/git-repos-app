export enum LoadingState {
  pending,
  fulfilled,
  error,
}

export enum ParamOrder {
  asc = "asc",
  desc = "desc",
}

export type TOwner = {
  avatar_url: string;
  id: number;
  login: string;
};

export type TRepoItem = {
  id: number;
  name: string;
  language: string;
  open_issues_count: number;
  owner: TOwner;
  private: boolean;
  stargazers_count: number;
};

export type TStoredRepoItem = {
  id: number;
  name: string;
  language: string;
  stargazers_count: number;
};

export type Filters = {
  order: ParamOrder;
  page: number;
  per_page: number;
};

export type TResponceShape<T> = {
  total_count: number;
  incomplete_results: boolean;
  items: Array<T>;
};

export type TRequest = (url: string) => Promise<TResponceShape<TRepoItem>>;
