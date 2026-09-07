export type FormData = {
    name: string;
    email: string;
    message: string;
};

export async function sendEmail(data: FormData): Promise<string> {
    const apiEndpoint = '/api/email';

    const res = await fetch(apiEndpoint, {
        method: 'POST',
        body: JSON.stringify(data),
    });

    const response = await res.json();

    if (!res.ok) {
        throw new Error(response.message || 'Something went wrong. Please try again.');
    }

    return response.message as string;
}