import React from "react";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { TextField, Flex } from "@radix-ui/themes";

export default function Pass({ label, formLabel, storedPass }: {label: string, formLabel: string, storedPass: string}) {
    const handleClick = () => {
        setShow(!show)
    }

    const [show, setShow] = useState(false)

    return (
        <Flex direction='column' mt='2' gap='2' className="form_item">
            <Text as="div" size="2" mb="1" weight="bold">
                Email
              </Text>
            <TextField.Root
                placeholder={storedPass || ''}
                style={{ width: 200 }}
                required
                minLength={6}
                id='password'
                name={formLabel}
                autoComplete='password'
                enterKeyHint='next'
                type={show ? "text" : "password"}
            >
                <TextField.Slot side="right" style={{ cursor: "pointer" }}>
                    {
                        show ?
                            (
                                <EyeOpenIcon onClick={handleClick} height="16" width="16" />
                            )
                            :
                            (
                                <EyeClosedIcon onClick={handleClick} height="16" width="16" />
                            )
                    }
                </TextField.Slot>
            </TextField.Root>
        </Flex>
    )
}