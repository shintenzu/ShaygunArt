// src/context/PowerContext.tsx
import { createContext, type ReactNode, useContext, useMemo, useState } from "react";
//import {Deck} from "../interfaces/Types" ;

export type DeckCtx = {
    //deck: Deck;
    visibility: boolean;
    setVisibility: (state: boolean) => void;
    deck: string[];
    setItems: React.Dispatch<React.SetStateAction<string[]>>;
    deckIndex: number;
    setIndex: React.Dispatch<React.SetStateAction<number>>;
};

const DeckContext = createContext<DeckCtx | undefined>(undefined);

type DeckProviderProps = {
    initialItems?: string[];
    startIndex?: number;
    children: ReactNode;
};

export function DeckProvider({ initialItems = [""], startIndex = 0, children }: DeckProviderProps) {
    const [visibility, setVisibility] = useState(false);
    const [deckIndex, setIndex] = useState(startIndex);
    const [deck, setItems] = useState<string[]>(initialItems);
    const value = useMemo(
        () => ({ visibility, setVisibility, deck, setItems, deckIndex, setIndex }),
        [visibility, deck, deckIndex],
    );

    return <DeckContext.Provider value={value}>{children}</DeckContext.Provider>;
}

export function useDeck() {
    const ctx = useContext(DeckContext);
    if (!ctx) throw new Error("useDeck must be used inside DeckContext.Provider");
    return ctx;
}
