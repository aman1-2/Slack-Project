import { customErrorResponse } from "../utils/common/responseObject.js";

export const validate = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.parseAsync(req.body);
            next();
        } catch(error) {
            console.log("Validation Error in Zod Validator: ", error.issues);

            let explanation = [];
            error.issues.forEach(key => {
                explanation.push(key.path[0] + ':' + key.message)
            });

            return res.status(400).json(
                customErrorResponse({
                    message: 'Validation Error',
                    explanation: explanation 
                })
            );
        }
    };
};
