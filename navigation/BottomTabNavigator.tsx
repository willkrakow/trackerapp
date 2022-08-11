import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootTabParamList, RootTabScreenProps } from "../types";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import HomeScreen from "../screens/HomeScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import { Pressable } from "react-native";
import TabBarIcon from "./TabBarIcon";
import { FontAwesome } from "@expo/vector-icons";
import WaterScreen from "../screens/WaterScreen";
import { PatchDemo } from "../components/SkiaTest";
/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Water"
        component={WaterScreen}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="water" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Test"
        component={PatchDemo}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="water" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}
