// AppRoutes.jsx
import { Route } from 'react-router-dom';
import { Suspense, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LoadingLayout from '../components/loadingLayout';
import useGetByIdUser from '../hooks/useGetByIdUser';

export const RouteGuard = ({ element, roles }:any) => {
  const { authenticated } = useContext(AuthContext);
  const { role, loading  } = useGetByIdUser();

  if (!authenticated) return <Navigate to="/login" replace />;
   if (loading) return <LoadingLayout />;
  if (roles && !roles.includes(role?.id)) return <Navigate to="/error" replace />;

  return <Suspense fallback={<LoadingLayout />}>{element}</Suspense>;
};

const AppRoutes = ({ routes }:any) => {
  return routes.map(({ path, element, private: isPrivate, roles }: any) => {
    if (!isPrivate) {
      return <Route key={path} path={path} element={<Suspense fallback={<LoadingLayout />}>{element}</Suspense>} />;
    }

    return (
      <Route
        key={path}
        path={path}
        element={<RouteGuard element={element} roles={roles} />}
      />
    );
  });
};

export default AppRoutes;
