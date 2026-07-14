import { LogOutIcon, PencilIcon, SettingsIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import useAuth from '@/hooks/context/useAuth';
import { useCreateWorkspaceModal } from '@/hooks/context/useCreateWorkspaceModal';

export const UserButton = () => {
    const { auth, logout } = useAuth();
    const navigate = useNavigate();

    async function logoutHandler() {
        await logout();
        toast.success('Successfully log out');
        navigate('/auth/signin');
    }

    const { setOpenCreateWorkspaceModal } = useCreateWorkspaceModal();

    function openWorkspaceCreateModal() {
        setOpenCreateWorkspaceModal(true);
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='outline-none relative'>
                <Avatar className={'size-10 hover:opacity-65 transition'}>
                    <AvatarImage src={auth?.user?.avatar}></AvatarImage>
                    <AvatarFallback>{auth?.user?.username[0].toUpperCase()}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick = {openWorkspaceCreateModal}>
                    <PencilIcon className="size-4 mr-2 h-10"></PencilIcon>
                    Create Workspace
                </DropdownMenuItem>

                <DropdownMenuItem>
                    <SettingsIcon className="size-4 mr-2 h-10"></SettingsIcon>
                    Settings
                </DropdownMenuItem>

                <DropdownMenuItem onClick = {logoutHandler}>
                    <LogOutIcon className="size-4 mr-2 h-10"></LogOutIcon>
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};