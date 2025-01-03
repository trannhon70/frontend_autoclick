import React, { useContext } from 'react';
import { Routes, Route, Navigate, Outlet } from "react-router";
import Login from './pages/login';
import { AuthContext } from './context/AuthContext';
import Error from './pages/error';
import LayoutComponent from './layout/layoutComponent';
import CreateAutoClick from './pages/autoClick/createAutoClick';

const PrivateRoutes = () => {
  const { authenticated } = useContext(AuthContext);
  
  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default class App extends React.Component {
  render() {
    return (
      <Routes>
        <Route index path='/login' element={<Login />} />
        <Route element={<PrivateRoutes />}>
          <Route path='/'  element={<LayoutComponent />} >
            <Route path='/user/them-moi' element={<CreateAutoClick />} />
            <Route path='/user/danh-sach' element={<></>} />
          </Route>
        </Route>
        <Route path="*" element={<Error />} />
       
      </Routes>
    );
  }
}
