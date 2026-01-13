export interface Phishing {
    id: string; // phish_id mapped to id in backend
    url: string;
    phishDetailUrl: string;
    submissionTime: string;
    verified: string;
    verificationTime: string;
    online: string;
    target: string;
}

export interface CheckPhishingResponse {
    isPhishing: boolean;
    details: Phishing | null;
}