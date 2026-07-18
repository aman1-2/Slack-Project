import {  useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// import VerificationInput from 'react-verification-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const JoinPage = () => {
    const { workspaceId } = useParams();
    const [joinCode, setJoinCode] = useState('');

    async function handleAddMemberToWorkspace() {
        console.log('Adding Member to workspace');
    }

    useEffect(() => {
        console.log(joinCode);
        if (joinCode.length === 36) {
            handleAddMemberToWorkspace(joinCode);
        }
    }, [joinCode]);
    

    return(
        <div className="h-screen flex flex-col gap-y-8 items-center justify-center p-8 bg-white rounded-lg shadow-sm">
            <div className="flex flex-col gap-y-4 items-center justify-center">
                <div className="flex flex-col gap-y-2 items-center justify-center">
                    <h1 className="font-bold text-3xl">
                        Join Workspace
                    </h1>

                    <p>
                        Enter the Code you received to join the Workspace
                    </p>
                </div>

                <Input
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value)}
                    placeholder="Paste invite code"
                />

                {/* <VerificationInput
                    onComplete={handleAddMemberToWorkspace}
                    length={21}
                    classNames={{
                        container: 'flex gap-x-2',
                        character: 'h-auto rounded-md border border-gray-300 flex items-center justify-center text-lg font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
                        characterInactive: 'bg-muted',
                        characterFilled: 'bg-white text-black',
                        characterSelected: 'bg-white text-black'
                    }}
                    autoFocus
                /> */}
            </div>

            <div className="flex gap-x-4">
                <Button size="lg" variant="outline" onClick={handleAddMemberToWorkspace}>
                    Join Workspace
                </Button>

                <Button size="lg" variant="outline">
                    <Link to={`/workspaces/${workspaceId}`}>
                        <span> Back to Workspace </span>
                    </Link>
                </Button>

                
            </div>

        </div>
    );
};

export default JoinPage;