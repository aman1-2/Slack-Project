import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useSignIn from '@/hooks/apis/auth/useSignIn';

import SigninCard from './SigninCard';

const SigninCardContainer = () => {

    const navigate = useNavigate();
    
    const [signinForm, setSigninForm] = useState({
        email: '',
        password: ''
    });

    const [validationError, setValidationError] = useState(null);

    const { isError, isPending, isSuccess, signInMutation } = useSignIn();

    function changeHandler(event) {
        setSigninForm({
            ...signinForm,
            [event.target.name] : event.target.value
        });
    }

    async function onSigninFormSubmit(event) {
        event.preventDefault();

        if(!signinForm.email || !signinForm.password) {
            setValidationError({ message: 'All fields are required' });

            console.log('All fields are required to fill');
            return;
        }
        
        setValidationError(null);

        await signInMutation({
            email: signinForm.email,
            password: signinForm.password
        });
    }

    useEffect(()=>{
        if(isSuccess) {
            setTimeout(navigate('/home'),2000);
        }
    }, [isSuccess, navigate]);
    
    return (
        <SigninCard 
            signinForm={signinForm} 
            changeHandler={changeHandler}
            onSigninFormSubmit={onSigninFormSubmit}
            validationError={validationError}
            isSuccess={isSuccess}
            isPending={isPending}
            isError={isError}
        ></SigninCard>
    );
};

export default SigninCardContainer;