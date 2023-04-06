import { Dispatch, createContext, useContext } from "react";

interface AwardContextType {
    awardCounter?: number;
    setAwardCounter?: Dispatch<React.SetStateAction<number>>;
    interval?: NodeJS.Timer;
    setStart?: Dispatch<React.SetStateAction<boolean>>;
    award?: number;
    setAward?: Dispatch<React.SetStateAction<number>>; 
    leave?:boolean;
    setLeave?:Dispatch<React.SetStateAction<boolean>>;
    wrongAnswer?: boolean;
    setWrongAnswer?:Dispatch<React.SetStateAction<boolean>>
}

export const AwardContext = createContext<AwardContextType>({});
export const useAwardContext = () => useContext(AwardContext);
