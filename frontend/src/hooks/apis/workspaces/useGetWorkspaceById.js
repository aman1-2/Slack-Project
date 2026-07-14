import { useQuery } from '@tanstack/react-query';

import { fetchWorkspaceDetailsRequest } from '@/apis/workspaces';
import useAuth from '@/hooks/context/useAuth';

export const useGetWorkspaceById = (id) => {
    const { auth } = useAuth();

    const {isPending, isSuccess, isError, data: WorkspaceByIdDetails} = useQuery({
        queryFn: (id) => fetchWorkspaceDetailsRequest( {workspaceId: id, token: auth?.token} ),
        queryKey: [`fetchWorkspacebyId-${id}`],
        staleTime: 10000
    });

    return {
        isPending,
        isError,
        isSuccess,
        WorkspaceByIdDetails
    };
};