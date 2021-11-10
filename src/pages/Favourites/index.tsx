import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { TRepoItem, TStoredRepoItem } from "../../types";
import Preserver from "../../utils/preserver";
import { isEmpty } from "../../utils";
import { ROUTES } from "../../constants";
import { Link } from "react-router-dom";
import Column from "rc-table/lib/sugar/Column";
import { EllipsisOutlined } from "@ant-design/icons";

const columnsSchema = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Language",
    dataIndex: "language",
    key: "language",
  },
  {
    title: "Stars",
    dataIndex: "stargazers_count",
    key: "stargazers_count",
  },
];

const FavouritesPage = () => {
  const [data, setData] = useState<TStoredRepoItem[]>([]);

  useEffect(() => {
    const localStorageFavourites = Preserver.getFavourites();

    if (isEmpty(localStorageFavourites)) {
      return;
    }

    setData(Object.values(localStorageFavourites));
  }, []);

  return (
    <Table<TStoredRepoItem> dataSource={data}>
      <Column title="Name" dataIndex="name" key="name" />
      <Column title="Language" dataIndex="language" key="language" />
      <Column
        width={80}
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

export default FavouritesPage;
