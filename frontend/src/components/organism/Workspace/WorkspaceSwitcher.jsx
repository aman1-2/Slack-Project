import { Loader } from 'lucide-react';
import { useNavigate,useParams } from 'react-router-dom';

import { buttonVariants } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useFetchWorkspace } from '@/hooks/apis/workspaces/useFetchWorkspace';
import { useGetWorkspaceById } from '@/hooks/apis/workspaces/useGetWorkspaceById';
import { cn } from '@/lib/utils';

export const WorkspaceSwitcher = () => {
    const navigate = useNavigate();

    const { workspaceId } = useParams();

    const { isFetching, workspaceByIdDetails } = useGetWorkspaceById(workspaceId);

    const { workspaces, isFetching: isFetchingWorkspace } = useFetchWorkspace();

    return(
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div
                    className={cn(
                        buttonVariants({
                            variant: 'secondary',
                            size: 'icon-lg',
                            className: 'bg-[#ABABAD] hover:bg-[#ABABAD]/80 font-semibold text-slate-800 text-xl',
                        })
                    )}
                >
                    {
                        isFetching ? 
                        (<Loader className="size-5 animate-spin"></Loader>):
                        (workspaceByIdDetails?.data?.name?.charAt(0).toUpperCase())
                    }
                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuItem
                    className="cursor-pointer flex-col justify-start items-start"
                >
                    {workspaceByIdDetails?.data?.name}
                    <span className='text-xs text-muted-foreground'>
                        (Active Workspace)
                    </span>
                </DropdownMenuItem>
                {
                    isFetchingWorkspace ?
                    (<Loader className='size-5 animate-spin'></Loader>) :
                    (
                        workspaces?.data?.map((workspace) => {
                            if(workspace._id === workspaceId)   return null;

                            return (
                                <DropdownMenuItem
                                    className="cursor-pointer flex-col justify-start items-start"
                                    key={workspace._id}
                                    onClick={() => navigate(`/workspaces/${workspace._id}`)}
                                >
                                    <p className='truncate'>
                                        {workspace.name}
                                    </p>
                                </DropdownMenuItem>
                            );
                        })  
                    )
                }
            </DropdownMenuContent>
        </DropdownMenu>
    );
};