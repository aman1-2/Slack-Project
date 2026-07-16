import { TrashIcon } from 'lucide-react';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import useDeleteWorkspace from '@/hooks/apis/workspaces/useDeleteWorkspace';
import useWorkspacePreferencesModal from '@/hooks/context/useWorkspacePreferencesModal';

export const WorkspacePreferencesModal = () => {
    const { initialValue, openWorkspacePreferenceModal, setOpenWorkspacePreferenceModal } = useWorkspacePreferencesModal();

    const { deleteWorkspaceMutation } = useDeleteWorkspace();

    function handleClose() {
        setOpenWorkspacePreferenceModal(false);
    }

    async function handleDeleteWorkspace() {
        try {
            await deleteWorkspaceMutation();
            setOpenWorkspacePreferenceModal(false);
        } catch(error) {
            console.log('Error Faced while deleting the workspace: ', error);
            throw error.response.data;
        }
    }

    return(
        <Dialog
            open = {openWorkspacePreferenceModal}
            onOpenChange = {handleClose}
        >
            <DialogContent className="p-0 bg-gray-50 overflow-hidden">
                <DialogHeader className="p-4 border-b bg-white">
                    <DialogTitle> {initialValue} </DialogTitle>
                </DialogHeader>

                <div className="px-4 pb-4 flex flex-col gap-y-2">
                    <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                            <p className="font-semibold text-sm">
                                Workspace Name
                            </p>
                            <p className="text-sm font-semibold hover:underline">
                                Edit
                            </p>
                        </div>

                        <p className='text-sm'>
                            {initialValue}
                        </p>
                    </div>

                    <button 
                        className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg"
                        onClick={handleDeleteWorkspace}
                    >
                        <TrashIcon className="size-5"></TrashIcon>
                        <p className='text-sm font-semibold'>
                            Delete Workspace
                        </p>
                    </button>
                </div>
            </DialogContent>

        </Dialog>
    );
};