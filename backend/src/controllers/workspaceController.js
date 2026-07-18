import { addChannelToWorkspaceService, addMemberToWorkspaceService, createWorkspaceService, deleteWorkspaceService, getWorkspaceByJoinCodeService, getWorkspaceService, getWorkspaceUserIsMemberOfService, joinWorkspaceService, resetWorkspaceJoinCodeService, updateWorkspaceService } from "../service/workspaceService.js";
import { customErrorResponse, internalErrorResponse, successResponse } from "../utils/common/responseObject.js"

export const createWorkspaceController = async (req, res) => {
    try{
        const response = await createWorkspaceService({ ...req.body, owner: req.user});

        return res.status(201).json(
            successResponse(response, "Successfully Created the Workspace")
        );

    } catch(error) {
        console.log("Workspace creation Controller Layer Error: ", error);

        if(error.statusCode) {
            return res.status(error.statusCode).json(
                customErrorResponse(error)
            );
        }

        return res.status(500).json(
            internalErrorResponse(error)
        );
    }
};

export const getWorkspacesUserIsMemberOfController = async (req, res) => {
    try {
        const response = await getWorkspaceUserIsMemberOfService(req.user);
        return res.status(200).json(
            successResponse(response, "Workspace fetched Successfully")
        );
    } catch(error) {
        console.log("Workspace Controller Layer User Is Member of Workspace Error: ", error);

        if(error.statusCode) {
            return res.status(error.statusCode).json(
                customErrorResponse(error)
            );
        }

        return res.status(500).json(
            internalErrorResponse(error)
        );
    }
};

export const deleteWorkspaceController = async (req, res) => {
    try {
        const response = await deleteWorkspaceService(req.params.workspaceId, req.user);

        return res.status(200).json(
            successResponse(response, "Workspace Deleted Successfully")
        );
    } catch(error) {
        console.log("Workspace Deletion Controller Layer Error: ", error);

        if(error.statusCode) {
            return res.status(error.statusCode).json(
                customErrorResponse(error)
            );
        }

        return res.status(500).json(
            internalErrorResponse(error)
        );
    }
};

export const getWorkspaceController = async (req, res) => {
    try {
        const response = await getWorkspaceService(req.params.workspaceId, req.user);

        return res.status(200).json(
            successResponse(response, "Successfully Fetched the details of workspace")
        );
        
    } catch(error) {
        console.log("Get (details) Workspace Controller Layer Error: ", error);

        if(error.statusCode) {
            return res.status(error.statusCode).json(
                customErrorResponse(error)
            );
        }

        return res.status(500).json(
            internalErrorResponse(error)
        );
    }
}

export const getWorkspaceByJoinCodeController = async (req, res) => {
    try {
        const response = await getWorkspaceByJoinCodeService(req.params.joinCode, req.user);

        return res.status(200).json(
            successResponse(response, 'Workspace Fetched Successfully')
        );
    } catch(error) {
       console.log("Get (details) of Workspace By Join Code Controller Layer Error: ", error);

        if(error.statusCode) {
            return res.status(error.statusCode).json(
                customErrorResponse(error)
            );
        }

        return res.status(500).json(
            internalErrorResponse(error)
        ); 
    }
};

export const updateWorkspaceController = async (req, res) => {
    try {
        const response = await updateWorkspaceService(req.params.workspaceId, req.body , req.user);

        return res.status(200).json(
            successResponse(response, 'Workspace Updated Successfully')
        );
    } catch(error) {
        console.log("Update Workspace Controller Layer Error: ", error);

        if(error.statusCode) {
            return res.status(error.statusCode).json(
                customErrorResponse(error)
            );
        }

        return res.status(500).json(
            internalErrorResponse(error)
        );
    }
}

export const addMemberToWorkspaceController = async (req, res) => {
    try {
        const response = await addMemberToWorkspaceService(
            req.params.workspaceId, 
            req.body.memberId, 
            req.body.role || 'member',
            req.user
        );

        return res.status(200).json(
            successResponse(response, 'Successfully Added New Member to Workspace')
        );
    } catch (error) {
        console.log("Add Member to Workspace Controller Layer Error: ", error);

        if(error.statusCode) {
            return res.status(error.statusCode).json(
                customErrorResponse(error)
            );
        }

        return res.status(500).json(
            internalErrorResponse(error)
        ); 
    }
};

export const addChannelToWorkspaceController = async (req, res) => {
    try {
        const resposne = await addChannelToWorkspaceService(
            req.params.workspaceId, req.body.channelName, req.user
        );

        return res.status(200).json(
            successResponse(resposne, 'Successfully Added New Channel to Workspace')
        );
    } catch(error) {
        console.log("Add Channel to Workspace Controller Layer Error: ", error);

        if(error.statusCode) {
            return res.status(error.statusCode).json(
                customErrorResponse(error)
            );
        }

        return res.status(500).json(
            internalErrorResponse(error)
        );
    }
}

export const resetWorkspaceJoinCodeController = async (req, res) => {
    try {
        const response = await resetWorkspaceJoinCodeService(
            req.params.workspaceId, req.user
        );

        return res.status(200).json(
            successResponse(response, 'Successfully Reset the Join-Code for the Workspace')
        );
    } catch(error) {
        console.log("Reset Join-Code of Workspace Controller Layer Error: ", error);

        if(error.statusCode) {
            return res.status(error.statusCode).json(
                customErrorResponse(error)
            );
        }

        return res.status(500).json(
            internalErrorResponse(error)
        );
    }
}

export const joinWorkspaceController = async (req, res) => {
    try {
        const response = await joinWorkspaceService(
            req.params.workspaceId,
            req.body.joinCode,
            req.user
        );

        return res.status(200).json(
            successResponse(response, 'Successfully Joined the Workspace')
        );
    } catch(error) {
        console.log("Join Workspace Controller Layer Error: ", error);

        if(error.statusCode) {
            return res.status(error.statusCode).json(
                customErrorResponse(error)
            );
        }

        return res.status(500).json(
            internalErrorResponse(error)
        );
    }
}