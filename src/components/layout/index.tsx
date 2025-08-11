import { Fragment, type FC } from "react";
import useGetByIdUser from "../../hooks/useGetByIdUser";

import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import React, { useLayoutEffect, useState } from 'react';
import { FaList } from "react-icons/fa6";
import { IoHomeOutline } from "react-icons/io5";
import { VscDiffAdded } from "react-icons/vsc";
import { Link, Outlet, useLocation } from 'react-router-dom';

import { FaUsers } from "react-icons/fa";
import { CheckRole } from "../../utils";
import HeaderComponent from "../header";

const { Sider, Content } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}
const sub0 = [
    '/quan-ly-proxy', '/quan-ly-proxy/them-moi'
]



const LayoutComponent:FC = () =>{
     const { user ,role } = useGetByIdUser();

     const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const location = useLocation();
    const [openKeys, setOpenKeys] = useState<string[]>([]);

    useLayoutEffect(() => {
        if (sub0.includes(location.pathname)) {
            setOpenKeys(['sub0']);
        }
       

    }, [location.pathname, sub0,])

    const items: MenuItem[] = [
        getItem(<Link to={'/'}>Trang chủ</Link>, '/', <IoHomeOutline size={20} />),
        ...(role?.id === CheckRole.ADMIN ?
            [getItem('Quản lý Proxy', 'sub0', <FaUsers size={20} />, [
                getItem(<Link to={'/quan-ly-proxy'}>Danh sách</Link>, '/quan-ly-proxy', <FaList size={20} />),
                getItem(<Link to={'/quan-ly-proxy/them-moi'}>Thêm mới</Link>, '/quan-ly-proxy/them-moi', <VscDiffAdded size={20} />),
            ])] : []),
        

    ];
     
    return <Layout style={{ height: '100vh' }} >
            <Sider style={{ overflow: 'auto' }} width={250} trigger={null} collapsible collapsed={collapsed}  >
                <div className="p-2">
                    {/* <img className='w-[100%] ' src={logo} alt="..." /> */}
                </div>
                <Menu
                    className='mt-3'
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    openKeys={openKeys} // Use openKeys instead of defaultOpenKeys
                    onOpenChange={setOpenKeys} // Update openKeys on change
                    items={items}
                />
            </Sider>
            <Layout>
                <HeaderComponent collapsed={collapsed} setCollapsed={setCollapsed} user={user} />
                <Content
                    style={{
                        margin: '6px ',
                        padding: '5px  10px',
                        minHeight: 280,
                        background: '#f7f9fa',
                        borderRadius: borderRadiusLG,
                        overflow: 'auto',

                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
}

export default LayoutComponent