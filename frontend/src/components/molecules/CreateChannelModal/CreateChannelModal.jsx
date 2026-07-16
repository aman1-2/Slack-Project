import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import useCreateChannelModal from '@/hooks/context/useCreateChannelModal';

const CreateChannelModal = () => {
    
    const [channelName, setChannelName] = useState('');

    const { openCreateChannelModal, setOpenCreateChannelModal } = useCreateChannelModal();

    function handleClose() {
        setOpenCreateChannelModal(false);
    }

    function handleFormSubmit(event) {
        event.preventDefault();
    }

    return(
        <Dialog open={openCreateChannelModal} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Create a Channel
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleFormSubmit}>
                    <Input
                        required
                        placeholder='Channel Name e.g - Announcement-channel'
                        value={channelName}
                        onChange={(e)=> setChannelName(e.target.value)}
                    />

                    <div className="flex justify-end mt-4">
                        <Button>
                            Create Channel
                        </Button>
                    </div>
                    
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateChannelModal;