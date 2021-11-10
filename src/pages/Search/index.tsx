import React from "react";
import { Table, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
  UserOutlined,
  StarFilled,
  StarOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { LoadingState, TOwner, TRepoItem } from "../../types";
import { LANGUAGES, ROUTES } from "../../constants";
import useSearch from "./useSearch";
import Preserver from "../../utils/preserver";

const { Column } = Table;

const languageFilters = LANGUAGES.map((lang) => ({
  text: lang,
  value: lang,
}));

const SearchPage = () => {
  const {
    isLoading,
    data,
    updateFilters,
    totalCount,
    filters,
    setLoadingState,
  } = useSearch();

  return (
    <Table<TRepoItem>
      dataSource={data}
      loading={isLoading}
      pagination={{
        total: totalCount,
        pageSize: filters.per_page,
        current: filters.page,
        onChange: (page: number, pageSize?: number) => {
          updateFilters({ per_page: pageSize, page });
        },
      }}
    >
      <Column title="Name" dataIndex="name" key="name" />
      <Column
        title="Owner"
        dataIndex="owner"
        key="owner"
        render={(owner: TOwner) => {
          return (
            <>
              <Avatar
                key={owner.id}
                size={26}
                icon={<UserOutlined />}
                src={owner.avatar_url}
                alt={owner.login}
              />
              <span
                style={{
                  marginLeft: 10,
                }}
              >
                {owner.login}
              </span>
            </>
          );
        }}
      />
      <Column
        title="Language"
        dataIndex="language"
        key="language"
        onFilter={(value: string | number | boolean, record: TRepoItem) =>
          (record["language"] || "") === value
        }
        filters={[
          {
            text: "Human - readable language",
            value: "",
          },
          ...languageFilters,
        ]}
      />
      <Column
        title="Stars"
        dataIndex="stargazers_count"
        key="stargazers_count"
      />
      <Column
        title="Issues"
        dataIndex="open_issues_count"
        key="open_issues_count"
      />
      <Column
        align="center"
        title="Favourite"
        dataIndex="favourite"
        key=""
        render={(
          value,
          { name, id, language, stargazers_count }: TRepoItem
        ) => (
          <button
            style={{
              width: 40,
              textAlign: "center",
              backgroundColor: "transparent",
              border: 0,
              cursor: "pointer",
            }}
            onClick={() => {
              setLoadingState(LoadingState.pending);

              window.setTimeout(() => {
                Preserver.toggleFavourite(id, {
                  name,
                  id,
                  language,
                  stargazers_count,
                });
                setLoadingState(LoadingState.fulfilled);
              }, 250);
            }}
          >
            {Preserver.isFavourite(id) ? (
              <StarFilled
                style={{
                  color: "#FFD700",
                }}
              />
            ) : (
              <StarOutlined />
            )}
          </button>
        )}
      />
      <Column
        align="center"
        title="More"
        dataIndex="more"
        key=""
        render={(value, record: TRepoItem) => (
          <Link
            to={`${ROUTES.repositories}/${record.id}`}
            style={{
              margin: 0,
              padding: 0,
              cursor: "pointer",
            }}
          >
            <EllipsisOutlined />
          </Link>
        )}
      />
    </Table>
  );
};

export default SearchPage;
