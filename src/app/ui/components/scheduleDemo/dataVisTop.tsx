import { Flex, Text, DataList, Code } from "@radix-ui/themes";
import { ReactionType } from "./utils"


interface DataVisTopProps {
    stepDelay: number | null;
    changeNumSlots: (newNumSlots: number) => void;
    changeStepDelay: (newStepDelay: number | null) => void;
    percentageStep: number;
    defaultReactions: ReactionType[];
    numSlots: number;
    status: "Ready" | "Running" | "Done" | "Paused";
}

export function DataVisTop({
    defaultReactions,
}: DataVisTopProps) {
    return (
        <Flex className="top_container" mt="2" gap="2" justify="between">
            <DataList.Root>
                {defaultReactions.map((reaction, index) => (
                    <DataList.Item key={index} align="center">
                        <DataList.Label>
                            <Text size="2"
                                className={`reaction-name ${reaction.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                                weight="bold">{reaction.name}</Text>
                        </DataList.Label>
                        <DataList.Value>
                            <Code size="2" weight="bold">{reaction.runs} runs</Code>
                        </DataList.Value>
                    </DataList.Item>
                ))}
            </DataList.Root>
        </Flex>
    )
}
