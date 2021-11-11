import { useEffect, useState } from "react";
import {
  ExtendedRepositoryItem,
  LoadingState,
  RepoItemValueType,
  PRItem,
} from "../../types";
import { request } from "../../utils/request";

const useRepo = ({ owner, repo }: { owner: string; repo: string }) => {
  const [prList, setPrList] = useState<PRItem[]>([]);
  const [dataLoadingState, setDataLoadingState] = useState({});
  const [commitsLoadingState, setCommitsLoadingState] = useState({});
  const [data, setData] = useState<
    ExtendedRepositoryItem | Record<string, RepoItemValueType>
  >({});

  const getData = async () => {
    setDataLoadingState(LoadingState.pending);

    try {
      const repoData = (await request(
        `https://api.github.com/repos/${owner}/${repo}`
      )) as ExtendedRepositoryItem;

      setData(repoData);

      setDataLoadingState(LoadingState.fulfilled);
    } catch (error) {
      console.error("Error getting repos: ", error);
      setDataLoadingState(LoadingState.error);

      setData({});
    }
  };

  const getCommits = async () => {
    setCommitsLoadingState(LoadingState.pending);

    try {
      const prItems = (await request(
        `https://api.github.com/repos/${owner}/${repo}/pulls?per_page=10`
      )) as PRItem[];

      setPrList(prItems);

      setCommitsLoadingState(LoadingState.fulfilled);
    } catch (error) {
      console.error("Error getting repos: ", error);
      setCommitsLoadingState(LoadingState.error);

      setPrList([]);
    }
  };

  useEffect(() => {
    getData();
    getCommits();
  }, []);

  return {
    isLoading:
      dataLoadingState !== LoadingState.fulfilled &&
      commitsLoadingState !== LoadingState.fulfilled,
    prList,
    data,
  };
};

export default useRepo;
