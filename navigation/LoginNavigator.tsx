import LoginScreen from "../screens/LoginScreen";
import TabBarIcon from "./TabBarIcon";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LoginTabParamList } from "../types";

const LoginTab = createBottomTabNavigator<LoginTabParamList>();

export default function LoginNavigator() {
  return (
    <LoginTab.Navigator>
      <LoginTab.Screen
        name="LoginForm"
        component={LoginScreen}
        options={{
          title: "Login",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      {/* <LoginTab.Screen name="Signup" component={SignupScreen} /> */}
    </LoginTab.Navigator>
  );
}
