import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { RepositoryItem, StoredRepositoryItem } from "../../types";
import Preserver from "../../utils/preserver";
import { isEmpty } from "../../utils";
import { ROUTES } from "../../constants";
import { Link } from "react-router-dom";
import Column from "rc-table/lib/sugar/Column";
import { EllipsisOutlined } from "@ant-design/icons";

const FavouritesPage = () => {
  const [data, setData] = useState<StoredRepositoryItem[]>([]);

  useEffect(() => {
    const localStorageFavourites = Preserver.getFavourites();

    if (isEmpty(localStorageFavourites)) {
      return;
    }

    setData(Object.values(localStorageFavourites));
  }, []);

  return (
    <Table<StoredRepositoryItem> dataSource={data}>
      <Column title="Name" dataIndex="name" key="name" />
      <Column title="Language" dataIndex="language" key="language" />
      <Column
        width={80}
        align="center"
        title="More"
        dataIndex="more"
        key="id"
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
  );
};

export default FavouritesPage;
