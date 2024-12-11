import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Layout } from 'antd';
import { FC } from "react";
import { FaHouseChimneyUser } from "react-icons/fa6";
import { Link } from "react-router";

const { Header } = Layout;

interface IProps {
    setCollapsed: any,
    colorBgContainer: any,
    collapsed: any
}

const items: MenuProps['items'] = [
    {
        label: <Link to={'/thong-tin-ca-nhan'}>Thông tin cá nhân</Link>,
        key: '0',
    },
    {
        label:  <Link to={'/cai-dat'}>Cài đặt</Link>,
        key: '1',
    },
    {
        type: 'divider',
    },
    {
        label: <div>Đăng xuất</div>,
        key: '3',
    },
];
const HeaderComponent: FC<IProps> = (props) => {
    const { setCollapsed, colorBgContainer, collapsed } = props
    return <Header className="flex items-center justify-between" style={{ padding: 0, background: colorBgContainer, height: "50px" }}>
        <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined size={30} /> : <MenuFoldOutlined size={30} />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
                fontSize: '16px',
                width: "50px",
                height: "50px"
            }}
        />
        <div className="pr-4" >
            <Dropdown menu={{ items }} trigger={['click']}>
                <FaHouseChimneyUser className='cursor-pointer'  size={25} />
            </Dropdown>
        </div>
    </Header>
}

export default HeaderComponent