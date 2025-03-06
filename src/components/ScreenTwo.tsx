import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList"; // Ensure this path is correct

type ScreenTwoProps = {
    route: RouteProp<MainStackParamList, "Two">,
    navigation: FrameNavigationProp<MainStackParamList, "Two">,
};

export function ScreenTwo({ route, navigation }: ScreenTwoProps) {
    const { message } = route.params;

    return (
        <flexboxLayout style={styles.container}>
            <label className="text-2xl mb-4 font-bold text-center text-indigo-600">
                {message}
            </label>
            <button
                className="btn btn-primary"
                onTap={() => navigation.goBack()}
            >
                Go back
            </button>
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
});

export default ScreenTwo;