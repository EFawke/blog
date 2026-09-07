"use server"

import { Client } from "pg"
import { verifySession } from '@/app/lib/session'
import { redirect } from 'next/navigation'

const fetchApplied = async (offset: number = 0) : Promise<any[]> => {
    const client = await new Client({ connectionString: process.env.DATABASE_URL }).connect();
    const sql = `
    SELECT j.id, j.title, j.description, j.link, j.applied_at,
           COALESCE(
               json_agg(
                   json_build_object(
                       'id', aq.id,
                       'question', aq.question,
                       'answer', aq.answer,
                       'options', aq.options
                   )
               ) FILTER (WHERE aq.id IS NOT NULL),
               '[]'
           ) AS questions
    FROM applied_jobs j
    LEFT JOIN answered_questions aq ON j.id = aq.job_id
    GROUP BY j.id, j.title, j.description, j.link, j.applied_at
    ORDER BY j.applied_at DESC, j.id ASC
    OFFSET $1 LIMIT 10;`;


    const res = await client.query(sql, [offset]);
    await client.end();
    return res.rows;
};

const fetchSkipped = async (offset: number = 0) => {
    const client = await new Client({ connectionString: process.env.DATABASE_URL }).connect();
    const sql = `SELECT * FROM skipped_jobs ORDER BY skipped_at DESC OFFSET $1 LIMIT 10;`;
    const res = await client.query(sql, [offset]);
    await client.end();
    return res.rows;
};

const fetchImages = async (offset: number = 0) => {
    const client = await new Client({ connectionString: process.env.DATABASE_URL }).connect();
    const sql = `SELECT * FROM images ORDER BY created_at DESC OFFSET $1 LIMIT 10;`;
    const res = await client.query(sql, [offset]);
    await client.end();
    return res.rows;
};

export const fetchAdminData = async ({
    appliedOffset,
    skippedOffset,
    imagesOffset
} : {
    appliedOffset: number,
    skippedOffset: number,
    imagesOffset: number
}) => {
    const session = await verifySession()
    if (!session) redirect('/signin')
    const applied = await fetchApplied(appliedOffset)
    const skipped = await fetchSkipped(skippedOffset)
    const images = await fetchImages(imagesOffset)

    return {
        applied: applied,
        skipped: skipped,
        images: images
    };
}