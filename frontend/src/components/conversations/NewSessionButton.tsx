import { useNavigate } from "react-router-dom";
import { useConversation } from "../../contexts/ConversationContext";

const NewSessionButton = () => {
    const navigate = useNavigate();
    const { setCurrentConversationId } = useConversation();

    const handleClick = () => {
        setCurrentConversationId(null);
        navigate("/");
    };

    return (
        <button
            onClick={handleClick}
            className="
                w-full
                rounded-xl
                border
                border-cyan-700
                py-3
                text-cyan-400
                font-semibold
                hover:bg-cyan-500/10
                transition
            "
        >
            + New Session
        </button>
    );
};
export default NewSessionButton;
