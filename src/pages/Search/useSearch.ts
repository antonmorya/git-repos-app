import { useEffect, useState } from "react";
import {
  Filters,
  LoadingState,
  ParamOrder,
  TRepoItem,
  TResponceShape,
} from "../../types";
import cachedRequest from "../../utils/request";
import Preserver from "../../utils/preserver";
import objectToQueryParams from "object-to-query-params";
import { isEmpty } from "../../utils";

const DEFAULT_FILTERS = {
  order: ParamOrder.desc,
  page: 1,
  per_page: 10,
  q: "stars:>1",
};

const useSearch = () => {
  const [data, setData] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loadingState, setLoadingState] = useState<LoadingState>(
    LoadingState.pending
  );

  const localStorageFilters = Preserver.getFilters() as Filters;
  const [filters, setFilters] = useState<Filters>(
    isEmpty(localStorageFilters) ? DEFAULT_FILTERS : localStorageFilters
  );

  const getData = async (params: Filters) => {
    setLoadingState(LoadingState.pending);

    try {
      const { items, total_count } = (await cachedRequest(
        `https://api.github.com/search/repositories?sort=stars&${objectToQueryParams(
          params
        )}`
      )) as TResponceShape<TRepoItem>;

      setData(items);
      setTotalCount(total_count);

      setLoadingState(LoadingState.fulfilled);
    } catch (error) {
      console.error("Error getting repos: ", error);
      setLoadingState(LoadingState.error);

      setData([]);
    }
  };

  const updateFilters = (incomingFilters: Partial<Filters>) => {
    setFilters((currentFilters) => ({ ...currentFilters, ...incomingFilters }));

    Preserver.setFilters({
      ...filters,
      ...incomingFilters,
    });
  };

  useEffect(() => {
    getData(filters);
  }, [filters]);

  return {
    isLoading: loadingState === LoadingState.pending,
    data,
    totalCount,
    filters,
    updateFilters,
    setLoadingState,
  };
};

export default useSearch;
