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
        throw error.response.data;
    }
};

export const deleteWorkspaceRequest = async({ workspaceId, token }) => {
    try {
        const response = await axios.delete(`/workspaces/${workspaceId}`, {
            workspaceId,
            headers: {
                'x-access-token': token
            }
        });

        return response?.data;
    } catch(error) {
        console.log('API Request Error while Deleting the workspace: ', error);
        throw error.response.data;
    }
};

export const updateWorkspaceRequest = async ({ workspaceId, updateData, token }) => {
    try {
        const response = await axios.put(`/workspaces/${workspaceId}`, { workspaceId, updateData,
            headers: {
                'x-access-token': token
            }
        });

        return response?.data;
    } catch(error) {
        console.log('API Request Error while Updating the workspace: ', error);
        throw error.response.data;
    }
};