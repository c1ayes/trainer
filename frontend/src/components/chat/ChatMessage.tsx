interface Message {
    id: number;
    role: "user" | "assistant";
    content: string;
}

interface ChatMessageProps {
    messages: Message[];
}

const ChatMessage = ({ messages }: ChatMessageProps) => {
    return (
        <div className="flex flex-col gap-5">

            {messages.map((message) => (

                <div
                    key={message.id}
                    className={`flex gap-3 ${
                        message.role === "user"
                            ? "justify-end"
                            : "justify-start"
                    }`}
                >

                    {message.role === "assistant" && (
                        <div className="h-10 w-10 rounded-full border border-cyan-500 flex items-center justify-center">
                            AI
                        </div>
                    )}

                    <div
                        className={`rounded-xl border p-4 max-w-lg ${
                            message.role === "assistant"
                                ? "bg-[#101C2D] border-slate-700 text-slate-200"
                                : "bg-cyan-600 border-cyan-600 text-white"
                        }`}
                    >
                        <p className="leading-7 whitespace-pre-wrap">
                            {message.content}
                        </p>
                    </div>

                </div>

            ))}

        </div>
    );
};

export default ChatMessage;