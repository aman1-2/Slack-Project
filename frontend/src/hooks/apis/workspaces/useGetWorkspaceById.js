import { useQuery } from '@tanstack/react-query';

import { fetchWorkspaceDetailsRequest } from '@/apis/workspaces';
import useAuth from '@/hooks/context/useAuth';

export const useGetWorkspaceById = (id) => {
    const { auth } = useAuth();

    const {isPending, isSuccess, isError, isFetching, data: workspaceByIdDetails} = useQuery({
        queryFn: () => fetchWorkspaceDetailsRequest( {workspaceId: id, token: auth?.token} ),
        queryKey: ['fetchWorkspaceById', id],
        staleTime: 10000
    });

    return {
        isPending,
        isError,
        isSuccess,
        isFetching,
        workspaceByIdDetails
    };
};