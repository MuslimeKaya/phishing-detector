export interface Phishing {
    id: string;
    url: string;
    source: string;
    target: string;
    createdAt: string;
}

export interface CheckPhishingResponse {
    isPhishing: boolean;
    details: Phishing | null;
}