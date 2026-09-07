"use client"

import { Flex, Card, Theme, Heading, Text } from "@radix-ui/themes";
import { UploadImage } from '@/app/dashboard/ui/UploadImage'
import { AdminData } from '@/app/dashboard/ui/AdminData'

export default function AdminDashboardCard({
    title, data, offset, onUploaded,
}: {
    title: string;
    data: any[];
    offset: number;
    onUploaded?: () => void;
}) {
    return (
        <Theme radius='large'>
            <Card style={{ width: '100%', minHeight: '10rem' }}>
                <Flex pb='5' pt='5' pl='5' pr='5' direction='column'>
                    <Heading size='5' mb='3'>{title}</Heading>
                    <Flex mb='4'>
                        {data.length === 0
                            ? <Text size='2' mb='4'>No data</Text>
                            : <AdminData title={title} data={data} offset={offset} />}
                    </Flex>
                </Flex>
                {title === 'Images' && <UploadImage onUploaded={onUploaded} />}
            </Card>
        </Theme>
    );
}