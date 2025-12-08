export interface MaliciousApp {
    id: string;
    sha256: string;
    packageName?: string;
    threatType: string;
    createdAt: string;
    updatedAt: string;
}