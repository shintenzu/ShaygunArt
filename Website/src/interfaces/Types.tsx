import { type ReactNode } from "react";

export interface ToolBoxProps {
    name: string;
    exp?: number;
    pref?: number;
    Description?: string;
    icon?: string;
}

export interface Tool {
    id: number;
    cat: string;
    name: string;
    icon: string;
    exp: number;
    pref: number;
    desc: string;
}

export interface School {
    id: number;
    name: string;
    logo: string;
    icon: string;
    location: string;
    period: string;
    GPA: number;
    degree: string;
    major: string;
}

export interface Job {
    id: number;
    type: string[];
    company: string;
    location: string;
    start: string;
    end: string;
    title: string;
    roles: string[];
}

export interface Socials {
    id: number;
    name: string;
    info: string;
    url: string;
    link: string;
}

export interface Gallery {
    id: number;
    name: string;
    logo: string;
}

export interface Project {
    id: number;
    name: string;
    logo: string;
}

export type PowerState = "idle" | "on" | "off";

export interface Deck {
    items: ReactNode[];
    startIndex?: number;
    visible?: boolean;
}
