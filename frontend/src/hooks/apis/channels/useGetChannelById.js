import { useQuery } from '@tanstack/react-query';

import { getChannelById } from '@/apis/channels';
import useAuth from '@/hooks/context/useAuth';

const useGetChannelById = (channelId) => {
    const { auth } = useAuth();

    const { isFetching, isError, data: channelDetails, error } = useQuery({
        queryFn: () => getChannelById({ channelId, token: auth?.token }),
        queryKey: ['fetchChannelById', channelId],
        enabled: !!channelId && !!auth?.token,
        staleTime: 10000
    });

    return {
        isFetching,
        isError,
        channelDetails,
        error
    };
};

export default useGetChannelById;