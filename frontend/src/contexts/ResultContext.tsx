import { createContext, useContext, useState} from "react";
import type { ReactNode } from "react";
import type { AnalyseResponse } from "../types/video";

type ResultContextType = {
    result: AnalyseResponse | undefined;
    setResult: React.Dispatch<React.SetStateAction<AnalyseResponse | undefined>>;
};

const ResultContext = createContext<ResultContextType | null>(null);

export const ResultProvider = ({ children }: { children: ReactNode }) => {
    const [result, setResult] = useState<AnalyseResponse>();

    return (
        <ResultContext.Provider value={{ result, setResult }}>
            {children}
        </ResultContext.Provider>
    );
};

export const useResult = () => {
    const context = useContext(ResultContext);

    if (!context) {
        throw new Error("useResult must be used inside ResultProvider");
    }

    return context;
};