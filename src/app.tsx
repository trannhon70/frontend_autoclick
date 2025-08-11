
import { Route, Routes } from 'react-router-dom';
import './App.css';
import ErrorComponent from './components/error';
import LayoutComponent from './components/layout';
import Login from './pages/login';
import AppRoutes, { RouteGuard } from './routers/AppRoutes';
import { routesConfig } from './routers/routesConfig';
import { CheckRole } from './utils';
import Otp from './pages/otp';
function App() {


  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/otp" element={<Otp />} />
      <Route
        path="/"
        element={
          <RouteGuard roles={[CheckRole.ADMIN, CheckRole.USER]} element={<LayoutComponent />} />
        }
      >
        {AppRoutes({ routes: routesConfig })}
      </Route>
      <Route path="*" element={<ErrorComponent />} />
    </Routes>
  )
}

export default App
