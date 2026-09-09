"use client";
import { useMemo, useState, useEffect } from "react";
import { Text, Flex, Card } from "@radix-ui/themes";

const UIButton = ({ color }: { color: string }) => {
    return (
        <div
            style={{
                height: "0.7rem",
                width: "0.7rem",
                background: color,
                borderRadius: "100%",
            }}
        ></div>
    );
};

export const Terminal = () => {
    const array = [
        "woah, how's it going?", 
        "sorry, i'm not used to having visitors...", 
        "...can i get you something?", 
        "tea?", 
        "coffee, maybe?",
        "well i'll be here if you need anything...",
        "feel free to have a look around",
        "what are you here for?",
        "we've got github links, blog posts, etc",
        "oh, we've got biscuits",
        "a diet, eh? sorry to hear that",
        "i won't mention the biscuits again"
    ]
    const textArray = useMemo(
        () => array,
        [],
    );
    const [word, setWord] = useState(0); // the word that we're currently on
    const [char, setChar] = useState(0); // the char of the word we're on
    const [reverse, setReverse] = useState(false); // backspacing
    const [timing, setTiming] = useState(50); // speed up or slow down typing

    const text = useMemo(
        () => textArray[word].slice(0, char),
        [word, textArray, char],
    );

    useEffect(() => {
        const interval = setInterval(() => {
            // end of word
            if (char === textArray[word].length) {
                setReverse(true);
                setTiming(2000);
                if(word === textArray.length - 1){
                    return;
                }
            }
            // new word
            if (char === 0 && reverse === true) {
                setTiming(50);
                setWord((prev) => prev + 1);
                setReverse(false);
            }
            // incrementing
            if (char < textArray[word].length && reverse === false) {
                setChar((prev) => prev + 1);
            }
            // backspacing
            if (char !== 0 && reverse === true) {
                setChar((prev) => prev - 1);
                setTiming(30);
            }
        }, timing);

        return () => clearInterval(interval);
    }, [textArray, char, word, text, reverse, timing]);

    return (
        <Card className='terminal'>
            <Flex
                id="header_row"
                pb="3"
                style={{
                    borderBottom: "1px solid var(--gray-3)",
                }}
            >
                <Flex gap="2" align="center">
                    <UIButton color="#fe5e57"></UIButton>
                    <UIButton color="#fdbb2d"></UIButton>
                    <UIButton color="#27c73f"></UIButton>
                </Flex>
            </Flex>
            <Flex
                pt="1"
                align="center"
                gap="1"
                style={{ color: "var(--accent-11)" }}
            >
                <Text>
                    {"$ "}
                    {text}
                </Text>
                <div className="blink cursor"></div>
            </Flex>
        </Card>
    );
};
