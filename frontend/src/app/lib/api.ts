import { Phishing, CheckPhishingResponse } from '@/app/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const api = {
    async getPhishingUrls(): Promise<Phishing[]> {
        const res = await fetch(`${API_BASE_URL}/phishing`);
        if (!res.ok) throw new Error('Failed to fetch phishing URLs');
        return res.json();
    },

    async createPhishing(data: { url: string; source: string; target: string }): Promise<Phishing> {
        const res = await fetch(`${API_BASE_URL}/phishing`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to create phishing entry');
        return res.json();
    },

    async checkPhishing(url: string): Promise<CheckPhishingResponse> {
        const res = await fetch(`${API_BASE_URL}/phishing/check`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url }),
        });
        if (!res.ok) throw new Error('Failed to check URL');
        return res.json();
    },

    async getPhishingById(id: string): Promise<Phishing> {
        const res = await fetch(`${API_BASE_URL}/phishing/${id}`);
        if (!res.ok) throw new Error('Failed to fetch phishing entry');
        return res.json();
    }
};