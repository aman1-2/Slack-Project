import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { addMemberToWorkspaceRequest } from '@/apis/workspaces';
import useAuth from '@/hooks/context/useAuth';

const useAddMemberToWorkspace = (workspaceId) => {
    const { auth } = useAuth();
    const queryClient = useQueryClient();

    const { isSuccess, isPending, error, mutateAsync: addMemberToWorkspaceMutation } = useMutation({
        mutationFn: () => addMemberToWorkspaceRequest({ workspaceId, token: auth?.token }),

        onSuccess: async (response) => {
            console.log('Successfully added the member to workspace', response);
            toast.success('Added a new member to workspace successfully');

            await queryClient.invalidateQueries({
                queryKey: ['fetchWorkspaces']
            });
            await queryClient.invalidateQueries({
                queryKey: ['fetchWorkspacesById', workspaceId]
            });
        },

        onError: (error) => {
            console.log('Failed to add the member to the workspace', error);
        }
    });

    return {
        isSuccess,
        isPending,
        error,
        addMemberToWorkspaceMutation
    };
};

export default useAddMemberToWorkspace;