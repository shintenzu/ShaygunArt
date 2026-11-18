"use client";

import { type ElementType, useEffect, useRef, useState, createElement, useMemo, useCallback } from "react";
import { gsap } from "gsap";
import "./TextType.scss";
import type { ReactNode } from "react";

interface TextTypeProps {
    className?: string;
    showCursor?: boolean;
    hideCursorWhileTyping?: boolean;
    cursorCharacter?: string | React.ReactNode;
    cursorBlinkDuration?: number;
    cursorClassName?: string;
    text: string | string[];
    /** Part of the text to render in a different color */
    text2?: string;
    /** Any CSS color for text2 */
    text2Color?: string;
    as?: ElementType;
    typingSpeed?: number;
    initialDelay?: number;
    pauseDuration?: number;
    deletingSpeed?: number;
    loop?: boolean;
    textColors?: string[];
    variableSpeedEnabled?: boolean;
    variableSpeedMin?: number;
    variableSpeedMax?: number;
    variableSpeed?: { min: number; max: number };
    onSentenceComplete?: (sentence: string, index: number) => void;
    startOnVisible?: boolean;
    reverseMode?: boolean;
    animate?: boolean;
}

/**
 * Wraps every occurrence of `phrase` in a colored span.
 * `typed` is what has been typed so far; `full` is the complete sentence.
 * Matching against `full` lets the color start as soon as the first
 * letter of the phrase appears, not only once it is fully typed.
 */
function renderHighlighted(
    typed: string,
    full: string,
    phrase: string | undefined,
    color: string | undefined,
): ReactNode {
    if (!phrase) return typed;

    const nodes: ReactNode[] = [];
    const lowerFull = full.toLowerCase();
    const lowerPhrase = phrase.toLowerCase();
    let pos = 0;
    let key = 0;

    while (pos < typed.length) {
        const start = lowerFull.indexOf(lowerPhrase, pos);
        if (start === -1 || start >= typed.length) {
            nodes.push(typed.slice(pos)); // no more matches: rest is plain text
            break;
        }
        if (start > pos) nodes.push(typed.slice(pos, start));
        nodes.push(
            <span key={key++} className="text-type__highlight" style={color ? { color } : undefined}>
                {typed.slice(start, start + phrase.length)}
            </span>,
        );
        pos = start + phrase.length;
    }
    return nodes;
}

