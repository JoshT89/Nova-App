import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";
import { ProgressBar } from "../ui/ProgressBar";
import { useGoal } from "../../hooks/useGoal";

type GoalDetailScreenProps = {
    route: RouteProp<MainStackParamList, "GoalDetail">,
    navigation: FrameNavigationProp<MainStackParamList, "GoalDetail">,
};

export function GoalDetailScreen({ route, navigation }: GoalDetailScreenProps) {
    const { goalId } = route.params;
    const { goal, loading } = useGoal(goalId);

    if (loading) {
        return (
            <flexboxLayout style={styles.container}>
                <activityIndicator busy={true} />
            </flexboxLayout>
        );
    }

    return (
        <scrollView>
            <stackLayout style={styles.container}>
                <label className="text-2xl font-bold mb-4">{goal?.title}</label>
                
                <ProgressBar progress={goal?.progress || 0} />
                
                <label className="text-lg mt-4 mb-2">Description</label>
                <label className="text-gray-600 mb-4">{goal?.description}</label>

                <label className="text-lg mt-4 mb-2">Milestones</label>
                {goal?.milestones.map((milestone, index) => (
                    <gridLayout
                        key={index}
                        className="bg-white p-4 rounded-lg shadow-sm mb-2"
                        rows="auto"
                        columns="auto, *"
                    >
                        <label
                            row={0}
                            col={0}
                            className={`mr-2 ${milestone.completed ? 'text-green-600' : 'text-gray-400'}`}
                        >
                            {milestone.completed ? '✓' : '○'}
                        </label>
                        <label row={0} col={1} className="text-gray-600">
                            {milestone.title}
                        </label>
                    </gridLayout>
                ))}

                <button
                    className="bg-indigo-600 text-white p-4 rounded-lg mt-4"
                    onTap={() => console.log("Update Progress")}
                >
                    Update Progress
                </button>
            </stackLayout>
        </scrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
});