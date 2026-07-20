import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { signInRequest } from '@/apis/auth';
import useAuth from '@/hooks/context/useAuth';

const useSignIn = () => {
    const { setAuth } = useAuth();

    const {isPending, isError, isSuccess, mutateAsync: signInMutation} = useMutation({
        mutationFn: signInRequest,

        onSuccess: (response) => {
            console.log('Successfully signed in User: ', response);

            const userObject = JSON.stringify(response.data);

            localStorage.setItem('user', userObject);
            localStorage.setItem('token', response.data.token);

            // Once set in the local storage lets update it inside the context as well for fast access.
            setAuth({
                'user': response.data,
                'token': response.data.token,
                'isLoading': false
            });

            toast.success('Successfully signed in');
        },

        onError: (error) => {
            console.log('Failed to log in User: ', error);
            toast.error('Failed to login User');
        }
    });

    return {
        isError, isPending, isSuccess, signInMutation
    };
};

export default useSignIn;