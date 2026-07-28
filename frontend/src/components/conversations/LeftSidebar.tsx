import { useEffect, useState } from "react";

import NewSessionButton from "./NewSessionButton";
import SessionList from "./SessionList";

import {
    deleteConversation,
    getConversations,
    updateConversation,
} from "../../api/conversations";
import { useConversation } from "../../contexts/ConversationContext";

interface Conversation {
    id: number;
    title: string;
    created_at: string;
}

const LeftSidebar = () => {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const {
        currentConversationId,
        setCurrentConversationId,
        conversationListVersion,
    } = useConversation();

    useEffect(() => {
        loadConversations();
    }, [conversationListVersion]);

    const loadConversations = async () => {
        try {
            const data = await getConversations();
            setConversations(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleRename = async (conversation: Conversation) => {
        const title = window.prompt("Новое название сессии", conversation.title)?.trim();
        if (!title || title === conversation.title) return;

        try {
            await updateConversation(conversation.id, title);
            await loadConversations();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (conversation: Conversation) => {
        if (!window.confirm(`Удалить сессию "${conversation.title}"?`)) return;

        try {
            await deleteConversation(conversation.id);
            if (currentConversationId === conversation.id) {
                setCurrentConversationId(null);
            }
            await loadConversations();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <aside className="flex h-36 w-full shrink-0 flex-col border-b border-slate-800 bg-[#09111D] lg:h-full lg:w-56 lg:border-r lg:border-b-0 xl:w-60">

            <div className="flex min-h-0 flex-1 flex-col p-3 lg:p-4">

                <NewSessionButton/>

                <h3 className="mb-2 mt-3 text-[10px] uppercase tracking-[3px] text-slate-500 lg:mb-3 lg:mt-6">
                    Recent Sessions
                </h3>

                <SessionList
                    conversations={conversations}
                    currentConversationId={currentConversationId}
                    onSelect={setCurrentConversationId}
                    onRename={handleRename}
                    onDelete={handleDelete}
                />

            </div>

        </aside>
    );
};

export default LeftSidebar;
