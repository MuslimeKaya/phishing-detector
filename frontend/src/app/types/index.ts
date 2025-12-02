export interface MaliciousApp {
    id: string;
    appName: string;
    packageName: string;
    version: string;
    detectionReason: string;
}

export interface ApiResponse<T> {
    data: T;
    error?: string;
}