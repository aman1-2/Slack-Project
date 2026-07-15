import { WorkspaceNavbar } from '@/components/organism/Workspace/WorkspaceNavbar';
import { WorkspacePanel } from '@/components/organism/Workspace/WorkspacePanel';
import { WorkspaceSidebar } from '@/components/organism/Workspace/WorkspaceSidebar';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';


export const WorkspaceLayout = ({ children }) => {
    return(
        <div className="h-screen">
            <WorkspaceNavbar />
            <div className="flex h-[calc(100vh-40px)]">
                <WorkspaceSidebar />
                <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel
                        id="left-navigation-panel"
                        defaultSize="20%"
                        minSize="13%"
                        className="bg-slack-medium"
                    >
                        <div>
                            <WorkspacePanel></WorkspacePanel>
                        </div>
                    </ResizablePanel>

                    <ResizableHandle withHandle />

                    <ResizablePanel
                        id="right-navigation-panel"
                        minSize = "20%"
                    >
                        { children }
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </div>
    );
};