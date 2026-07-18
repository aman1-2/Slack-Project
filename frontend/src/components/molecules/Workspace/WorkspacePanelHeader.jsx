import { ChevronDownIcon, ListFilterIcon, SquarePenIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import WorkspaceInviteModal from '@/components/organism/Modals/WorkspaceInviteModal';
import { Button, buttonVariants } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import useAuth from '@/hooks/context/useAuth';
import useWorkspacePreferencesModal from '@/hooks/context/useWorkspacePreferencesModal';
import { cn } from '@/lib/utils';

const WorkspacePanelHeader = ({ workspace }) => {
    const { auth } = useAuth();
    const { setOpenWorkspacePreferenceModal, setInitialValue, setWorkspace } = useWorkspacePreferencesModal();
    
    const[openInviteModal, setOpenInviteModal] = useState(false);

    const workspaceMemebers = workspace?.members;
    const isUserAdmin = workspaceMemebers.find(
        (member) => {
            return (member.memberId._id === auth?.user?._id && member.role === 'admin');
    });
    
    useEffect(()=>{
        setWorkspace(workspace);
    }, []);

    return( 
        <>
            <WorkspaceInviteModal 
                openInviteModal={openInviteModal}
                setOpenInviteModal={setOpenInviteModal}
                workspaceName={workspace?.name}
                joinCode={workspace?.joinCode}
                workspaceId={workspace?._id}
            />

            <div className="flex items-center justify-between px-4 h-[50px] gap-0.5" >
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <div
                            className={cn(buttonVariants({
                                variant: 'transparent',
                                className: 'font-semibold text-lg w-auto p-1.5 overflow-hidden',
                                })
                            )}
                        >
                            <span className="truncate">
                                {workspace?.name}
                            </span>
                            <ChevronDownIcon className="size-5 ml-1"></ChevronDownIcon>
                        </div>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent side="bottom" align="start" className="w-64">
                            <DropdownMenuItem>
                                <div className="size-9 relative overflow-hidden text-white font-semibold text-xl rounded-md flex items-center justify-center mr-2 bg-[#616061]">
                                    {workspace?.name?.charAt(0)?.toUpperCase()}
                                </div>

                                <div className="flex flex-col items-start">
                                    <p className="font-bold">
                                        {workspace?.name} 
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Active Workspace
                                    </p>
                                </div>
                            </DropdownMenuItem>

                            {
                                isUserAdmin && (
                                    <>
                                        <DropdownMenuItem 
                                            className="cursor-pointer py-2"
                                            onClick={() => {
                                                setOpenWorkspacePreferenceModal(true);
                                                setInitialValue(workspace?.name);
                                            }}
                                        >
                                            Preferences
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem 
                                            className="cursor-pointer py-2"
                                            onClick={() => setOpenInviteModal(true)}
                                        >
                                            Invite People to {workspace?.name}
                                        </DropdownMenuItem>
                                    </>
                                )
                            }
                    </DropdownMenuContent>
                </DropdownMenu>

                <div
                    className="flex items-center gap-0.5 "
                >
                    <Button
                        variant="transparent"
                        size="iconsm"
                    >
                        <ListFilterIcon className="size-5" />
                    </Button>

                    <Button
                        variant="transparent"
                        size="iconsm"
                    >
                        <SquarePenIcon className="size-5" />
                    </Button>
                </div>
            </div>
        </>
    );
};

export default WorkspacePanelHeader;