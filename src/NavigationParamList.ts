/**
 * Navigation params for each route in the app.
 */
export type MainStackParamList = {
  Home: {};
  Goals: {};
  Insights: {};
  Profile: {};
  GoalDetail: {
    goalId: string;
  };
};