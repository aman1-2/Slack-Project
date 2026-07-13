import { Navigate } from 'react-router-dom';

import useAuth from '@/hooks/context/useAuth';

const ProtectedRoute = ({ children }) => {
    const { auth } = useAuth();

    if(auth.isLoading) {
        return(
            <div>
                Loading ....
            </div>
        );
    }

    if(!auth.token || !auth.user) {
        return(
            <Navigate to={'/auth/signin'}></Navigate>
        );
    }

    return children;
};

export default ProtectedRoute;