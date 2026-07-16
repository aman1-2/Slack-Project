import combineContext from '@/utils/combineContex';

import { AuthContextProvider } from './AuthContext';
import { CreateChannelContextProvide } from './CreateChannelContext';
import { CreateWorkspaceContextProvider } from './CreateWorkspaceContext';
import { WorkspacePreferenceContextProvider } from './WorkspacePreferencesModalContext';

const AppContextProvider = combineContext(
    AuthContextProvider,
    CreateWorkspaceContextProvider,
    WorkspacePreferenceContextProvider,
    CreateChannelContextProvide
);

export default AppContextProvider;