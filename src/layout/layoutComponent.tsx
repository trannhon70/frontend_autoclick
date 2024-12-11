import { useState, FC } from 'react';

import { Layout, Menu, theme, MenuProps } from 'antd';
import { Link, Outlet } from 'react-router';
import { FaHome } from "react-icons/fa";
import HeaderComponent from '../components/header';
import { MdAdsClick } from "react-icons/md";
import { MdAddBox } from "react-icons/md";

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
const LayoutComponent: FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const items: MenuItem[] = [
        getItem(<Link to={'/'}>Trang chủ</Link>, 'sub1', <FaHome size={25}/>),
        getItem(<>Auto click</>, 'sub2', <MdAdsClick size={25} />, [
            getItem(<Link to={'/auto-click-create'}>Thêm mới</Link>, '/auto-click-create', <MdAddBox size={25} />)
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
                    margin: '24px 16px',
                    padding: 24,
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