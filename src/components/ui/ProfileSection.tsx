import * as React from "react";
import { StyleSheet } from "react-nativescript";

type ProfileSectionProps = {
    title: string;
    items: Array<{
        label: string;
        value?: string;
    }>;
};

export function ProfileSection({ title, items }: ProfileSectionProps) {
    return (
        <stackLayout className="w-full mb-6">
            <label className="text-lg font-semibold mb-2">{title}</label>
            {items.map((item, index) => (
                <gridLayout
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-sm mb-2"
                    rows="auto"
                    columns="*, *"
                >
                    <label row={0} col={0} className="text-gray-600">
                        {item.label}
                    </label>
                    <label row={0} col={1} className="text-right">
                        {item.value || "—"}
                    </label>
                </gridLayout>
            ))}
        </stackLayout>
    );
}