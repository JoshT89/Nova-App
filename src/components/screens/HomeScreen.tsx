import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";

type HomeScreenProps = {
    route: RouteProp<MainStackParamList, "Home">,
    navigation: FrameNavigationProp<MainStackParamList, "Home">,
};

export function HomeScreen({ navigation }: HomeScreenProps) {
    return (
        <flexboxLayout style={styles.container}>
            <label className="text-3xl font-bold mb-4 text-indigo-600">
                Welcome to Nova
            </label>
            <label className="text-lg mb-8 text-center text-gray-600">
                Your AI-powered life coach
            </label>
            
            <stackLayout style={styles.buttonContainer}>
                <button
                    className="bg-indigo-600 text-white p-6 rounded-2xl mb-8"
                    style={styles.button}
                    onTap={() => navigation.navigate("Profile")}
                >
                    Profile
                </button>
                <button
                    className="bg-indigo-600 text-white p-6 rounded-2xl mb-8"
                    style={styles.button}
                    onTap={() => navigation.navigate("Insights")}
                >
                    Insights
                </button>
                <button
                    className="bg-indigo-600 text-white p-6 rounded-2xl"
                    style={styles.button}
                    onTap={() => navigation.navigate("Goals")}
                >
                    My Goals
                </button>
            </stackLayout>
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
        padding: 20,
    },
    buttonContainer: {
        width: "66%", // Makes buttons take up 2/3 of screen width
        alignItems: "stretch", // Makes all buttons same width
    },
    button: {
        height: 80, // Fixed height for all buttons
        fontSize: 20,
        fontWeight: "600",
    },
});