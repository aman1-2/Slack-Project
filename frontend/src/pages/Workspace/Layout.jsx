import { WorkspaceSidebar } from '@/components/organism/Workspace/WorkspaceSidebar';

export const WorkspaceLayout = ({ children }) => {
    return(
        <div className="h-screen">
            <div className="flex h-screen">
                <WorkspaceSidebar />
                { children }
            </div>
        </div>
    );
};