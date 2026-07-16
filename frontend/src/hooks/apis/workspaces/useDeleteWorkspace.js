import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { deleteWorkspaceRequest } from '@/apis/workspaces';
import { useFetchWorkspace } from '@/hooks/apis/workspaces/useFetchWorkspace';
import useAuth from '@/hooks/context/useAuth';
import { useCreateWorkspaceModal } from '@/hooks/context/useCreateWorkspaceModal';
import useWorkspacePreferencesModal from '@/hooks/context/useWorkspacePreferencesModal';

const useDeleteWorkspace = () => {
    const { auth } = useAuth();

    const { workspace, setOpenWorkspacePreferenceModal } = useWorkspacePreferencesModal();

    const { isPending: isPendingFetch, workspaces } = useFetchWorkspace();

    const { setOpenCreateWorkspaceModal } = useCreateWorkspaceModal();

    const naviagte = useNavigate();

    const queryClient = useQueryClient();

    function navigateToNextWorkspace() {
        console.log('Navigating to new workspace');
        
        if(isPendingFetch)  return;

        if(workspaces?.data?.length === 0 || !workspaces) {
            console.log('No workspace available for current user need to create one');
            setOpenCreateWorkspaceModal(true);
        } else {
            const nextWorkspace = workspaces?.data?.find((wk) => wk._id != workspace._id);
            if(nextWorkspace) {
                naviagte(`/workspaces/${nextWorkspace._id}`);
                toast.info('Redirected to next existing workspace');
            } else {
                toast.info('Create a new Workspace, No workspace available');
                setOpenCreateWorkspaceModal(true);
                setOpenWorkspacePreferenceModal(false);
            }
        }
    }

    const { isSuccess, isPending, error, mutateAsync: deleteWorkspaceMutation } = useMutation({
        mutationFn: () => deleteWorkspaceRequest({ workspaceId: workspace._id, token: auth?.token}),
        onSuccess: async (response) => {
            console.log('Successfully Deleted the Workspace: ', response);
            toast.success('Successfully Deleted the Workspace');
            await queryClient.invalidateQueries({
                queryKey: ['fetchWorkspaces'],
            });
            navigateToNextWorkspace();
        },
        onError: (error) => {
            console.log('Error while deleting the workspace: ', error);
            toast.error('Error while deleting the workspace');
        }
    });

    return {
        isSuccess,
        isPending,
        error,
        deleteWorkspaceMutation
    };
};

export default useDeleteWorkspace;