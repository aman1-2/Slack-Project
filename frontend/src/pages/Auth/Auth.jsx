import { SignupCard } from '@/components/organism/Auth/SignupCard.jsx';

export const Auth = () => {
    return (
        <div
            className="h-screen flex items-center justify-center bg-slack"
        >
            <div
                className="mid:h-auto md:w-[420px]"
            >
                <SignupCard></SignupCard>
            </div>

        </div>
    );
};