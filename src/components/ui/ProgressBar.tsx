import * as React from "react";
import { StyleSheet } from "react-nativescript";

type ProgressBarProps = {
    progress: number;
};

export function ProgressBar({ progress }: ProgressBarProps) {
    const clampedProgress = Math.min(Math.max(progress, 0), 100);
    
    return (
        <gridLayout className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <stackLayout
                className="bg-indigo-600 h-full"
                style={{ width: `${clampedProgress}%` }}
            />
        </gridLayout>
    );
}