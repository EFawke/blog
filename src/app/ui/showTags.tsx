import { Badge } from "@radix-ui/themes";

export function ShowTags({ tags }: { tags: string[] }) {
    return (
        tags.map((tag: string) => {
            return (
                <Badge key={tag} variant="soft" size="2" color="blue">
                    {tag}
                </Badge>
            )
        })
    )
}