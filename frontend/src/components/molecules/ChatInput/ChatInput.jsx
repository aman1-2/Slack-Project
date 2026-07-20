import Editor from '@/components/atoms/Editor/Editor';

const ChatInput = () => {
    return (
        <div className="px-5 w-full">
            <Editor
                placeholder="Type a message..."
                onSubmit={() => {}}
                onCancel={() => {}}
                disabled={false}
                defaultValue=""
            >
            </Editor>
        </div>
    );
};

export default ChatInput;