import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCreateWorkspace } from '@/hooks/apis/workspaces/useCreateWorkspace';
import { useCreateWorkspaceModal } from '@/hooks/context/useCreateWorkspaceModal';

export const CreateWorkspaceModal = () => {
    const { openCreateWorkspaceModal, setOpenCreateWorkspaceModal } = useCreateWorkspaceModal();

    const [workspaceDetails, setWorkspaceDetails] = useState({
        name: '',
        description: ''
    });

    const { isPending, createWorkspaceMutation } = useCreateWorkspace();

    const navigate = useNavigate();

    function handleClose() {
        setOpenCreateWorkspaceModal(false);
    }

    function changeHandler(event) {
        setWorkspaceDetails({
            ...workspaceDetails,
            [event.target.name] : event.target.value
        });
    }

    async function handleFormSubmit(event) {
        event.preventDefault();
        
        try{
            const response = await createWorkspaceMutation({ name: workspaceDetails.name, description: workspaceDetails.description });
            console.log('Create the workspace: ',response);
            navigate(`/workspaces/${response.data._id}`);
        } catch(error) {
            console.log('Not able to create a new workspace: ', error);
        } finally {
            setWorkspaceDetails({
                name: '',
                description: ''
            });
            setOpenCreateWorkspaceModal(false);
        }
    }

    return (
        <Dialog
            open = {openCreateWorkspaceModal}
            onOpenChange = {handleClose}
        >

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a new Workspace</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleFormSubmit} className='space-y-4'>
                    <Label htmlFor="name">Workspace Name</Label>
                    <Input 
                        required
                        minLength = {3}
                        placeholder = "Put the Workspace name e.g. Myworkspace, Dev Workspace, etc..."
                        name = "name"
                        type = "text"
                        label = "Workspace Name: "
                        value = {workspaceDetails.name}
                        onChange = {changeHandler}
                        disabled = {isPending}
                    />

                    <Label htmlFor="name">Workspace Description</Label>
                    <Input 
                        placeholder = "Put the Workspace description e.g. Dev Team of Product etc..."
                        name = "description"
                        type = "text"
                        label = "Workspace Description: "
                        value = {workspaceDetails.description}
                        onChange = {changeHandler}
                        disabled = {isPending}
                    />

                    <div className='flex justify-end mt-5'>
                        <Button type="submit" disabled={isPending}>Create Workspace</Button>
                    </div>
                </form> 
            </DialogContent>
            
        </Dialog>
    );
};