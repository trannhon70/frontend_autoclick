import { useEffect, type FC } from "react";
import useGetByIdUser from "../../hooks/useGetByIdUser";

import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import React, { useLayoutEffect, useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { TbHandClick } from "react-icons/tb";
import { Link, Outlet, useLocation } from "react-router-dom";
import HeaderComponent from "../header";
import { CheckRole } from "../../utils";
import { FaList } from "react-icons/fa";
import { SiTraefikproxy } from "react-icons/si";
import { VscDiffAdded } from "react-icons/vsc";
import { PiTrafficSignalFill } from "react-icons/pi";
const { Sider, Content } = Layout;
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}
const sub0 = ["/quan-ly-proxy", "/quan-ly-proxy/them-moi"];

const LayoutComponent: FC = () => {
  const { user, role } = useGetByIdUser();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const location = useLocation();
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  useLayoutEffect(() => {
    if (sub0.includes(location.pathname)) {
      setOpenKeys(["sub0"]);
    }
  }, [location.pathname, sub0]);

  // useEffect(() => {
  //     // 🚫 Chặn chuột phải
  //     const handleContextMenu = (e: MouseEvent) => e.preventDefault();
  //     document.addEventListener("contextmenu", handleContextMenu);

  //     // 🚫 Chặn phím tắt DevTools, View Source, PrintScreen, Reload
  //     const handleKeyDown = (e: KeyboardEvent) => {
  //         if (
  //             e.key === "F12" ||
  //             e.key === "F5" || // ⛔ chặn reload
  //             (e.ctrlKey && e.key.toLowerCase() === "r") || // Ctrl + R (Windows/Linux)
  //             (e.metaKey && e.key.toLowerCase() === "r") || // ⌘ + R (Mac)
  //             (e.ctrlKey && e.shiftKey && ["i", "c", "j"].includes(e.key.toLowerCase())) ||
  //             (e.ctrlKey && e.key.toLowerCase() === "u") ||
  //             e.key === "PrintScreen"
  //         ) {
  //             e.preventDefault();
  //             alert("🚫 Hành động này bị vô hiệu hóa!");
  //         }
  //     };
  //     document.addEventListener("keydown", handleKeyDown);

  //     // 🚫 Chặn copy
  //     const handleCopy = (e: ClipboardEvent) => e.preventDefault();
  //     document.addEventListener("copy", handleCopy);

  //     // 🚫 Chặn reload bằng nút reload (trên thanh trình duyệt)
  //     const handleBeforeUnload = (e: BeforeUnloadEvent) => {
  //         e.preventDefault();
  //         e.returnValue = ""; // Chrome yêu cầu gán chuỗi rỗng để hiển thị popup xác nhận
  //     };
  //     window.addEventListener("beforeunload", handleBeforeUnload);

  //     // Cleanup khi component unmount
  //     return () => {
  //         document.removeEventListener("contextmenu", handleContextMenu);
  //         document.removeEventListener("keydown", handleKeyDown);
  //         document.removeEventListener("copy", handleCopy);
  //         window.removeEventListener("beforeunload", handleBeforeUnload);
  //     };
  // }, []);

  const items: MenuItem[] = [
    getItem(<Link to={"/"}>Trang chủ</Link>, "/", <IoHomeOutline size={20} />),
    ...(role?.id === CheckRole.ADMIN
      ? [
          getItem("Quản lý Proxy", "sub0", <SiTraefikproxy size={20} />, [
            getItem(
              <Link to={"/quan-ly-proxy"}>Danh sách</Link>,
              "/quan-ly-proxy",
              <FaList size={20} />
            ),
            getItem(
              <Link to={"/quan-ly-proxy/them-moi"}>Thêm mới</Link>,
              "/quan-ly-proxy/them-moi",
              <VscDiffAdded size={20} />
            ),
          ]),
        ]
      : []),
    getItem(
      <Link to={"/traffic-website"}>Traffic website</Link>,
      "/traffic-website",
      <PiTrafficSignalFill size={20} />
    ),
    getItem(
      <Link to={"/click-ads"}>Click Ads</Link>,
      "/click-ads",
      <TbHandClick size={20} />
    ),
    getItem(
      <Link to={"/click-ads-v1"}>Click Ads v1</Link>,
      "/click-ads-v1",
      <TbHandClick size={20} />
    ),
  ];

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        style={{ overflow: "auto" }}
        width={250}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="p-2">
          {/* <img className='w-[100%] ' src={logo} alt="..." /> */}
        </div>
        <Menu
          className="mt-3"
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          openKeys={openKeys} // Use openKeys instead of defaultOpenKeys
          onOpenChange={setOpenKeys} // Update openKeys on change
          items={items}
        />
      </Sider>
      <Layout>
        <HeaderComponent
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          user={user}
        />
        <Content
          style={{
            margin: "6px ",
            padding: "5px  10px",
            minHeight: 280,
            background: "#f7f9fa",
            borderRadius: borderRadiusLG,
            overflow: "auto",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
