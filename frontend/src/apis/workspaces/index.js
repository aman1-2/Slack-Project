import axios from '@/config/axios.config';

export const createWorkspaceRequest = async ({ name, description, token }) => {
    try {
        const response = await axios.post('/workspaces', { name, description }, {
            headers: {
                'x-access-token': token
            }
        });

        return response?.data;
    } catch(error) {
        console.log('API Request Error while creating a workspace: ', error);
        throw error.response.data;
    }
};

export const fetchWorkspaceRequest = async ({ token }) => {
    try {
        const response = await axios.get('/workspaces', {
            headers: {
                'x-access-token': token
            }
        });

        return response?.data;
    } catch(error) {
        console.log('API Request Error while fetching the workspace details');
        throw error.response.data;
    }
};

export const fetchWorkspaceDetailsRequest = async ({ workspaceId, token }) => {
    try {
        const response = await axios.get(`/workspaces/${workspaceId}`, {
            workspaceId,
            headers: {
                'x-access-token': token
            }
        });

        return response?.data;
    } catch(error) {
        console.log('API Request Error while Fetching the details of the Workspace: ', error);
    }
};