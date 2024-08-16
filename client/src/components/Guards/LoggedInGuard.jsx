import { Navigate, Outlet } from "react-router-dom";
import {useAuthContext} from '../../contexts/AuthContext';

export default function LoggedInGuard() {
    const { isAuthenticated } = useAuthContext();

    if (isAuthenticated) {
        return <Navigate to="/recipes" />;
    }

    return <Outlet />;
}