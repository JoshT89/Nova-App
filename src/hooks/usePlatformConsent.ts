import { useState, useEffect } from "react";
import { PlatformConsent } from "../types/platform";
import { platforms } from "../data/platforms";

export function usePlatformConsent(userId: string) {
    const [consents, setConsents] = useState<PlatformConsent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading saved consents
        setTimeout(() => {
            setConsents(
                platforms.map(platform => ({
                    platformId: platform.id,
                    enabled: false,
                    profileLink: ""
                }))
            );
            setLoading(false);
        }, 500);
    }, [userId]);

    const updateConsent = (platformId: string, enabled: boolean) => {
        setConsents(prev => 
            prev.map(consent => 
                consent.platformId === platformId
                    ? { ...consent, enabled }
                    : consent
            )
        );
    };

    const updateProfileLink = (platformId: string, profileLink: string) => {
        setConsents(prev => 
            prev.map(consent => 
                consent.platformId === platformId
                    ? { ...consent, profileLink }
                    : consent
            )
        );
    };

    const saveConsents = async () => {
        // Simulate API call to save consents
        return new Promise(resolve => {
            setTimeout(() => {
                console.log("Saved consents:", consents);
                resolve(true);
            }, 1000);
        });
    };

    return {
        consents,
        loading,
        updateConsent,
        updateProfileLink,
        saveConsents
    };
}