import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";
import { ProfileSection } from "../ui/ProfileSection";
import { PlatformConsentItem } from "../ui/PlatformConsentItem";
import { useProfile } from "../../hooks/useProfile";
import { usePlatformConsent } from "../../hooks/usePlatformConsent";
import { platforms } from "../../data/platforms";

type ProfileScreenProps = {
    route: RouteProp<MainStackParamList, "Profile">,
    navigation: FrameNavigationProp<MainStackParamList, "Profile">,
};

export function ProfileScreen({ navigation }: ProfileScreenProps) {
    const { profile, loading: profileLoading } = useProfile();
    const {
        consents,
        loading: consentsLoading,
        updateConsent,
        updateProfileLink,
        saveConsents
    } = usePlatformConsent(profile?.id || "1");

    const handleSave = async () => {
        await saveConsents();
        // Show success message
        alert({
            title: "Success",
            message: "Your platform connections have been updated.",
            okButtonText: "OK"
        });
    };

    if (profileLoading || consentsLoading) {
        return (
            <flexboxLayout style={styles.container}>
                <activityIndicator busy={true} />
            </flexboxLayout>
        );
    }

    return (
        <scrollView>
            <stackLayout style={styles.container}>
                <image
                    src={profile?.avatarUrl || "res://placeholder_avatar"}
                    className="h-24 w-24 rounded-full mb-4"
                />
                <label className="text-2xl font-bold mb-4">
                    {profile?.name || "Loading..."}
                </label>

                <label className="text-xl font-semibold mb-4 text-center">
                    Platform Connections
                </label>
                
                <label className="text-sm text-gray-600 mb-6 text-center">
                    Enable platforms to help Nova provide better personalized recommendations
                </label>

                {platforms.map(platform => (
                    <PlatformConsentItem
                        key={platform.id}
                        platform={platform}
                        consent={consents.find(c => c.platformId === platform.id) || {
                            platformId: platform.id,
                            enabled: false
                        }}
                        onConsentChange={updateConsent}
                        onProfileLinkChange={updateProfileLink}
                    />
                ))}

                <button
                    className="bg-indigo-600 text-white p-4 rounded-lg mt-4 mb-8"
                    onTap={handleSave}
                >
                    Save Changes
                </button>
            </stackLayout>
        </scrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: "center",
    },
});