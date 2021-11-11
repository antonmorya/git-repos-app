import React from "react";
import { TCommitItem } from "../../types";
import { Avatar, List } from "antd";

const CommitsList = ({ commits }: { commits: TCommitItem[] }) => (
  <>
    {commits.map(({ sha, author, commit }) => (
      <List.Item key={sha}>
        <List.Item.Meta
          avatar={<Avatar src={author.avatar_url} />}
          title={`${author.login} (${sha.slice(-6)})`}
          description={commit.message}
        />
      </List.Item>
    ))}
  </>
);

export default CommitsList;
