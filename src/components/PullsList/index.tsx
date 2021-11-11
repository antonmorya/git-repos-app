import React from "react";
import { PRItem } from "../../types";
import { Avatar, List } from "antd";

const PullsList = ({ items }: { items: PRItem[] }) => (
  <>
    {items.map(({ id, user, title }) => (
      <List.Item key={id}>
        <List.Item.Meta
          avatar={<Avatar src={user.avatar_url} />}
          title={user.login}
          description={title}
        />
      </List.Item>
    ))}
  </>
);

export default PullsList;
