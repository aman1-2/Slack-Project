import { BellIcon, HomeIcon, MessageSquareIcon, MoreHorizontalIcon } from 'lucide-react';

import { UserButton } from '@/components/atoms/UserButton/UserButton';
import { SidebarButton } from '@/components/molecules/SidebarButton/SidebarButton';

export const WorkspaceSidebar = () => {
    return (
        <aside
            className="w-17.5 h-full bg-slack-dark flex flex-col gap-y-4 items-center pt-2.5 pb-1.25"
        >
            <SidebarButton
                Icon={HomeIcon}
                label="Home"
            ></SidebarButton>

            <SidebarButton
                Icon={MessageSquareIcon}
                label="DM"
            ></SidebarButton>

            <SidebarButton
                Icon={BellIcon}
                label="Notifications"
            ></SidebarButton>

            <SidebarButton
                Icon={MoreHorizontalIcon}
                label="More"
            ></SidebarButton>

            <div className="flex flex-col items-center justify-center mt-auto mb-5 gap-y-1">
                <UserButton></UserButton>
            </div>
        </ aside>
    );
};