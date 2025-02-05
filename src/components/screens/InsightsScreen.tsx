import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";
import { InsightCard } from "../ui/InsightCard";
import { useInsights } from "../../hooks/useInsights";

type InsightsScreenProps = {
    route: RouteProp<MainStackParamList, "Insights">,
    navigation: FrameNavigationProp<MainStackParamList, "Insights">,
};

export function InsightsScreen({ navigation }: InsightsScreenProps) {
    const { insights, loading } = useInsights();

    return (
        <scrollView>
            <stackLayout style={styles.container}>
                <label className="text-2xl font-bold mb-4">Your Insights</label>
                
                {loading ? (
                    <activityIndicator busy={true} />
                ) : (
                    insights.map(insight => (
                        <InsightCard
                            key={insight.id}
                            insight={insight}
                            onTap={() => console.log("Insight tapped:", insight.id)}
                        />
                    ))
                )}
            </stackLayout>
        </scrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
});