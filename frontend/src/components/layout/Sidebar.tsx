import { useEffect, useState } from "react";

import ChatInput from "../chat/ChatInput";
import ChatMessage from "../chat/ChatMessage";
import { getMessages } from "../../api/messages";
import { useConversation } from "../../contexts/ConversationContext";

export interface Message {
    id: number;
    role: "user" | "assistant";
    content: string;
}

const Sidebar = () => {

    const [messages, setMessages] = useState<Message[]>([]);
    const { currentConversationId, messageListVersion } = useConversation();

    useEffect(() => {
        if (currentConversationId === null) {
            setMessages([]);
            return;
        }

        let isCurrent = true;

        const loadMessages = async () => {
            try {
                const data = await getMessages(currentConversationId);
                if (isCurrent) {
                    setMessages(data);
                }
            } catch (error) {
                console.error(error);
                if (isCurrent) {
                    setMessages([]);
                }
            }
        };

        loadMessages();

        return () => {
            isCurrent = false;
        };
    }, [currentConversationId, messageListVersion]);

    return (
        <aside className="flex h-[min(38dvh,20rem)] w-full shrink-0 flex-col overflow-hidden border-t border-slate-800 bg-[#09111D] lg:h-full lg:w-80 lg:border-t-0 lg:border-l xl:w-[360px]">

            <div className="p-4 lg:p-6">
                <div className="flex justify-between items-center">
                    <h2 className="font-bold text-white">
                        AI COACH
                    </h2>

                    <div className="rounded-full border border-cyan-500 px-3 py-1 text-xs text-cyan-400">
                        LIVE
                    </div>
                </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-4 lg:p-6">
                <ChatMessage messages={messages} />
            </div>

            <ChatInput
                setMessages={setMessages}
            />
        </aside>
    );
};

export default Sidebar;
