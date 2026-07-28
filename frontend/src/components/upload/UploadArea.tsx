import { useRef, useState } from "react";

type UploadAreaProps = {
    selectedFile: File | null;
    onFileSelect: (file: File | null) => void;
    onAnalyse: () => void;
    loading: boolean;
    arm: "left" | "right";
    setArm: React.Dispatch<React.SetStateAction<"left" | "right">>;
};


const UploadArea = ({ selectedFile, onFileSelect, onAnalyse, loading, arm, setArm }: UploadAreaProps) => {
    const [dragging, setDragging] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

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
                    <div>
                        <p className="mt-5 text-cyan-400 text-sm p-2">
                            Selected: {selectedFile.name}
                        </p>
                        
                    </div>
                )}
            </label>
            <div className="flex flex-col justify-center items-center">
                <div>
                    <p className="text-white font-semibold text-lg mt-2">Выберите руку, которую лучше видно на видео</p>
                    <ul className="flex justify-between text-white text-lg">
                        <button className={`${arm === 'left' && "bg-cyan-400"} font-semibold rounded-2xl px-2 p-1 mt-2 cursor-pointer`} onClick={() => {setArm('left')}}>Левая рука</button>
                        <button className={`${arm === 'right' && "bg-cyan-400"} font-semibold rounded-2xl px-2 p-1 mt-2 cursor-pointer`} onClick={() => {setArm('right')}}>Правая рука</button>
                    </ul>
                </div>
                <button className="p-2 text-lg text-white bg-indigo-500 rounded-2xl mt-2 px-5 cursor-pointer disabled:bg-gray-600 disabled:cursor-auto" onClick={onAnalyse} disabled={!selectedFile || loading}> 
                    {loading ? "Смотрим ваше видео..." : "Начать анализ"}
                </button>

            </div>
        </div>
    );
};

export default UploadArea;
