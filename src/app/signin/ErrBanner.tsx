import React from "react";
import { Flex, Text, IconButton } from "@radix-ui/themes";
import { Cross1Icon, } from "@radix-ui/react-icons";

export default function ErrorBanner({ errDsp, errMsg, toggleDsp } : {errDsp : boolean, errMsg: string, toggleDsp: () => void}) {

    return (
        <Flex style={!errDsp ? { display: 'none' } : { display: 'flex', width: '100%', justifyContent: 'center' }}>
            <Flex gap="5" align="center" >
                <Text>{errMsg}</Text>
                <IconButton size="1" variant="ghost" onClick={toggleDsp}>
                    <Cross1Icon width="10" height="10" />
                </IconButton>
            </Flex>
        </Flex>
    )
}