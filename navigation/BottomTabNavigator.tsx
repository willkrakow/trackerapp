import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "../types";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import TabBarIcon from "./TabBarIcon";
import RecordsScreen from "../screens/RecordsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ChartScreen from "../screens/ChartScreen";
import NotesPage from "../screens/NotesScreen";
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
        name="Notes"
        component={NotesPage}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="water" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Records"
        component={RecordsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="document-attach" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Chart"
        component={ChartScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="bar-chart" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="settings" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
