"use client";

import { useState } from "react";
import { Flex, Dialog, Text, Button } from "@radix-ui/themes";

export function UploadImage({ onUploaded }: { onUploaded?: () => void }) {
  const [imageOpen, setImageOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSavingImage, setIsSavingImage] = useState(false);

  const handleAddImage = async () => {
    if (!selectedFile) return;

    setIsSavingImage(true);
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const res = await fetch("/api/image/upload", { method: "POST", body: formData });
      if (!res.ok) throw new Error(`Upload failed: ${res.status}`);

      const result = await res.json();
      if (!result.success) throw new Error(result.error ?? "Upload failed");

      setSelectedFile(null);
      setImageOpen(false);
      onUploaded?.();   // refresh the dashboard list
    } catch (err) {
      console.error(err);
      // ideally surface this in the dialog rather than only logging
    } finally {
      setIsSavingImage(false);
    }
  };

  return (
    <Flex direction="column" gap="4">
      <Flex direction="row" gap="4" p='4'>
        <Dialog.Root open={imageOpen} onOpenChange={setImageOpen}>
          <Dialog.Trigger>
            <Button>Add Image</Button>
          </Dialog.Trigger>

          <Dialog.Content maxWidth="450px">
            <Dialog.Title>Add Image</Dialog.Title>
            <Dialog.Description size="2" mb="4">
              Images are a great way to catch the eye
            </Dialog.Description>

            <Flex direction="column" gap="3">
              <Flex
                direction="column"
                align="center"
                justify="center"
                gap="2"
                style={{
                  border: "2px dashed var(--gray-6)",
                  padding: "24px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                <Text size="2">
                  {selectedFile ? selectedFile.name : "Upload a file"}
                </Text>

                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  id="file-upload"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
                />

                <Button asChild>
                  <label htmlFor="file-upload">Choose file</label>
                </Button>
              </Flex>
            </Flex>

            <Flex gap="3" mt="4" justify="end">
              <Button
                variant="soft"
                color="gray"
                onClick={() => setImageOpen(false)}
                disabled={isSavingImage}
              >
                Cancel
              </Button>

              <Button
                onClick={handleAddImage}
                disabled={!selectedFile || isSavingImage}
              >
                {isSavingImage ? "Saving..." : "Save"}
              </Button>
            </Flex>
          </Dialog.Content>
        </Dialog.Root>
      </Flex>
    </Flex>
  );
}