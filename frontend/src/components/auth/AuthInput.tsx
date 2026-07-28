import React from "react";

interface Props {
    label: string;
    placeholder?: string;
    type?: string;
    value: string; 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
}

const AuthInput = ({
    label,
    placeholder,
    type = "text",
    value,
    onChange,
}: Props) => {

    return (
        <div>
            <label className="text-xs tracking-[3px] text-slate-500">
                {label}
            </label>

            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange} 
                className="
                    w-full
                    h-12
                    mt-2
                    rounded-xl
                    bg-[#0B1626]
                    border
                    border-slate-700
                    px-4
                    text-white
                    outline-none
                    focus:border-cyan-400
                "
            />
        </div>
    );
};

export default AuthInput;