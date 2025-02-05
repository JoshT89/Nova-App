import * as React from "react";
import { Platform, PlatformConsent } from "../../types/platform";

type PlatformConsentItemProps = {
    platform: Platform;
    consent: PlatformConsent;
    onConsentChange: (platformId: string, enabled: boolean) => void;
    onProfileLinkChange: (platformId: string, link: string) => void;
};

export function PlatformConsentItem({
    platform,
    consent,
    onConsentChange,
    onProfileLinkChange,
}: PlatformConsentItemProps) {
    return (
        <stackLayout className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <gridLayout rows="auto" columns="auto, *, auto">
                <label row={0} col={0} className="text-2xl mr-2">
                    {platform.icon}
                </label>
                <label row={0} col={1} className="text-lg font-semibold">
                    {platform.name}
                </label>
                <switch
                    row={0}
                    col={2}
                    checked={consent.enabled}
                    onCheckedChange={(args) => {
                        onConsentChange(platform.id, args.value);
                    }}
                />
            </gridLayout>
            
            <label className="text-sm text-gray-600 my-2">
                {platform.description}
            </label>

            {consent.enabled && (
                <textField
                    className="border rounded-lg p-2 mt-2"
                    hint="Enter your profile link"
                    text={consent.profileLink || ""}
                    onTextChange={(args) => {
                        onProfileLinkChange(platform.id, args.value);
                    }}
                />
            )}
        </stackLayout>
    );
}