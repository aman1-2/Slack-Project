import { Route, Routes } from 'react-router-dom';

import ProtectedRoute from '@/components/molecules/ProtectedRoute/ProtectedRoute';
import SigninCardContainer from '@/components/organism/Auth/SigninCardContainer';
import SignupCardContainer from '@/components/organism/Auth/SignupCardContainer';
import { Auth } from '@/pages/Auth/Auth';
import NotFound from '@/pages/NotFound/NotFound';

const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={<ProtectedRoute> <div>Home Page go to /auth</div> </ProtectedRoute>}></Route>
            <Route path="/auth/signup" element={<Auth><SignupCardContainer /></Auth>}></Route>
            <Route path="/auth/signin" element={<Auth><SigninCardContainer /></Auth>}></Route>

            <Route path='/*' element={<NotFound></NotFound>} />
          </Routes>
    );
};

export default AppRoutes;