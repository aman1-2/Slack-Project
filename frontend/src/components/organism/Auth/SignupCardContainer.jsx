import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSignUp } from '@/hooks/apis/auth/useSignUp';

import { SignupCard } from './SignupCard';

export const SignupCardContainer = () => {

    const navigate = useNavigate();

    const [signupForm, setSignupForm] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const [validationError, setValidationError] = useState(null);

    const { isPending, isSuccess, error, signUpMutation } = useSignUp();

    function changeHandler(event) {
        setSignupForm({
            ...signupForm,
            [event.target.name] : event.target.value
        });
    }

    async function onSignupFormSubmit(event) {
        event.preventDefault();

        if(!signupForm.email || !signupForm.password || !signupForm.confirmPassword || !signupForm.username) {
            setValidationError({
                message: 'All Fields are required'
            });

            console.log('All Fields are required');
            return;
        }

        if(signupForm.password !== signupForm.confirmPassword) {
            setValidationError({
                message: 'Password does not match'
            });
            
            console.log('Password does not match');
            return;
        }

        setValidationError(null);

        await signUpMutation({
            email: signupForm.email,
            password: signupForm.password,
            username: signupForm.username
        });
    }

    useEffect(() => {
        if(isSuccess) {
            setTimeout(navigate('/auth/signin'),2000);
        }
    }, [isSuccess, navigate]);

    return (
        <SignupCard 
            signupForm={signupForm} 
            changeHandler={changeHandler}
            validationError={validationError}
            onSignupFormSubmit={onSignupFormSubmit}
            isPending={isPending}
            isSuccess={isSuccess}
            error={error}
        ></SignupCard>
    );
};

export default SignupCardContainer;