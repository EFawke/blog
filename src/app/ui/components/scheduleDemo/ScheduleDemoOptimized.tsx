'use client'

import { Flex, Text, Button, Separator, Code, TextField, Tooltip } from "@radix-ui/themes";
import { DataVisTop } from "./dataVisTop";
import { DataVisBottom } from "./dataVisBottom";
import React from "react";
import { defaultReactions, scheduleReactions, ReactionType } from "./utils";
import { useState } from "react";

export function ScheduleDemoOptimized() {
    const [isPaused, setIsPaused] = useState<boolean>(true);
    const [iterationCounter, setIterationCounter] = useState<number>(0);
    const [lastInputNumSlots, setLastInputNumSlots] = useState(13);
    const [numSlots, setNumSlots] = useState(13);
    const [percentageStep, setPercentageStep] = useState(0);
    const reactions = defaultReactions;
    const [slots, setSlots] = useState<ReactionType[]>([]);
    const [status, setStatus] = useState<"Ready" | "Running" | "Done" | "Paused">("Ready");
    const [stepDelay, setStepDelay] = useState<number | null>(null);

    function changeNumSlots(newNumSlots: number) {
        setNumSlots(newNumSlots);
        setLastInputNumSlots(newNumSlots);
    }

    function changeStepDelay(newStepDelay: number | null) {
        setStepDelay(newStepDelay);
    }

    function togglePause() {
        const newState = !isPaused;
        setIsPaused(newState);
        console.log(newState)
        return newState
    }
      

    async function applySchedule(){
        if (status === "Done") {
            setStatus("Ready")
            setSlots([]);
            setPercentageStep(0);
            setNumSlots(lastInputNumSlots)
            setIterationCounter(0)
            return;
        }

        if (Number(numSlots) < defaultReactions.length) {
            const updatedSlotCount = defaultReactions.length;
            setNumSlots(updatedSlotCount)
        }

        await scheduleReactions(
            defaultReactions, 
            numSlots, 
            setSlots, 
            setNumSlots, 
            setStatus, 
            setIsPaused,
            setIterationCounter,
            iterationCounter,
            setPercentageStep,
            isPaused,
            stepDelay
        )
    }

    function handleMainButtonClick() {
        if (status === "Running") {
            console.log("toggling pause")
            togglePause();
        }
         else {
            applySchedule();
        }
    }

    function getButtonText() {
        if (status == "Ready") {
            return "Let's Go!"
        }
        if (status == "Done") {
            return "Reset"
        }
        if (status == "Running") {
            return "Running..."
        }
        if (status == "Paused") {
            return "Continue"
        }
    }

    return (
        <Flex direction="column" gap="2" pt="4" pb="4">
            <DataVisTop
                stepDelay={stepDelay}
                changeNumSlots={changeNumSlots}
                changeStepDelay={changeStepDelay}
                percentageStep={percentageStep}
                defaultReactions={reactions}
                numSlots={numSlots}
                status={status}
            ></DataVisTop>
            <Separator my="3" size="4" />
            <Flex gap="3" align="end" wrap="wrap" id="controls" justify="between">
                <Flex direction="column" gap="1">
                    <Tooltip content="Delay between each step in milliseconds">
                        <Flex direction="column" gap="1">
                            <Text size="2" weight="bold">Step Delay:</Text>
                            <TextField.Root
                                type="number"
                                placeholder="0"
                                onChange={(e) => changeStepDelay(Number(e.target.value))}
                                size="2"
                                min="0"
                            >
                                <TextField.Slot side="right">
                                    ms
                                </TextField.Slot>
                            </TextField.Root>
                        </Flex>
                    </Tooltip>
                </Flex>
                <Tooltip content="Number of slots available for reactions">
                    <Flex direction="column" gap="1">
                        <Text size="2" weight="bold">Number of Slots:</Text>
                        <TextField.Root
                            type="number"
                            placeholder="0"
                            value={numSlots || 0}
                            onChange={(e) => changeNumSlots(Number(e.target.value))}
                            size="2"
                            min="0"
                        />
                    </Flex>
                </Tooltip>
                <Flex direction="column" gap="1">
                    <Text size="2" weight="bold">Status:</Text>
                    <Code size="2" weight="bold">{status}</Code>
                </Flex>
                <Tooltip content="Number of potential schedules searched">
                    <Flex direction="column" gap="1">
                        <Text size="2" weight="bold">Step:</Text>
                        <Code size="2" weight="bold">{iterationCounter}</Code>
                    </Flex>
                </Tooltip>
                <Button onClick={handleMainButtonClick}>
                    {getButtonText()}
                </Button>
            </Flex>
            <Separator my="3" size="4" />
            <DataVisBottom slots={slots} />
        </Flex>
    )
}