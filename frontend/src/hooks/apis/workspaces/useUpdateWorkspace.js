import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updateWorkspaceRequest } from '@/apis/workspaces';
import useAuth from '@/hooks/context/useAuth';
import useWorkspacePreferencesModal from '@/hooks/context/useWorkspacePreferencesModal';



const useUpdateWorkspace = () => {
    const { auth } = useAuth();
    const { workspace } = useWorkspacePreferencesModal();

    const queryClient = useQueryClient();

    const { isPending, isSuccess, error, mutateAsync: updateWorkspaceMutaion } = useMutation({
        mutationFn: (updateData) => updateWorkspaceRequest({ 
            workspaceId: workspace._id, 
            updateData, 
            token: auth?.token 
        }),

        onSuccess: async (response) => {
            console.log('Successfully Updated the Workspace', response);
            toast.success('Successfully Updated the Workspace');
            
            await queryClient.invalidateQueries({
                queryKey: ['fetchWorkspaceById', workspace._id]
            });
            
            await queryClient.invalidateQueries({
                queryKey: ['fetchWorkspaces']
            });
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