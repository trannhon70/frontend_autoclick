import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Layout, Space } from 'antd';
import { FC, useContext, useEffect } from "react";
import { FaHouseChimneyUser } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router";
import { AppDispatch, RootState } from '../../app/store';
import { fetchUserById } from '../../features/user/userSlice';
import { PiPasswordFill, PiUserSwitchDuotone } from "react-icons/pi";
import { CiLogout } from "react-icons/ci";
import { AuthContext } from '../../context/AuthContext';

const { Header } = Layout;

interface IProps {
    setCollapsed: any,
    colorBgContainer: any,
    collapsed: any
}


const HeaderComponent: FC<IProps> = (props) => {
    const { setCollapsed, colorBgContainer, collapsed } = props
    const dispatch = useDispatch<AppDispatch>();
    const users = useSelector((state: RootState) => state.users);
    const { logout } = useContext(AuthContext);

    const items: MenuProps['items'] = [
        {
            label: <Link to={'/thong-tin-ca-nhan'}>Thông tin cá nhân</Link>,
            key: '0',
            icon: <PiUserSwitchDuotone size={30} />,
        },
        {
            label: <Link to={'/cai-dat'}>Cài đặt</Link>,
            key: '1',
            icon: <PiPasswordFill size={30} />,
        },
        {
            type: 'divider',
        },
        {
            label: <div onClick={logout} >Đăng xuất</div>,
            key: '3',
            icon: <CiLogout size={30} />,
        },
    ];

    useEffect(() => {
        dispatch(fetchUserById());
    }, [dispatch])

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
        <div className="pr-4  h-[50px] flex gap-2  " >
            <div className='h-[50px] flex items-center justify-center text-orange-700 font-semibold text-base ' >hi {users?.user?.fullName}</div>
            <Dropdown menu={{ items }} trigger={['click']}>
                
                <a onClick={e => e.preventDefault()}>
                    <Space className="mt-1" >
                        <FaHouseChimneyUser className='cursor-pointer' size={25} />
                    </Space>
                </a>

            </Dropdown>
        </div>
    </Header>
}

export default HeaderComponent