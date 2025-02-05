import * as React from "react";
import { StyleSheet } from "react-nativescript";

type InsightCardProps = {
    insight: {
        id: string;
        title: string;
        description: string;
        type: string;
    };
    onTap: () => void;
};

export function InsightCard({ insight, onTap }: InsightCardProps) {
    return (
        <gridLayout
            className="bg-white p-4 rounded-lg shadow-sm mb-4"
            rows="auto, auto"
            columns="*, auto"
            onTap={onTap}
        >
            <label row={0} col={0} className="text-lg font-semibold">
                {insight.title}
            </label>
            <label row={1} col={0} className="text-sm text-gray-600">
                {insight.description}
            </label>
            <label row={0} col={1} rowSpan={2} className="text-indigo-600">
                →
            </label>
        </gridLayout>
    );
}