import { useRef, useState } from "react";
import { useResult } from "../../contexts/ResultContext";

type UploadAreaProps = {
    selectedFile: File | null;
    onFileSelect: (file: File | null) => void;
    onAnalyse: () => void;
    loading: boolean;
    arm: "left" | "right";
    setArm: React.Dispatch<React.SetStateAction<"left" | "right">>;
};

const UploadArea = ({
    selectedFile,
    onFileSelect,
    onAnalyse,
    loading,
    arm,
    setArm,
}: UploadAreaProps) => {
    const [dragging, setDragging] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const { result, setResult } = useResult();

    const handleFile = (file: File | null) => {
        if (!file) return;

        onFileSelect(file);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFile(e.target.files?.[0] ?? null);
    };

    const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setDragging(false);

        const file = e.dataTransfer.files[0];

        handleFile(file);
    };

    const handleUploadAnother = () => {
        setResult(undefined);
        onFileSelect(null);

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };


    if (result?.video_url) {
        console.log("VIDEO URL:", result?.video_url);
        return (
            <div className="min-h-0 min-w-0 flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6">
                <div className="mx-auto flex w-full max-w-5xl flex-col items-center">

                    <h2 className="mb-5 text-center text-2xl font-bold uppercase tracking-wider text-slate-300 sm:text-3xl">
                        Ваше проанализированное видео
                    </h2>
                    
                    <div className="w-full overflow-hidden rounded-2xl border border-slate-800 bg-[#0A1321] shadow-2xl">
                        <video
                            src={`${result.video_url}?ngrok-skip-browser-warning=true`}
                            controls
                            playsInline
                            className="aspect-video w-full bg-black object-contain"
                        >
                            Ваш браузер не поддерживает воспроизведение видео.
                        </video>
                    </div>

                    <button
                        type="button"
                        onClick={handleUploadAnother}
                        className="
                            mt-6
                            rounded-2xl
                            bg-cyan-500
                            px-6
                            py-3
                            text-lg
                            font-semibold
                            text-slate-950
                            transition
                            hover:bg-cyan-400
                            cursor-pointer
                        "
                    >
                        Загрузить другое видео
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-0 min-w-0 flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6">
            <input
                ref={inputRef}
                id="video-upload"
                type="file"
                accept="video/mp4,video/webm,video/quicktime"
                className="hidden"
                onChange={handleChange}
            />

            <label
                htmlFor="video-upload"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
                    h-[clamp(280px,50vh,500px)]
                    rounded-xl
                    border
                    flex
                    flex-col
                    justify-center
                    items-center
                    cursor-pointer
                    transition-all
                    duration-200

                    ${
                        dragging
                            ? "border-cyan-400 bg-cyan-500/5"
                            : "border-slate-800 bg-[#0A1321]"
                    }
                `}
            >
                <div
                    className={`
                        h-16
                        w-16
                        sm:h-24
                        sm:w-24
                        rounded-full
                        border-2
                        border-dashed
                        flex
                        items-center
                        justify-center
                        text-3xl
                        sm:text-4xl
                        transition

                        ${
                            dragging
                                ? "border-cyan-400 text-cyan-300"
                                : "border-cyan-500 text-cyan-400"
                        }
                    `}
                >
                    ↑
                </div>

                <h2 className="mt-6 px-4 text-center text-2xl font-bold uppercase tracking-wider text-slate-300 sm:mt-8 sm:text-4xl">
                    Drop your swim video
                </h2>

                <p className="mt-3 px-4 text-center text-sm text-slate-500 sm:text-base">
                    MP4, MOV, WebM — drag & drop or click to browse
                </p>

                {selectedFile && (
                    <p className="mt-5 rounded-lg p-2 text-sm text-cyan-400">
                        Selected: {selectedFile.name}
                    </p>
                )}
            </label>

            <div className="flex flex-col items-center justify-center">
                <div>
                    <p className="mt-2 text-center text-lg font-semibold text-white">
                        Выберите руку, которую лучше видно на видео
                    </p>

                    <div className="flex justify-center gap-3 text-lg text-white">
                        <button
                            type="button"
                            className={`
                                mt-2
                                cursor-pointer
                                rounded-2xl
                                px-3
                                py-1
                                font-semibold
                                ${
                                    arm === "left"
                                        ? "bg-cyan-400 text-slate-950"
                                        : "bg-slate-800"
                                }
                            `}
                            onClick={() => setArm("left")}
                        >
                            Левая рука
                        </button>

                        <button
                            type="button"
                            className={`
                                mt-2
                                cursor-pointer
                                rounded-2xl
                                px-3
                                py-1
                                font-semibold
                                ${
                                    arm === "right"
                                        ? "bg-cyan-400 text-slate-950"
                                        : "bg-slate-800"
                                }
                            `}
                            onClick={() => setArm("right")}
                        >
                            Правая рука
                        </button>
                    </div>
                </div>

                <button
                    type="button"
                    className="
                        mt-4
                        cursor-pointer
                        rounded-2xl
                        bg-indigo-500
                        px-5
                        py-2
                        text-lg
                        text-white
                        disabled:cursor-auto
                        disabled:bg-gray-600
                    "
                    onClick={onAnalyse}
                    disabled={!selectedFile || loading}
                >
                    {loading
                        ? "Смотрим ваше видео..."
                        : "Начать анализ"}
                </button>
            </div>
        </div>
    );
};

export default UploadArea;