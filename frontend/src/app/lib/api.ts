import { MaliciousApp } from '@/app/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const api = {
    async getApps(): Promise<MaliciousApp[]> {
        const res = await fetch(`${API_BASE_URL}/malicious-app`);
        if (!res.ok) throw new Error('Failed to fetch apps');
        return res.json();
    },

    async createApp(data: Omit<MaliciousApp, 'id'>): Promise<MaliciousApp> {
        const res = await fetch(`${API_BASE_URL}/malicious-app`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to create app');
        return res.json();
    },

    async updateApp(id: string, data: Partial<Omit<MaliciousApp, 'id'>>): Promise<MaliciousApp> {
        const res = await fetch(`${API_BASE_URL}/malicious-app/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to update app');
        return res.json();
    },

    async deleteApp(id: string): Promise<void> {
        const res = await fetch(`${API_BASE_URL}/malicious-app/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error('Failed to delete app');
    },
};