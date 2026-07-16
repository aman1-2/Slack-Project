import { TrashIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import useDeleteWorkspace from '@/hooks/apis/workspaces/useDeleteWorkspace';
import useUpdateWorkspace from '@/hooks/apis/workspaces/useUpdateWorkspace';
import useWorkspacePreferencesModal from '@/hooks/context/useWorkspacePreferencesModal';
import useConfirm from '@/hooks/useConfirm';

export const WorkspacePreferencesModal = () => {
    const { initialValue, openWorkspacePreferenceModal, setOpenWorkspacePreferenceModal, workspace } = useWorkspacePreferencesModal();
    const { deleteWorkspaceMutation } = useDeleteWorkspace();
    const { isPending, updateWorkspaceMutaion } = useUpdateWorkspace();
    const { confirmation: deleteConfirmation, ConfirmDialog: DeleteConfirmationDialog } = useConfirm({
        title: 'Do you want to delete the workspace?',
        message: 'This action can\'t be undone'
    });
    const { confirmation: updateConfirmation, ConfirmDialog: UpdateConfirmationDialog } = useConfirm({
        title: 'Do you want to update the workspace?',
        message: 'This action can\'t be undone'
    });

    const [editOpen, setEditOpen] = useState(false);
    const[renameValue, setRenameValue] = useState(workspace?.name);

    function handleClose() {
        setOpenWorkspacePreferenceModal(false);
    }

    async function handleDeleteWorkspace() {
        try {
            const ok = await deleteConfirmation();
            if(!ok)     return;

            await deleteWorkspaceMutation();
            setOpenWorkspacePreferenceModal(false);
        } catch(error) {
            console.log('Error Faced while deleting the workspace: ', error);
            throw error.response.data;
        }
    }

    async function handleFormSubmit(event) {
        event.preventDefault();

        try{
            const ok = await updateConfirmation();
            if(!ok)     return;

            await updateWorkspaceMutaion({ name: renameValue });
            setEditOpen(false);  
            setOpenWorkspacePreferenceModal(true);
        } catch(error) {
            console.log('Error Faced while Updating the workspace: ', error);
            throw error.response.data;
        }
    }

    useEffect(()=>{
        
    }, [setRenameValue]);

    return(
        <>
            <DeleteConfirmationDialog />
            <UpdateConfirmationDialog />

            <Dialog
                open = {openWorkspacePreferenceModal}
                onOpenChange = {handleClose}
            >
                <DialogContent className="p-0 bg-gray-50 overflow-hidden">
                    <DialogHeader className="p-4 border-b bg-white">
                        <DialogTitle> {initialValue} </DialogTitle>
                    </DialogHeader>

                    <div className="px-4 pb-4 flex flex-col gap-y-2">
                        
                        <Dialog open={editOpen} onOpenChange={setEditOpen}>
                            <DialogTrigger>
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
                            </DialogTrigger>

                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Rename Workspace
                                    </DialogTitle>
                                </DialogHeader>

                                <form className='space-y-4' onSubmit={handleFormSubmit}>
                                    <Input 
                                        required
                                        autoFocus
                                        value={renameValue}
                                        minLength={3}
                                        maxLength={50}
                                        placeholder='Workspace name e.g. Dev Team'
                                        disabled={isPending}
                                        onChange={(e) => setRenameValue(e.target.value)}
                                    />

                                    <DialogFooter>
                                        <DialogClose>
                                            <Button variant='outline' disabled={isPending}>
                                                Cancel
                                            </Button>
                                        </DialogClose>

                                        <Button type="submit" disabled={isPending}>
                                            Save
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>

                        </Dialog>

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
        </>
        
    );
};