import { useEffect } from 'react';

import { UserButton } from '@/components/atoms/UserButton/UserButton';
import { useFetchWorkspace } from '@/hooks/apis/workspaces/useFetchWorkspace';

export const Home = () => {
    const { isPending, workspaces } = useFetchWorkspace();

    console.log(workspaces);

    useEffect(() => {
        if(isPending)   return;

        console.log('Workspace is downloaded: ', workspaces.data);

        if(workspaces.data.length === 0 || !workspaces) {
            console.log('No workspace found need to create one'); 
        }
    }, [isPending, workspaces]);

    return(
        <>
            <h1>
                Home Page
            </h1>
            <UserButton></UserButton>
        </>
    );
};

export default Home;