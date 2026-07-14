import { WorkspaceNavbar } from '@/components/organism/Workspace/WorkspaceNavbar';
import { WorkspaceSidebar } from '@/components/organism/Workspace/WorkspaceSidebar';

export const WorkspaceLayout = ({ children }) => {
    return(
        <div className="h-screen">
            <WorkspaceNavbar />
            <div className="flex h-[calc(100vh-40px)]">
                <WorkspaceSidebar />
                { children }
            </div>
        </div>
    );
};