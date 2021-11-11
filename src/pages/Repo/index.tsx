import React, { useMemo } from "react";
import { Layout, Spin } from "antd";
import { RouteComponentProps } from "react-router-dom";
import { List, Typography } from "antd";
import CommitsList from "../../components/CommitsList";
import { HUMAN_READABLE_KEYS, ORDER } from "../../constants";
import DataList from "../../components/DataList";
import useRepo from "./useRepo";

const { Title } = Typography;
const { Sider, Content } = Layout;

const RepoPage = ({
  match,
}: RouteComponentProps<{ owner: string; repo: string }>) => {
  const { owner, repo } = match?.params;

  const { isLoading, commits, data } = useRepo({ owner, repo });

  const memoizedDataList = useMemo(
    () => (
      <DataList order={ORDER} data={data} humanKeys={HUMAN_READABLE_KEYS} />
    ),
    [data]
  );

  const memoizedCommitsList = useMemo(
    () => <CommitsList commits={commits} />,
    [commits]
  );

  return isLoading ? (
    <Layout
      style={{
        minHeight: "70vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Spin />
    </Layout>
  ) : (
    <>
      <Title level={1}>{repo}</Title>
      <Layout>
        <Content>
          <List size="small">{memoizedDataList}</List>
        </Content>
        <Sider
          width={400}
          theme="light"
          style={{
            backgroundColor: "transparent",
          }}
        >
          <List size="small">{memoizedCommitsList}</List>
        </Sider>
      </Layout>
    </>
  );
};

export default RepoPage;
