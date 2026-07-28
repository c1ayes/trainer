import { uploadVideo } from "../api/video";
import { createConversation } from "../api/conversations";
import { useState } from "react";
import { useResult } from "../contexts/ResultContext";
import { useConversation } from "../contexts/ConversationContext";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import UploadArea from "../components/upload/UploadArea";
import LeftSidebar from "../components/conversations/LeftSidebar";

const Layout = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const {setResult} = useResult()
    const {
        currentConversationId,
        setCurrentConversationId,
        refreshConversationList,
        refreshMessages,
    } = useConversation();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [arm, setArm] = useState<'left' | 'right'>('left');

    const handleAnalyse = async () => {
        if (!selectedFile) return;

        setLoading(true);

        try {
            let conversationId = currentConversationId;

            if (conversationId === null) {
                const conversation = await createConversation(
                    `Анализ: ${selectedFile.name}`.slice(0, 50)
                );
                conversationId = conversation.id;
                setCurrentConversationId(conversationId);
                refreshConversationList();
            }

            if (conversationId === null) {
                throw new Error("Не удалось создать сессию для анализа видео");
            }

            const result = await uploadVideo(conversationId, selectedFile, arm);
            setResult(result);
            refreshMessages();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
    <div className="h-[100dvh] overflow-hidden bg-[#07101B]">

        <Navbar />

        <main className="flex h-[calc(100dvh-56px)] min-h-0 flex-col overflow-hidden lg:flex-row">

            <LeftSidebar />
            
            <UploadArea selectedFile={selectedFile} onFileSelect={setSelectedFile} onAnalyse={handleAnalyse} loading={loading} arm={arm} setArm={setArm}/>

            <Sidebar />

        </main>

    </div>

    )
}

export default Layout
