import { useState, FC } from 'react';

import { Layout, Menu, theme, MenuProps } from 'antd';
import { Link, Outlet } from 'react-router';
import { FaHome } from "react-icons/fa";
import HeaderComponent from '../components/header';
import { MdAddBox } from "react-icons/md";
import { FaUsersLine } from "react-icons/fa6";
import { MdOutlineFormatListNumbered } from "react-icons/md";

const { Sider, Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key?: React.Key,
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
const LayoutComponent: FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const items: MenuItem[] = [
        getItem(<Link to={'/'}>Trang chủ</Link>, 'sub1', <FaHome size={25}/>),
        getItem(<>QL User</>, 'sub2', <FaUsersLine size={25} />, [
            getItem(<Link to={'/user/them-moi'}>Thêm mới</Link>, '/user/them-moi', <MdAddBox size={25} />),
            getItem(<Link to={'/user/danh-sach'}>Danh sách User</Link>, '/user/danh-sach', <MdOutlineFormatListNumbered  size={25} />),
        ]),

    ];

    return (<Layout style={{ height: '100vh' }} >
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical h-[50px] " />
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={items}
            />
        </Sider>
        <Layout>
            <HeaderComponent setCollapsed={setCollapsed} colorBgContainer={colorBgContainer} collapsed={collapsed} />
            <Content
                style={{
                    margin: '10px',
                    padding: 15,
                    minHeight: 280,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                <Outlet />
            </Content>
        </Layout>
    </Layout>
    )
}

export default LayoutComponent