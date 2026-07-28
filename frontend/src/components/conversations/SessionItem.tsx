import { useEffect, useState } from "react";

type Props = {
    active?: boolean;
    title: string;
    preview: string;
    date: string;
    onClick: () => void;
    onRename: () => void;
    onDelete: () => void;
};

const SessionItem = ({
    active = false,
    title,
    preview,
    date,
    onClick,
    onRename,
    onDelete,
}: Props) => {
    const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);

    useEffect(() => {
        const closeMenu = () => setMenuPosition(null);
        window.addEventListener("click", closeMenu);

        return () => window.removeEventListener("click", closeMenu);
    }, []);

    return (
        <>
            <button
                onClick={onClick}
                onContextMenu={(event) => {
                    event.preventDefault();
                    setMenuPosition({ x: event.clientX, y: event.clientY });
                }}
                className={`
                w-full
                rounded-xl
                p-3
                text-left
                transition
                mb-2

                ${
                    active
                        ? "bg-cyan-500/10 border border-cyan-700"
                        : "hover:bg-slate-800"
                }
            `}
            >
                <h4 className="font-semibold text-white text-sm truncate">
                    {title}
                </h4>

                <p className="mt-1 text-xs text-slate-500 truncate">
                    {preview}
                </p>

                <span className="mt-2 block text-[11px] text-slate-600">
                    {date}
                </span>
            </button>

            {menuPosition && (
                <div
                    className="fixed z-50 w-40 overflow-hidden rounded-lg border border-slate-700 bg-[#111c2b] py-1 shadow-xl"
                    style={{ left: menuPosition.x, top: menuPosition.y }}
                    onClick={(event) => event.stopPropagation()}
                >
                    <button
                        onClick={() => {
                            setMenuPosition(null);
                            onRename();
                        }}
                        className="w-full px-3 py-2 text-left text-sm text-slate-200 hover:bg-slate-700"
                    >
                        Переименовать
                    </button>
                    <button
                        onClick={() => {
                            setMenuPosition(null);
                            onDelete();
                        }}
                        className="w-full px-3 py-2 text-left text-sm text-red-400 hover:bg-slate-700"
                    >
                        Удалить
                    </button>
                </div>
            )}
        </>
    );
};

export default SessionItem;
