import React from "react";
import { Table, Avatar, TablePaginationConfig, Input } from "antd";
import { Link } from "react-router-dom";
import {
  UserOutlined,
  StarFilled,
  StarOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { LoadingState, ParamOrder, TUser, RepositoryItem } from "../../types";
import { LANGUAGES, ROUTES } from "../../constants";
import useSearch from "./useSearch";
import Preserver from "../../utils/preserver";
import {
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
} from "antd/lib/table/interface";

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
    <>
      <Input.Search
        style={{ width: "40%", marginBottom: 25 }}
        defaultValue=""
        allowClear
        placeholder="Search by name"
        onSearch={(searchString) => {
          updateFilters({
            q: searchString ? `${searchString} in:name` : "stars:>1",
          });
        }}
      />

      <Table<RepositoryItem>
        dataSource={data}
        onChange={(
          pagination: TablePaginationConfig,
          innerFilters: Record<string, FilterValue | null>,
          sorter: SorterResult<RepositoryItem> | SorterResult<RepositoryItem>[],
          extra: TableCurrentDataSource<RepositoryItem>
        ) => {
          const { current, pageSize } = pagination;
          const { action } = extra;

          updateFilters({ per_page: pageSize, page: current });

          if (action === "sort") {
            updateFilters({
              order:
                filters.order === ParamOrder.desc
                  ? ParamOrder.asc
                  : ParamOrder.desc,
              page: 1,
            });
          }
        }}
        loading={isLoading}
        pagination={{
          total: totalCount,
          pageSize: filters.per_page,
          current: filters.page,
        }}
      >
        <Column title="Name" dataIndex="name" key="name" />
        <Column
          title="Owner"
          dataIndex="owner"
          key="owner"
          render={(owner: TUser) => {
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
          onFilter={(
            value: string | number | boolean,
            record: RepositoryItem
          ) => (record["language"] || "") === value}
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
          sortOrder={filters.order === ParamOrder.asc ? "ascend" : "descend"}
          width={100}
          sorter
        />
        <Column
          title="Issues"
          dataIndex="open_issues_count"
          key="open_issues_count"
          width="1%"
        />
        <Column
          align="center"
          title="Favourite"
          dataIndex="favourite"
          width="1%"
          key=""
          render={(
            value,
            { name, id, language, stargazers_count, full_name }: RepositoryItem
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
                    full_name,
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
          width="1%"
          key=""
          render={(value, record: RepositoryItem) => (
            <Link
              to={`${ROUTES.repositories}/${record.full_name}`}
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
    </>
  );
};

export default SearchPage;
