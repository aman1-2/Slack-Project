import { useState } from 'react';

import Editor from '@/components/atoms/Editor/Editor';
import MessageRenderer from '@/components/atoms/MessageRender/MessageRenderer';

const ChatInput = () => {
    const [text, setText] = useState('');

    async function handleSubmit({ messageBody }) {
        console.log(messageBody);
        setText(messageBody);
    }
    return (
        <div className="px-5 w-full">
            <Editor
                placeholder="Type a message..."
                onSubmit={handleSubmit}
                onCancel={() => {}}
                disabled={false}
                defaultValue=""
            >
            </Editor>

            {
                text && <MessageRenderer value={text} />
            }
        </div>
    );
};

export default ChatInput;