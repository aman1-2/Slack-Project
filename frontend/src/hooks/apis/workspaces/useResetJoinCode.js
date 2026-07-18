import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { resetJoinCodeRequest } from '@/apis/workspaces';
import useAuth from '@/hooks/context/useAuth';

const useResetJoinCode = (workspaceId) => {
    const { auth } = useAuth();
    const queryClient = useQueryClient();

    const { isSuccess, isPending, error, mutateAsync: resetJoinCodeMutation} = useMutation({
        mutationFn: () => resetJoinCodeRequest( { workspaceId, token: auth?.token }),

        onSuccess: (resposne) => {
            console.log('Successfully Reset the Join-Code for the Workspace', resposne);
            toast.success('Reset the Join Code successfully');

            queryClient.invalidateQueries({
                queryKey: ['fetchWorkspaces']
            });

            queryClient.invalidateQueries({
                queryKey: ['fetchWorkspaceById', workspaceId]
            });
        },

        onError: (error) => {
            console.log('Failed to reset the Join Code for the workspace: ', error);
            toast.error('Failed to reset the Join Code');
        }
    });

    return {
        isSuccess,
        isPending,
        error,
        resetJoinCodeMutation
    };
};

export default useResetJoinCode;