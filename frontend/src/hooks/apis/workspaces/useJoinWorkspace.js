import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { joinWorkspaceRequest } from '@/apis/workspaces';
import useAuth from '@/hooks/context/useAuth';

const useJoinWorkspace = (workspaceId) => {
    const { auth } = useAuth();
    const queryClient = useQueryClient();

    const { isPending, isSuccess, error, mutateAsync: joinWorkspaceMutation } = useMutation({
        mutationFn: (joinCode) => joinWorkspaceRequest({ workspaceId, joinCode, token: auth?.token}),

        onSuccess: async (response) => {
            console.log('Successfully Joined the workspace', response);
            toast.success('New Member Joined Workspace');

            await queryClient.invalidateQueries({
                queryKey: ['fetchWorkspaces']
            });
            await queryClient.invalidateQueries({
                queryKey: ['fetchWorkspacesById', workspaceId]
            });
        },

        onError: (error) => {
            console.log('Failed to add the member to workspace', error);
            toast.warning('Failed to Join workspace, check Join Code!');
        }
    });

    return {
        isPending,
        isSuccess,
        error,
        joinWorkspaceMutation
    };
};

export default useJoinWorkspace;