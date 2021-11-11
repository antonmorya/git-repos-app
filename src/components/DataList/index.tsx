import React from "react";
import { Avatar, List, Tag, Typography } from "antd";
import {
  ExtendedRepoItem,
  RepoItemValueType,
  TLicense,
  TUser,
} from "../../types";
const { Text } = Typography;

const isLisense = (data: any): data is TLicense =>
  "name" in data && "url" in data;

const isOwner = (data: any): data is TUser =>
  "avatar_url" in data && "id" in data && "login" in data;

const renderListData = (data: RepoItemValueType) => {
  const type = (Array.isArray(data) && "array") || typeof data;

  switch (type) {
    case "string":
    case "number":
      return data;

    case "array":
      return (data as Array<string>).map((item) => (
        <Tag color="#2db7f5" key={item}>
          {item}
        </Tag>
      ));

    case "boolean":
      return !!data ? "yes" : "no";

    case "object":
      return (
        (data && isLisense(data) && data.name) ||
        (data && isOwner(data) && (
          <>
            <Avatar
              size={25}
              style={{ marginRight: 16 }}
              src={data.avatar_url}
              alt={data.login}
            />
            {data.login}
          </>
        )) ||
        ""
      );

    default:
      return null;
  }
};

const DataList = ({
  order,
  data,
  humanKeys,
}: {
  order: string[];
  data: ExtendedRepoItem | Record<string, RepoItemValueType>;
  humanKeys: Record<string, string>;
}) => (
  <>
    {order.map((key) => (
      <List.Item
        key={key}
        style={{
          display: "grid",
          gridAutoFlow: "column",
          alignItems: "start",
          justifyContent: "start",
          gap: 16,
          gridAutoColumns: "150px 1fr",
        }}
      >
        <Text
          strong
          style={{
            textAlign: "right",
          }}
        >
          {humanKeys[key]}:
        </Text>
        <div>{renderListData(data[key])}</div>
      </List.Item>
    ))}
  </>
);

export default DataList;
