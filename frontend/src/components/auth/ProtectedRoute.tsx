import { Navigate, Outlet } from 'react-router-dom';

export const isTokenValid = () => !!localStorage.getItem('authorization')?.length;

const ProtectedRoute = () => {
    if (!isTokenValid()) {
        return <Navigate to='/login' replace />;
    }

    return <Outlet />;
};
export default ProtectedRoute;