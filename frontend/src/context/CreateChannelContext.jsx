import { createContext, useState } from 'react';

const CreateChannelContext = createContext();

export const CreateChannelContextProvide = ({ children }) => {
    const [openCreateChannelModal, setOpenCreateChannelModal] = useState(false);

    return(
        <CreateChannelContext.Provider value={{
            openCreateChannelModal,
            setOpenCreateChannelModal
        }}>
            { children }
        </CreateChannelContext.Provider>
    );
};

export default CreateChannelContext;