import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";

type GoalsScreenProps = {
    route: RouteProp<MainStackParamList, "Goals">,
    navigation: FrameNavigationProp<MainStackParamList, "Goals">,
};

export function GoalsScreen({ navigation }: GoalsScreenProps) {
    const goals = [
        { id: '1', title: 'Get Healthier', progress: 60 },
        { id: '2', title: 'Save Money', progress: 45 },
        { id: '3', title: 'Learn New Skills', progress: 30 },
    ];

    return (
        <scrollView>
            <stackLayout style={styles.container}>
                <label className="text-2xl font-bold mb-4">Your Goals</label>
                
                {goals.map(goal => (
                    <gridLayout
                        key={goal.id}
                        className="bg-white p-4 rounded-lg shadow-sm mb-4"
                        rows="auto, auto"
                        columns="*, auto"
                        onTap={() => navigation.navigate("GoalDetail", { goalId: goal.id })}
                    >
                        <label row={0} col={0} className="text-lg font-semibold">
                            {goal.title}
                        </label>
                        <label row={1} col={0} className="text-sm text-gray-600">
                            Progress: {goal.progress}%
                        </label>
                        <label row={0} col={1} rowSpan={2} className="text-indigo-600">
                            →
                        </label>
                    </gridLayout>
                ))}

                <button
                    className="bg-indigo-600 text-white p-4 rounded-lg mt-4"
                    onTap={() => console.log("Add new goal")}
                >
                    Add New Goal
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