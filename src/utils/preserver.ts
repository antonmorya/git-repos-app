import { Filters, TStoredRepoItem } from "../types";

enum LocalStorageVars {
  filters = "git-repos-app_filters",
  favourites = "git-repos-app_favourites",
}

class Preserver {
  private filters: Partial<Filters> = {};
  private favourites: Record<number, TStoredRepoItem> = [];

  public constructor() {
    const localStorageFilters = localStorage.getItem(LocalStorageVars.filters);
    const localStorageFavourites = localStorage.getItem(
      LocalStorageVars.favourites
    );

    this.filters = localStorageFilters ? JSON.parse(localStorageFilters) : {};
    this.favourites = localStorageFavourites
      ? JSON.parse(localStorageFavourites)
      : {};
  }

  public setFilters(filters: Partial<Filters>) {
    this.filters = {
      ...this.filters,
      ...filters,
    };

    localStorage.setItem(
      LocalStorageVars.filters,
      JSON.stringify({ ...this.filters, ...filters })
    );
  }

  public getFilters(): Filters | Partial<Filters> {
    return this.filters;
  }

  public toggleFavourite(id: number, info: TStoredRepoItem) {
    if (this.favourites[id]) {
      delete this.favourites[id];
    } else {
      this.favourites = {
        ...this.favourites,
        [id]: info,
      };
    }

    localStorage.setItem(
      LocalStorageVars.favourites,
      JSON.stringify(this.favourites)
    );
  }

  public getFavourites(): Record<number, TStoredRepoItem> {
    return this.favourites;
  }

  public isFavourite(id: number): boolean {
    return !!this.favourites[id];
  }

  public clearStorage() {
    localStorage.removeItem(LocalStorageVars.favourites);
    localStorage.removeItem(LocalStorageVars.filters);
  }
}

export default new Preserver();
