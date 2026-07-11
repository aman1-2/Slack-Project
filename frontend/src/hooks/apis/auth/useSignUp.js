import { useMutation } from '@tanstack/react-query';

import { signUpRequest } from '@/apis/auth';


export const useSignUp = () => {
    const { isPending, isSuccess, error, mutateAsync: signUpMutation} = useMutation({
        mutationFn: signUpRequest,
        onSuccess: (data) => {
            console.log('Successfully Signed Up: ', data);
        },
        onError: (error) => {
            console.log('Failed to Sign-Up: ', error);
        }
    });
    
    return {
        isPending, isSuccess, error, signUpMutation
    };
};