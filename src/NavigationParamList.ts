/**
 * Navigation params for each route in the app.
 */
export type MainStackParamList = {
  Home: {}; // No parameters for HomeScreen
  Goals: {}; // No parameters for GoalsScreen
  Insights: {}; // No parameters for InsightsScreen
  Profile: {}; // No parameters for ProfileScreen
  GoalDetail: {
    goalId: string; // GoalDetailScreen expects a `goalId` parameter
  };
  One: {}; // No parameters for ScreenOne
  Two: {
    message: string; // ScreenTwo expects a `message` parameter
  };
};