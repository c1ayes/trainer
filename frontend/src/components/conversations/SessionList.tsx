import SessionItem from "./SessionItem";

interface Conversation {
    id: number;
    title: string;
    created_at: string;
}

interface SessionListProps {
    conversations: Conversation[];
    currentConversationId: number | null;
    onSelect: (conversationId: number) => void;
    onRename: (conversation: Conversation) => void;
    onDelete: (conversation: Conversation) => void;
}

const SessionList = ({
    conversations,
    currentConversationId,
    onSelect,
    onRename,
    onDelete,
}: SessionListProps) => {
    return (
        <div className="min-h-0 flex-1 overflow-y-auto pr-1">
            {conversations.map((conversation) => (
                <SessionItem
                    key={conversation.id}
                    active={conversation.id === currentConversationId}
                    title={conversation.title}
                    preview=""
                    date={new Date(conversation.created_at).toLocaleDateString()}
                    onClick={() => onSelect(conversation.id)}
                    onRename={() => onRename(conversation)}
                    onDelete={() => onDelete(conversation)}
                />
            ))}
        </div>

    );
};

export default SessionList;
