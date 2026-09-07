import React from "react";
import { Flex, Card, Text, Link } from "@radix-ui/themes";

export default function LoginSuccess() {
    return (
        <Card style={{ width: 'fit-content', padding: '30px', margin: '0 auto' }}>
            <Flex direction="column" gap="4">
                <Text>Howdy! You are now logged in</Text>
            </Flex>
        </Card>
    )
}