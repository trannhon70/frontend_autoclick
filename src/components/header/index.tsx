import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Button, Dropdown, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import type { FC } from "react";
import { useContext } from "react";
import { CiLogout } from "react-icons/ci";
import { AuthContext } from "../../context/AuthContext";
import { useCountDown } from '../../hooks/useCountDown';
interface IProps {
    collapsed: boolean;
    setCollapsed: any;
    user: any
}
const HeaderComponent: FC<IProps> = (props) => {
    const { collapsed, setCollapsed, user } = props
    const { logout } = useContext(AuthContext);
    const { formattedTime, isExpired } = useCountDown();

    const items: MenuProps['items'] = [
        {
            key: 'b',
            danger: true,
            label: <div >Đăng xuất</div>,
            icon: <CiLogout size={30} />,
            onClick: logout
        },
    ];


    return <Header style={{ padding: 0, background: 'white', display: 'flex', justifyContent: "space-between", height: "50px", alignItems: 'center' }}>
        <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
                fontSize: '16px',
                width: 50,
                height: 50,
            }}
        />
        <div>
            {!isExpired && <strong>⏳ Token còn lại: {formattedTime}</strong>}
        </div>
        <div className='flex items-center justify-between gap-3 pr-4  ' style={{ textTransform: 'capitalize' }} >

            <div className='flex items-center gap-3 ' >
                {user?.fullName}
                <Dropdown menu={{ items }}>
                    <div onClick={(e) => e.preventDefault()}>
                        <Space className='cursor-pointer' >
                            {
                                user?.avatar ?
                                    <Avatar style={{ backgroundColor: '#ed6c02' }} size={35}>
                                        <img
                                            src={user?.avatar}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            alt="avatar"
                                        />
                                    </Avatar>
                                    : <Avatar size={35} icon={<UserOutlined />} />
                            }

                        </Space>
                    </div>
                </Dropdown>
            </div>

        </div>
    </Header>
}

export default HeaderComponent