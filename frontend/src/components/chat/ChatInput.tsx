import { useState } from "react";

import { sendMessage } from "../../api/messages";
import { useConversation } from "../../contexts/ConversationContext";

import type { Message } from "../layout/Sidebar";

interface ChatInputProps {
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    isSending: boolean;
    setIsSending: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatInput = ({
    setMessages,
    isSending,
    setIsSending
}: ChatInputProps) => {

    const [content, setContent] = useState("");
    const {
        currentConversationId,
        setCurrentConversationId,
        refreshConversationList,
    } = useConversation();


    const handleSend = async () => {

        if (!content.trim() || isSending) return;

        setIsSending(true);

        const message = content;
        setContent("");

        try {

            const data = await sendMessage(
                currentConversationId,
                message,
            );

            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now(),
                    role: "user",
                    content: message,
                },
                {
                    id: Date.now() + 1,
                    role: "assistant",
                    content: data.answer,
                },
            ]);

            if (currentConversationId === null) {
                setCurrentConversationId(data.conversation_id);
                refreshConversationList();
            }

        } catch (error) {
            console.error(error);
            setContent(message); // вернуть текст если ошибка

        } finally {
            setIsSending(false);
        }

    };


    return (
        <div className="border-t border-slate-800 p-4">

            <div className="rounded-xl border border-slate-700 flex items-center px-4">

                <input
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !isSending) {
                            handleSend();
                        }
                    }}
                    disabled={isSending}
                    placeholder="Ask about your technique..."
                    className="flex-1 bg-transparent py-4 outline-none text-slate-300 placeholder:text-slate-500"
                />

                <button
                    onClick={handleSend}
                    disabled={isSending}
                    className="ml-4 h-10 w-10 rounded-full bg-cyan-600 disabled:opacity-50 cursor-pointer"
                >
                    {isSending ? "..." : "→"}
                </button>

            </div>

        </div>
    );
};

export default ChatInput;