"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Dialog, Flex, Text, TextField, TextArea } from "@radix-ui/themes";
import { useCelebration } from "./CelebrationContext";
import { sendEmail, type FormData } from "@/app/lib/send-email";

type Status = { type: "success" | "error"; message: string } | null;

export function ContactButton() {
  const { setPreviewing, setSent } = useCelebration();
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(data: FormData) {
    setIsSubmitting(true);
    setStatus(null);

    try {
      const message = await sendEmail(data);
      setStatus({ type: "success", message: message || "Your message has been sent." });
      setSent(true); // fire the celebration on a successful send
      reset();
      // setTimeout(() => setOpen(false), 1200); // close after a beat; remove if you'd rather leave it open
    } catch (err) {
      setStatus({
        type: "error",
        message: err instanceof Error ? err.message : "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const resetStates = () => {
    setSent(false);
    setPreviewing(false)
    setOpen(false)
    setStatus(null)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button
          variant="outline"
          size="3"
          style={{ cursor: "pointer", width: "fit-content", padding: "1.5rem" }}
          onMouseEnter={() => setPreviewing(true)}
          onMouseLeave={() => setPreviewing(false)}
        >
          <Text weight="bold">Get in touch</Text>
        </Button>
      </Dialog.Trigger>
      {
        status?.type === "success" ? (
          <Dialog.Content maxWidth="450px">
            <Dialog.Title>Message sent</Dialog.Title>
            <Dialog.Description size="2" mb="4">
              Thanks! I'll get back to you soon
            </Dialog.Description>
            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close>
                <Button style={{ cursor: "pointer" }} onClick={() => resetStates()}>
                  Done
                </Button>
              </Dialog.Close>
            </Flex>
          </Dialog.Content>
        ) : (
          <Dialog.Content maxWidth="450px">
            <Dialog.Title>Say hello</Dialog.Title>
            <Dialog.Description size="2" mb="4">
              Drop a note and I'll get back to you.
            </Dialog.Description>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Flex direction="column" gap="3">
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Name
                  </Text>
                  <TextField.Root
                    placeholder="Your name"
                    {...register("name", { required: true })}
                  />
                </label>
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Email
                  </Text>
                  <TextField.Root
                    type="email"
                    placeholder="you@example.com"
                    {...register("email", { required: true })}
                  />
                </label>
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Message
                  </Text>
                  <TextArea
                    resize="vertical"
                    placeholder="What's on your mind?"
                    {...register("message", { required: true })}
                  />
                </label>

                {status && (
                  <Text
                    as="p"
                    size="2"
                    color={status?.type === "error" ? "red" : "green"}
                    role="status"
                    aria-live="polite"
                  >
                    {status.message}
                  </Text>
                )}
              </Flex>

              <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                  <Button type="button" variant="soft" color="gray" style={{ cursor: "pointer" }}>
                    Cancel
                  </Button>
                </Dialog.Close>
                <Button type="submit" disabled={isSubmitting} style={{ cursor: "pointer" }}>
                  {isSubmitting ? "Sending…" : "Send message"}
                </Button>
              </Flex>
            </form>
          </Dialog.Content>
        )
      }
    </Dialog.Root>
  );
}