import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteWorkspaceRequest } from '@/apis/workspaces';
import useAuth from '@/hooks/context/useAuth';

const useDeleteWorkspace = ( workspaceId ) => {
    const { auth } = useAuth();

    const { isSuccess, isPending, error, mutateAsync: deleteWorkspaceMutation } = useMutation({
        mutationFn: () => deleteWorkspaceRequest({ workspaceId: workspaceId, token: auth?.token}),
        onSuccess: (response) => {
            console.log('Successfully Deleted the Workspace: ', response);
            toast.success('Successfully Deleted the Workspace');
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