import { Phishing, CheckPhishingResponse } from '@/app/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const api = {
    async getPhishingUrls(page = 1, limit = 10, search = ''): Promise<{ data: Phishing[]; total: number }> {
        const url = new URL(`${API_BASE_URL}/phishing`);
        url.searchParams.append('page', String(page));
        url.searchParams.append('limit', String(limit));
        if (search) {
            url.searchParams.append('search', search);
        }

        const res = await fetch(url.toString());
        if (!res.ok) throw new Error('Failed to fetch phishing URLs');

        const result = await res.json();
        return result;
    },

    async createPhishing(data: { url: string; target: string }): Promise<Phishing> {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };

        const res = await fetch(`${API_BASE_URL}/phishing`, {
            method: 'POST',
            headers,
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
    },

    async deletePhishing(id: string): Promise<void> {
        const res = await fetch(`${API_BASE_URL}/phishing/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error('Failed to delete phishing entry');
    }
};