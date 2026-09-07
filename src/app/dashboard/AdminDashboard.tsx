"use client"

import { Flex, Heading } from "@radix-ui/themes";
import { fetchAdminData } from '@/app/actions/fetchAdminData'
import { useState, useEffect, useCallback } from "react";
import AdminDashboardCard from "./ui/AdminSectionCard";

interface AdminDashBoardType {
    loading: boolean;
    applied: any[];
    skipped: any[];
    images: any[];
    appliedOffset: number;
    skippedOffset: number;
    imagesOffset: number;
}

export function AdminDashboard() {
    const [data, setData] = useState<AdminDashBoardType>({
        loading: true,
        applied: [],
        skipped: [],
        images: [],
        appliedOffset: 0,
        skippedOffset: 0,
        imagesOffset: 0,
    });

    const loadData = useCallback(async () => {
        const res = await fetchAdminData({
            appliedOffset: 0,
            skippedOffset: 0,
            imagesOffset: 0,
        });
        setData((prev) => ({
            ...prev,
            loading: false,
            applied: res.applied || [],
            skipped: res.skipped || [],
            images: res.images || [],
        }));
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    return (
        <Flex gap='8' direction='column' style={{ width: '100%' }}>
            <Heading size='9'>Welcome, Ted!</Heading>
            <AdminDashboardCard title='Applied Jobs' data={data.applied} offset={data.appliedOffset} />
            <AdminDashboardCard title='Skipped Jobs' data={data.skipped} offset={data.skippedOffset} />
            <AdminDashboardCard title='Images'       data={data.images}  offset={data.imagesOffset} onUploaded={loadData} />
        </Flex>
    );
}