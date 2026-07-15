import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updateWorkspaceRequest } from '@/apis/workspaces';
import useAuth from '@/hooks/context/useAuth';

const useUpdateWorkspace = ( workspaceId, ) => {
    const { auth } = useAuth();

    const { isPending, isSuccess, error, mutateAsync: updateWorkspaceMutaion } = useMutation({
        mutationFn: (updateData) => updateWorkspaceRequest({ 
            workspaceId: workspaceId, 
            name: updateData.name, 
            token: auth?.token 
        }),
        onSuccess: (response) => {
            console.log('Successfully Updated the Workspace', response);
            toast.success('Successfully Updated the Workspace');
        },
        onError: (error) => {
            console.log('Failed to Update the Workspace', error);
            toast.error('Failed to Update the Workspace');
        }
    });

    return {
        isPending,
        isSuccess,
        error,
        updateWorkspaceMutaion
    };
};

export default useUpdateWorkspace;