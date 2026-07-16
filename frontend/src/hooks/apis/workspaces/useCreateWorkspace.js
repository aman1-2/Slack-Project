import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createWorkspaceRequest } from '@/apis/workspaces';
import useAuth from '@/hooks/context/useAuth';

export const useCreateWorkspace = () => {
    const { auth } = useAuth();

    const queryClient = useQueryClient();

    const {isPending, isError, isSuccess, mutateAsync: createWorkspaceMutation } = useMutation({
        mutationFn: (data) => createWorkspaceRequest({ ...data, token: auth?.token }),
        onSuccess: async (response) => {
            console.log('Successfully created the workspace: ', response);
            toast.success('Your New Workspace Successfully Created');
            await queryClient.invalidateQueries({
                queryKey: ['fetchWorkspaces'],
            });
        },
        onError: (error) => {
            console.log('Failed to create the workspace: ', error);
            toast.error('Failed to create the workspace');
        }
    });

    return {
        isPending,
        isError,
        isSuccess,
        createWorkspaceMutation
    };
};

