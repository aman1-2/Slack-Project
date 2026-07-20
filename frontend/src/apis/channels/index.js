import axios from '@/config/axios.config';

export const getChannelById = async ({ channelId, token }) => {
    try {
        const response = await axios.get(`/channels/${channelId}`,
            {
                headers: {
                    'x-access-token': token
                }
            }
        );

        return response?.data;
    } catch(error) {
        console.log('API Request Error in Channels while fetching channel details: ', error);
        throw error?.response?.data;
    }
};