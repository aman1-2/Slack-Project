import combineContext from '@/utils/combineContex';

import { AuthContextProvider } from './AuthContext';
import { CreateWorkspaceContextProvider } from './CreateWorkspaceContext';

const AppContextProvider = combineContext(
    AuthContextProvider,
    CreateWorkspaceContextProvider
);

export default AppContextProvider;