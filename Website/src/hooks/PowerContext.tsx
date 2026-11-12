// src/context/PowerContext.tsx
import { createContext, useContext } from "react";
import type { PowerState } from "../interfaces/Types";

export type PowerCtx = {
    power: PowerState;
    setPower: (state: PowerState) => void;
};

export const PowerContext = createContext<PowerCtx | null>(null);

export function usePower() {
    const ctx = useContext(PowerContext);
    if (!ctx) throw new Error("usePower must be used inside PowerContext.Provider");
    return ctx;
}
