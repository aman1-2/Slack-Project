import { LucideLoader2, TriangleAlert } from 'lucide-react';
import { FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export const SignupCard = ({ 
    signupForm, 
    changeHandler, 
    validationError, 
    onSignupFormSubmit,
    error,
    isPending,
    isSuccess
}) => {

    const navigate = useNavigate();

    return (
        <Card className="w-full h-full">
            <CardHeader>
                <CardTitle> Sign Up </CardTitle>
                <CardDescription>Sign Up to access your account</CardDescription>

                {
                    validationError && (
                        <div className='bg-destructive/15 p-4 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6'>
                            <TriangleAlert className='size-5'></TriangleAlert>
                            <p> {validationError.message} </p>
                        </div>
                    )
                    
                }

                {
                    error && (
                        <div className='bg-destructive/15 p-4 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6'>
                            <TriangleAlert className='size-5'></TriangleAlert>
                            <p> {error.message} </p>
                        </div>
                    )
                    
                }

                {
                    isSuccess && (
                        <div className='bg-primary/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-primary mb-5'>
                            <FaCheck className='size-5'></FaCheck>
                            <p>
                                Successfully Signed up. You will be redirected to the login page in few seconds.

                                <LucideLoader2 className='animate-spin ml-2'></LucideLoader2>
                            </p>
                        </div>
                    )
                }

            </CardHeader>

            <CardContent>
                <form className="space-y-3" onSubmit={onSignupFormSubmit}>
                    <Input
                        name="email"
                        placeholder="Email"
                        required
                        onChange = {changeHandler}
                        value = {signupForm.email}
                        type="email"
                        disabled={isPending}
                    />

                    <Input
                        name="username"
                        placeholder="Your Username"
                        required
                        onChange = {changeHandler}
                        value = {signupForm.username}
                        type="text"
                        disabled={isPending}
                    />

                    <Input
                        name="password"
                        placeholder="Password"
                        required
                        onChange = {changeHandler}
                        value = {signupForm.password}
                        type="password"
                        disabled={isPending}
                    />

                    <Input
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        required
                        onChange = {changeHandler}
                        value = {signupForm.confirmPassword}
                        type="password"
                        disabled={isPending}
                    />

                    <Button
                        disabled={false}
                        size="lg"
                        type="submit"
                        className="w-full"
                    >
                        Singup
                    </Button>
                    
                </form>

                <Separator
                    className="my-5"
                ></Separator>

                <p
                    className="text-s text-muted-foreground mt-4"
                >
                    Already have an Account ?{' '}
                    <span
                        className="text-sky-600 hover:underline cursor-pointer"
                        onClick={() => navigate('/auth/signin')}
                    >
                        Continue
                    </span>
                </p>
            </CardContent>
        </Card>
    );
};