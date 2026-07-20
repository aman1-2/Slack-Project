import { AlertTriangleIcon, HashIcon, Loader, MessageSquareTextIcon, SendHorizonalIcon } from 'lucide-react';
import { useParams } from 'react-router-dom';

import SideBarItem from '@/components/atoms/SideBarItem/SideBarItem';
import UserItem from '@/components/atoms/UserItem/UserItem';
import WorkspacePanelHeader from '@/components/molecules/Workspace/WorkspacePanelHeader';
import WorkspacePanelSection from '@/components/molecules/Workspace/WorkspacePanelSection';
import { useGetWorkspaceById } from '@/hooks/apis/workspaces/useGetWorkspaceById';
import useCreateChannelModal from '@/hooks/context/useCreateChannelModal';

export const WorkspacePanel = () => {
    const { workspaceId } = useParams();

    const { isFetching, isSuccess, workspaceByIdDetails } = useGetWorkspaceById(workspaceId);
    const { setOpenCreateChannelModal } = useCreateChannelModal();

    if(isFetching) {
        return(
            <div className="flex flex-col gap-y-2 h-full items-center justify-center text-white">
                <Loader
                    className="animate-spin size-6 text-white"
                ></Loader>
            </div>
        );
    }

    if(!isSuccess) {
        return(
            <div className="flex flex-col gap-y-2 h-full items-center justify-center text-white">
                <AlertTriangleIcon
                    className="size-6 text-white"
                ></AlertTriangleIcon>
                Something Went Wrong!!
            </div>
        );
    }

    return (
        <div
            className="flex flex-col h-full bg-slack-medium"
        >
            <WorkspacePanelHeader workspace={workspaceByIdDetails?.data}></WorkspacePanelHeader>

            <div className='flex flex-col px-2 mt-3'>
                <SideBarItem 
                    label={'Threads'} 
                    icon={MessageSquareTextIcon} 
                    id={'threads'} 
                    variant='active'
                />

                <SideBarItem 
                    label={'Drafts & Sends'} 
                    icon={SendHorizonalIcon} 
                    id={'drafts'} 
                    variant='default'
                />
            </div>

            <WorkspacePanelSection
                label={'Channels'}
                onIconClick={() => {setOpenCreateChannelModal(true);}}
            >
                {workspaceByIdDetails?.data?.channels.map(
                    (channel) => {
                        return (
                            <SideBarItem 
                                key={channel._id} 
                                icon={HashIcon}
                                label={channel.name}
                                channelId={channel._id}
                            />
                        );
                    }
                )}
            </WorkspacePanelSection>

            <WorkspacePanelSection
                label={'Direct Messages'}
                onIconClick={() => {}}
            >
                {workspaceByIdDetails?.data?.members.map(
                    (member) => {
                        return (
                            <UserItem 
                                key={member.memberId._id}
                                label={member.memberId.username}
                                userId={member.memberId._id}
                                imageSrc={member.memberId.avatar}
                            />
                        );
                    }
                )

                }
            </WorkspacePanelSection>
        </div>
    );
};  