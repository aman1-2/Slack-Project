import { createWorkspaceService, deleteWorkspaceService, getWorkspaceService, getWorkspaceUserIsMemberOfService } from "../service/workspaceService.js";
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