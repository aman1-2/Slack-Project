import { useNavigate } from 'react-router-dom';

import Page_Not_Found from '@/assets/Page_Not_Found.webp';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


const NotFound = () => {

    const navigate = useNavigate();

    return (
        <div className='flex h-screen w-full flex-col items-center justify-center bg-gray-200'>
            <Card className={'text-center shadow-lg w-full max-w-lg'}>

                <CardHeader>

                    <CardTitle>
                        404 Page Not Found
                    </CardTitle>

                    <p
                        className='text-gray-600'
                    >
                        The Page You are looking for does not exist
                    </p>

                </CardHeader>

                <CardContent>

                    <img className='mx-auto h-64 w-auto rounded-lg shadow-lg' src={Page_Not_Found} alt="" />

                    <Button
                        variant = 'outline'
                        onClick={(() => navigate(-1))}
                        className={'mt-4'}
                    >
                        Go Back
                    </Button>

                </CardContent>

            </Card>

        </div>
    );
};

export default NotFound;