const TextType = ({
    // Old Defaults
    // text,
    // text2,
    // text2Color,
    // as: Component = "div",
    // typingSpeed = 50,
    // initialDelay = 0,
    // pauseDuration = 2000,
    // deletingSpeed = 30,
    // loop = false,
    // className = "",
    // showCursor = true,
    // hideCursorWhileTyping = false,
    // cursorCharacter = "|",
    // cursorClassName = "",
    // cursorBlinkDuration = 0.5,
    // textColors = [],
    // variableSpeed,
    // onSentenceComplete,
    // startOnVisible = false,
    // reverseMode = false,
    // ...props
    text,
    text2,
    text2Color,
    as: Component = "div",
    typingSpeed = 15,
    initialDelay = 0,
    pauseDuration = 800,
    deletingSpeed = 50,
    loop = false,
    className = "",
    showCursor = true,
    hideCursorWhileTyping = false,
    cursorCharacter = "_",
    cursorClassName = "",
    cursorBlinkDuration = 0.5,
    textColors = [],
    variableSpeedEnabled = true,
    variableSpeed,
    variableSpeedMin = 20,
    variableSpeedMax = 35,
    onSentenceComplete,
    startOnVisible = false,
    reverseMode = false,
    animate = true,
    ...props
}: TextTypeProps & React.HTMLAttributes<HTMLElement>) => {
    const firstText = Array.isArray(text) ? text[0] : text;
    const [displayedText, setDisplayedText] = useState(!animate ? firstText : "");
    const [currentCharIndex, setCurrentCharIndex] = useState(!animate ? firstText.length : 0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(!startOnVisible);
    const cursorRef = useRef<HTMLSpanElement>(null);
    const containerRef = useRef<HTMLElement>(null);

    const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

    const getRandomSpeed = useCallback(() => {
        if (!variableSpeed) return typingSpeed;
        const { min, max } = variableSpeed;
        return Math.random() * (max - min) + min;
    }, [variableSpeed, typingSpeed]);

    const getCurrentTextColor = () => {
        if (textColors.length === 0) return "inherit";
        return textColors[currentTextIndex % textColors.length];
    };

    useEffect(() => {
        if (!startOnVisible || !containerRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.1 },
        );

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [startOnVisible]);

    useEffect(() => {
        if (showCursor && cursorRef.current) {
            gsap.set(cursorRef.current, { opacity: 1 });
            gsap.to(cursorRef.current, {
                opacity: 0,
                duration: cursorBlinkDuration,
                repeat: -1,
                yoyo: true,
                ease: "power2.inOut",
            });
        }
    }, [showCursor, cursorBlinkDuration]);

    useEffect(() => {
        if (!isVisible) return;

        let timeout: ReturnType<typeof setTimeout>;

        const currentText = textArray[currentTextIndex];
        const processedText = reverseMode ? currentText.split("").reverse().join("") : currentText;

        const executeTypingAnimation = () => {
            if (isDeleting) {
                if (displayedText === "") {
                    setIsDeleting(false);
                    if (currentTextIndex === textArray.length - 1 && !loop) {
                        return;
                    }

                    if (onSentenceComplete) {
                        onSentenceComplete(textArray[currentTextIndex], currentTextIndex);
                    }

                    setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
                    setCurrentCharIndex(0);
                    timeout = setTimeout(() => {}, pauseDuration);
                } else {
                    timeout = setTimeout(() => {
                        setDisplayedText((prev) => prev.slice(0, -1));
                    }, deletingSpeed);
                }
            } else {
                if (currentCharIndex < processedText.length) {
                    timeout = setTimeout(
                        () => {
                            setDisplayedText((prev) => prev + processedText[currentCharIndex]);
                            setCurrentCharIndex((prev) => prev + 1);
                        },
                        variableSpeed ? getRandomSpeed() : typingSpeed,
                    );
                } else if (textArray.length >= 1) {
                    if (!loop && currentTextIndex === textArray.length - 1) return;
                    timeout = setTimeout(() => {
                        setIsDeleting(true);
                    }, pauseDuration);
                }
            }
        };

        if (currentCharIndex === 0 && !isDeleting && displayedText === "") {
            timeout = setTimeout(executeTypingAnimation, initialDelay);
        } else {
            executeTypingAnimation();
        }

        return () => clearTimeout(timeout);
    }, [
        currentCharIndex,
        displayedText,
        isDeleting,
        typingSpeed,
        deletingSpeed,
        pauseDuration,
        textArray,
        currentTextIndex,
        loop,
        initialDelay,
        isVisible,
        reverseMode,
        variableSpeed,
        onSentenceComplete,
    ]);

    const shouldHideCursor =
        hideCursorWhileTyping && (currentCharIndex < textArray[currentTextIndex].length || isDeleting);

    return createElement(
        Component,
        {
            ref: containerRef,
            className: `text-type ${className}`,
            ...props,
        },
        <span className="text-type__content" style={{ color: getCurrentTextColor() || "inherit" }}>
            {reverseMode
                ? displayedText
                : renderHighlighted(displayedText, textArray[currentTextIndex], text2, text2Color)}
        </span>,
        showCursor && (
            <span
                ref={cursorRef}
                className={`text-type__cursor ${cursorClassName} ${shouldHideCursor ? "text-type__cursor--hidden" : ""}`}
            >
                {cursorCharacter}
            </span>
        ),
    );
};

export default TextType;
