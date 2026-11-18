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

export function DeckProvider({ initialItems, startIndex = 0, children }: DeckProviderProps) {
    const galleryModules = import.meta.glob<string>("../../gallery/**/*.{png,jpg,jpeg,svg}", {
        eager: true,
        query: "?url",
        import: "default",
    });

    const BASE_IMAGES = Object.entries(galleryModules)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([, url]) => url); // already an array of URL strings

    // Repeat the images until there are enough cards to fill the loop (~14)
    const MIN_CARDS = 14;
    const gallery = Array.from(
        { length: Math.max(MIN_CARDS, BASE_IMAGES.length) },
        (_, i) => BASE_IMAGES[i % BASE_IMAGES.length],
    );

    initialItems = gallery;

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
