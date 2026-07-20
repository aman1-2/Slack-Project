import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { signUpRequest } from '@/apis/auth';


export const useSignUp = () => {
    const { isPending, isSuccess, error, mutateAsync: signUpMutation} = useMutation({
        mutationFn: signUpRequest,
        onSuccess: (data) => {
            console.log('Successfully Signed Up: ', data);
            
            toast('Successfully Signed Up', {
                description: 'You will be redirected to the login page in few seconds',
            });
        },
        onError: (error) => {
            console.log('Failed to Sign-Up: ', error);
            toast.error('Failed to Sign-Up');
        }
    });
    
    return {
        isPending, isSuccess, error, signUpMutation
    };
};