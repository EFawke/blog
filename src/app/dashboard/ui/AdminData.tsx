import { ImagesTable } from '@/app/dashboard/ui/ImagesTable'

export const AdminData = ({
    title, data, offset
}: { title: string, data: any[], offset: number }) => {
    return (
        <>
            {
                title === "Images" && <ImagesTable data={data} />
            }
            {
                title === "Applied Jobs" && <p>woah</p>
            }
            {
                title === "Skipped Jobs" && <p>woah</p>
            }
        </>
    )
}