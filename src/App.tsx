import React, { useState } from "react";
import { Switch, Route, Link, useRouteMatch, Redirect } from "react-router-dom";
import { Layout, Menu } from "antd";
import { SearchOutlined, StarOutlined } from "@ant-design/icons";
import logo from "./logo.svg";
import SearchPage from "./pages/Search";

import "./App.css";
import { ROUTES } from "./constants";

const { Header, Content, Footer, Sider } = Layout;

const Repos = () => {
  let { path, url, isExact, params } = useRouteMatch();
  console.debug("Repos: ", { path, url, isExact, params });

  return (
    <Switch>
      <Route exact path={path}>
        <Redirect to={ROUTES.home} />
      </Route>

      <Route path={ROUTES.oneRepo}>
        <h1>some repo</h1>
      </Route>
    </Switch>
  );
};

function App() {
  const [isCollapsed, setCollapsed] = useState<boolean>(true);

  const isFavouritesPage = !!useRouteMatch({
    path: ROUTES.favourites,
    exact: true,
  });
  const isHomePage = !!useRouteMatch({ path: ROUTES.home, exact: true });

  const defaultSelectedKey =
    (isHomePage && "1") || (isFavouritesPage && "2") || "0";

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={isCollapsed}
        onCollapse={() => setCollapsed((current: boolean) => !current)}
      >
        <div
          style={{
            marginTop: 3,
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={
              {
                // border: "1px dashed red",
              }
            }
          />
        </div>

        <Menu
          theme="dark"
          defaultSelectedKeys={[defaultSelectedKey]}
          mode="inline"
        >
          <Menu.Item key="1" icon={<SearchOutlined />}>
            <Link to={ROUTES.home}>Search</Link>
          </Menu.Item>

          <Menu.Item key="2" icon={<StarOutlined />}>
            <Link to={ROUTES.favourites}>Favourites</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />

        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Switch>
              <Route exact path={ROUTES.home} component={SearchPage} />

              <Route path={ROUTES.repositories} component={Repos} />

              <Route path={ROUTES.favourites}>
                <h2>favourites</h2>
              </Route>

              <Route path="*">
                <h1>No such route</h1>
              </Route>
            </Switch>
          </div>
        </Content>

        <Footer style={{ textAlign: "center" }}>
          Created by Morya Anton, using Ant Design components ©2021
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;
