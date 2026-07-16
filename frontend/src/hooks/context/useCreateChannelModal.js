import { useContext } from 'react';

import CreateChannelContext from '@/context/CreateChannelContext';

const useCreateChannelModal = () => {
    return useContext(CreateChannelContext);
};

export default useCreateChannelModal;