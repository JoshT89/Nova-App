import { Dialogs } from '@nativescript/core';
import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList"; // Ensure this path is correct

type ScreenOneProps = {
    route: RouteProp<MainStackParamList, "One">,
    navigation: FrameNavigationProp<MainStackParamList, "One">,
};

export function ScreenOne({ navigation }: ScreenOneProps) {
    return (
        <flexboxLayout style={styles.container}>
            <label className="text-2xl mb-4 font-bold text-center text-indigo-600">
                Hello World!
            </label>
            <button
                className="btn btn-primary mb-4"
                onTap={() => Dialogs.alert("Tapped!")}
            >
                Tap me for an alert
            </button>
            <button
                className="btn btn-secondary"
                onTap={() => navigation.navigate("Two", { message: "Hello, world!" })}
            >
                Go to next screen
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

export default ScreenOne;