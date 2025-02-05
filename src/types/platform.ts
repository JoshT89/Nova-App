export interface Platform {
    id: string;
    name: string;
    icon: string;
    description: string;
}

export interface PlatformConsent {
    platformId: string;
    enabled: boolean;
    profileLink?: string;
}

export interface UserPlatformConsent {
    userId: string;
    platforms: PlatformConsent[];
}