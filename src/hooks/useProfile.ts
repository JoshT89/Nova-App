import { useState, useEffect } from "react";

type Profile = {
    id: string;
    name: string;
    email: string;
    location: string;
    avatarUrl: string;
};

export function useProfile() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setProfile({
                id: "1",
                name: "John Doe",
                email: "john@example.com",
                location: "New York, USA",
                avatarUrl: "res://placeholder_avatar",
            });
            setLoading(false);
        }, 1000);
    }, []);

    return { profile, loading };
}