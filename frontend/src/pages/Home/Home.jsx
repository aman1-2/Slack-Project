import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserButton } from '@/components/atoms/UserButton/UserButton';
import { useFetchWorkspace } from '@/hooks/apis/workspaces/useFetchWorkspace';
import { useCreateWorkspaceModal } from '@/hooks/context/useCreateWorkspaceModal';

export const Home = () => {
    const { isPending, workspaces } = useFetchWorkspace();

    const navigate = useNavigate();

    const { setOpenCreateWorkspaceModal } = useCreateWorkspaceModal();

    console.log(workspaces);

    useEffect(() => {
        if(isPending)   return;

        console.log('Workspace is downloaded: ', workspaces.data);

        if(!workspaces || workspaces?.data.length === 0) {
            console.log('No workspace found need to create one');
            setOpenCreateWorkspaceModal(true); 
        } else {
            navigate(`/workspaces/${workspaces.data[0]._id}`);
        }
    }, [isPending, workspaces, navigate, setOpenCreateWorkspaceModal]);

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