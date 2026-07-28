import { authFetch } from "./authFetch";

export interface VideoAnalysisResponse {
    report: string;
    video_url: string;
}

export async function uploadVideo(
    conversationId: number,
    file: File,
    arm: "left" | "right"
): Promise<VideoAnalysisResponse> {
    const formData = new FormData();
    formData.append("video_file", file);

    const response = await authFetch(`/video/${conversationId}/upload?arm=${arm}`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Ошибка анализа");
    }

    return response.json();
}
