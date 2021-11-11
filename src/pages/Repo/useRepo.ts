import { useEffect, useState } from "react";
import {
  ExtendedRepoItem,
  LoadingState,
  RepoItemValueType,
  TCommitItem,
} from "../../types";
import { request } from "../../utils/request";

const useRepo = ({ owner, repo }: { owner: string; repo: string }) => {
  const [commits, setCommits] = useState<TCommitItem[]>([]);
  const [dataLoadingState, setDataLoadingState] = useState({});
  const [commitsLoadingState, setCommitsLoadingState] = useState({});
  const [data, setData] = useState<
    ExtendedRepoItem | Record<string, RepoItemValueType>
  >({});

  const getData = async () => {
    setDataLoadingState(LoadingState.pending);

    try {
      const repoData = (await request(
        `https://api.github.com/repos/${owner}/${repo}`
      )) as ExtendedRepoItem;

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
      const commitsItems = (await request(
        `https://api.github.com/repos/${owner}/${repo}/commits`
      )) as TCommitItem[];

      setCommits(commitsItems);

      setCommitsLoadingState(LoadingState.fulfilled);
    } catch (error) {
      console.error("Error getting repos: ", error);
      setCommitsLoadingState(LoadingState.error);

      setCommits([]);
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
    commits,
    data,
  };
};

export default useRepo;
