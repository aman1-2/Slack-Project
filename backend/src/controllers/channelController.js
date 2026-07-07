import { getChannelByIdService } from "../service/channelService.js";
import { customErrorResponse, internalErrorResponse, successResponse } from "../utils/common/responseObject.js";

export const getChannelByIdController = async (req, res) => {
    try {
        const response = await getChannelByIdService(req.params.channelId, req.user);

        return res.status(200).json(
            successResponse(response, 'Successfully Fetched the Channel')
        );
    } catch(error) {
        console.log("Get the Channel by Id Controller Layer Error: ", error);
        
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