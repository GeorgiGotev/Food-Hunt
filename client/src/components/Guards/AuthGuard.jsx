import { Navigate, Outlet } from "react-router-dom";
import {useAuthContext} from '../../contexts/AuthContext';

export default function AuthGuard() {
    const { isAuthenticated } = useAuthContext();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}