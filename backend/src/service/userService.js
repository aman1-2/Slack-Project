import bcrypt from 'bcrypt';

import userRepository from "../repositories/userRepository.js"
import ClientError from "../utils/errors/clientError.js";
import ValidationError from "../utils/errors/validationError.js";
import { createJWT } from '../utils/common/authUtils.js';
import { ENABLE_EMAIL_VERIFICATION } from '../config/serverConfig.js';
import { addEmailtoMailQueue } from '../producers/mailQueueProducer.js';
import { verifyEmailMail } from '../utils/common/mailObject.js';

export const signUpService = async (data) => {
    try {
        const newUser = await userRepository.signUpUser(data);

        console.log(ENABLE_EMAIL_VERIFICATION);

        if(ENABLE_EMAIL_VERIFICATION) {
            console.log(newUser);
            console.log(newUser.verificationToken);
            console.log(newUser.email);
            // send verification email
            addEmailtoMailQueue({
                ...verifyEmailMail(newUser.verificationToken),
                to: newUser.email
            });
        }

        return newUser;
    } catch (error) {
        console.log('User signUp service error', error);
        
        if (error.name === 'ValidationError') {
            throw new ValidationError(
                {
                    error: error.errors
                },
                error.message
            );
        }

        if (error.name === 'MongooseError' && error.cause?.code === 11000) {
            throw new ValidationError(
                {
                    error: ['A user with same email or username already exists']
                },
                'A user with same email or username already exists'
            );
        }
    }
}

export const verifyTokenService = async (token) => {
    try {
        console.log("Received token:", token);
        
        const user = await userRepository.getByToken(token);

        console.log(user);

        if(!user) {
            throw new ClientError({
                explanation: "Invalid data sent from the client",
                message: "Invalid email verification token",
                statusCode: 400
            });
        }

        // check is token has expired or not
        if(user.verificationTokenExpiry < Date.now()) {
            throw new ClientError({
                explanation: "Invalid data sent from the client",
                message: "Email verification token expired",
                statusCode: 400
            });
        }

        user.isVerified = true;
        user.verificationToken = null;
        user.verificationTokenExpiry = null;

        await user.save();

        return user;
    } catch(error) {
        console.log("User email token verification user service layer Error: ", error);
        throw error;
    }
}

export const signInService = async (data) => {
    try {
        const user = await userRepository.getUserByEmail(data.email);

        if(!user) {
            throw new ClientError({
                explanation: "Invalid Data send from the client",
                message: "No registered user found with this email",
                statusCode: 404
            });
        }

        // match the incoming password with the hashed password
        const isMatch = bcrypt.compareSync(data.password, user.password);

        if(!isMatch) { // password not matched
            throw new ClientError({
                explanation: "Invalid data sent from the client",
                message: "Invalid password, please try again",
                statusCode: 400
            });
        }
        
        return {
            username: user.username,
            avatar: user.avatar,
            email: user.email,
            _id: user._id,
            token: createJWT({id: user._id, email: user.email})
        };
    } catch(error) {
        console.log("User Service Layer SignIn Error: ", error);
        throw error;
    }
}