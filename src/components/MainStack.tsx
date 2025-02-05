import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";

import { HomeScreen } from "./screens/HomeScreen";
import { GoalsScreen } from "./screens/GoalsScreen";
import { InsightsScreen } from "./screens/InsightsScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { GoalDetailScreen } from "./screens/GoalDetailScreen";

const StackNavigator = stackNavigatorFactory();

export const MainStack = () => (
    <BaseNavigationContainer>
        <StackNavigator.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#6366F1",
                },
                headerTintColor: "#ffffff",
                headerShown: true,
            }}
        >
            <StackNavigator.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: "Nova" }}
            />
            <StackNavigator.Screen
                name="Goals"
                component={GoalsScreen}
                options={{ title: "My Goals" }}
            />
            <StackNavigator.Screen
                name="Insights"
                component={InsightsScreen}
                options={{ title: "Insights" }}
            />
            <StackNavigator.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ title: "Profile" }}
            />
            <StackNavigator.Screen
                name="GoalDetail"
                component={GoalDetailScreen}
                options={{ title: "Goal Details" }}
            />
        </StackNavigator.Navigator>
    </BaseNavigationContainer>
);