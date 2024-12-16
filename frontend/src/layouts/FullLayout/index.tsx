import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "../../App.css";
import { UserOutlined, DashboardOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme, Button, message } from "antd";
// import logo from "../../assets/logo.png";
import Dashboard from "../../pages/Dashboard";

const { Header, Content, Footer, Sider } = Layout;

const FullLayout: React.FC = () => {
  const page = localStorage.getItem("page");
  const [messageApi, contextHolder] = message.useMessage();
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const setCurrentPage = (val: string) => {
    localStorage.setItem("page", val);
  };

  const Logout = () => {
    localStorage.clear();
    messageApi.success("Logout successful");
    setTimeout(() => {
      location.href = "/";
    }, 2000);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {contextHolder}
      {/* Sidebar */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          {/* Logo */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              <img
                src={"logo"} // Replace with your logo path
                alt="Logo"
                style={{ width: "80%" }}
              />
            </div>

            {/* Menu */}
            <Menu
              theme="dark"
              defaultSelectedKeys={[page ? page : "dashboard"]}
              mode="inline"
            >
              <Menu.Item
                key="dashboard"
                onClick={() => setCurrentPage("dashboard")}
              >
                <Link to="/">
                  <DashboardOutlined />
                  <span>แดชบอร์ด</span>
                </Link>
              </Menu.Item>

              <Menu.Item
                key="customer"
                onClick={() => setCurrentPage("customer")}
              >
                <Link to="/customer">
                  <UserOutlined />
                  <span>ข้อมูลสมาชิก</span>
                </Link>
              </Menu.Item>
            </Menu>
          </div>

          {/* Logout Button */}
          <Button onClick={Logout} style={{ margin: 4 }}>
            ออกจากระบบ
          </Button>
        </div>
      </Sider>

      {/* Main Layout */}
      <Layout>
        {/* Header */}
        <Header
          style={{
            padding: "0 16px",
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Header Left */}
          <div style={{ fontSize: "18px", fontWeight: "bold" }}>
            ระบบจัดการหอพัก
          </div>

          {/* Header Right */}
          <div>
            <Button type="primary" onClick={Logout}>
              ออกจากระบบ
            </Button>
          </div>
        </Header>

        {/* Content */}
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }} />
          <div
            style={{
              padding: 24,
              minHeight: "100%",
              background: colorBgContainer,
            }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </div>
        </Content>

        {/* Footer */}
        <Footer style={{ textAlign: "center" }}>
          System Analysis and Design 1/67
        </Footer>
      </Layout>
    </Layout>
  );
};

export default FullLayout;
