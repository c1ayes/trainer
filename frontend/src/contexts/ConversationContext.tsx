import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";

interface ConversationContextType {
    currentConversationId: number | null;
    setCurrentConversationId: (id: number | null) => void;
    conversationListVersion: number;
    refreshConversationList: () => void;
    messageListVersion: number;
    refreshMessages: () => void;
}

const ConversationContext = createContext<ConversationContextType | null>(null);

export function ConversationProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [currentConversationId, setCurrentConversationId] =
        useState<number | null>(null);
    const [conversationListVersion, setConversationListVersion] = useState(0);
    const [messageListVersion, setMessageListVersion] = useState(0);
    const refreshConversationList = useCallback(() => {
        setConversationListVersion((version) => version + 1);
    }, []);
    const refreshMessages = useCallback(() => {
        setMessageListVersion((version) => version + 1);
    }, []);

    return (
        <ConversationContext.Provider
            value={{
                currentConversationId,
                setCurrentConversationId,
                conversationListVersion,
                refreshConversationList,
                messageListVersion,
                refreshMessages,
            }}
        >
            {children}
        </ConversationContext.Provider>
    );
}

export function useConversation() {
    const context = useContext(ConversationContext);

    if (!context) {
        throw new Error(
            "useConversation must be used inside ConversationProvider"
        );
    }

    return context;
}
