import { isMemberPartOfWorkspaceService } from "../service/memberService.js";
import { customErrorResponse, internalErrorResponse, successResponse } from '../utils/common/responseObject.js';

export const isMemberPartOfWorkspaceController = async (req, res) => {
    try {
        const response = await isMemberPartOfWorkspaceService(req.params.workspaceId, req.user);

        return res.status(200).json(
            successResponse(response, 'User is a member of Workspace')
        );
    } catch(error) {
        console.log("Member Controller Layer Error Is member Part of Workspace: ", error);
        
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