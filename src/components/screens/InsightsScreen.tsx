import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { RouteProp } from "@react-navigation/core"; // Correct import for RouteProp
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";
import { InsightCard } from "../ui/InsightCard";
import { useInsights } from "../../hooks/useInsights"; // Ensure correct import path

type InsightsScreenProps = {
    route: RouteProp<MainStackParamList, "Insights">; // Corrected type
    navigation: FrameNavigationProp<MainStackParamList, "Insights">;
    youtubeToken: string | null;
};

export function InsightsScreen({ navigation, youtubeToken }: InsightsScreenProps) {
    const { insights, loading, error } = useInsights(youtubeToken);

    if (loading) {
        return <label>Loading...</label>;
    }

    if (error) {
        return <label>Error: {error}</label>;
    }

    return (
        <scrollView>
            <stackLayout className="insights-container">
                <label className="insights-title">Your Insights</label>

                {insights.map((insight) => (
                    <InsightCard
                        key={insight.id}
                        insight={insight}
                        onTap={() => navigation.navigate(insight.type)}
                    />
                ))}
            </stackLayout>
        </scrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
});