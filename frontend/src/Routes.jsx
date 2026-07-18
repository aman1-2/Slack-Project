import { Route, Routes } from 'react-router-dom';

import ProtectedRoute from '@/components/molecules/ProtectedRoute/ProtectedRoute';
import SigninCardContainer from '@/components/organism/Auth/SigninCardContainer';
import SignupCardContainer from '@/components/organism/Auth/SignupCardContainer';
import { Auth } from '@/pages/Auth/Auth';
import Home from '@/pages/Home/Home';
import NotFound from '@/pages/NotFound/NotFound';
import JoinPage from '@/pages/Workspace/JoinPage';
import { WorkspaceLayout } from '@/pages/Workspace/Layout';

const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={<h1>The first page</h1>}></Route>

            <Route path="/home" element={<ProtectedRoute> <Home /> </ProtectedRoute>} ></Route>
            <Route path="/workspaces/:workspaceId" element={<ProtectedRoute> <WorkspaceLayout> Workspace </WorkspaceLayout> </ProtectedRoute>} ></Route>
            <Route path="/auth/signup" element={<Auth><SignupCardContainer /></Auth>} ></Route>
            <Route path="/auth/signin" element={<Auth><SigninCardContainer /></Auth>} ></Route>
            <Route path="/workspaces/:workspaceId/channels/:channelId" element={<ProtectedRoute>  </ProtectedRoute>}></Route>
            <Route path="/workspaces/join/:workspaceId" element={<JoinPage />} />

            <Route path='/*' element={<NotFound></NotFound>} />
          </Routes>
    );
};

export default AppRoutes;