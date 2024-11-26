
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
    const user = useSelector(state => state.user.account);
    
    return user.role === 'Manager' ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;