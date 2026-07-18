import { CopyIcon, RefreshCcwIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import useResetJoinCode from '@/hooks/apis/workspaces/useResetJoinCode';
// import useCurrentWorkspace from '@/hooks/context/useCurrentWorkspace';

const WorkspaceInviteModal = ({ openInviteModal, setOpenInviteModal, workspaceName, joinCode, workspaceId }) => {
    // const { currentWorkspace } = useCurrentWorkspace(); // another way of accessing data one we are applying.
    const { resetJoinCodeMutation } = useResetJoinCode(workspaceId);
    // console.log(currentWorkspace?.data?.name);
    // console.log(currentWorkspace?.data?.joinCode);

    async function handleCopy() {
        const inviteLink = `${window.location.origin}/join/${joinCode}`;
        await navigator.clipboard.writeText(inviteLink);
        toast.info('Invite Link copied in Clipboard');
    }

    async function handleResetCode() {
        try {
            await resetJoinCodeMutation();
        } catch(error) {
            console.log('Error faced in reseting join code while calling: ', error);
        }
    }

    return(
        <Dialog open={openInviteModal} onOpenChange={setOpenInviteModal}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Invite People to { workspaceName }
                    </DialogTitle>
                    <DialogDescription>
                        Use the code shown below to intvite people to your workspace.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col items-center justify-center py-10 gap-y-4">
                    <p className='font-bold text-2xl uppercase'>
                        { joinCode }
                    </p>

                    <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={handleCopy}
                    >
                        Copy Invite Link
                        <CopyIcon className="size-4 ml-2" />
                    </Button>
                </div>

                <div className="flex items-center justify-center w-full">
                    <Button 
                        size="sm" 
                        variant="outline"
                        onClick={handleResetCode}
                    >
                        Reset Join Code
                        <RefreshCcwIcon className="size-4 ml-2" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default WorkspaceInviteModal;