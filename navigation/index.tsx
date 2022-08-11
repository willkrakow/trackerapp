/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { AuthContext } from './auth';
import BottomTabNavigator from './BottomTabNavigator';
import LoginNavigator from './LoginNavigator';
import LoadingScreen from '../screens/LoadingScreen';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isAuthenticating, setIsAuthenticating] = React.useState(false);
  const [authError, setAuthError] = React.useState<string | null>(null);

  const authContext = React.useMemo(() => {
    return {
      isAuthenticated: isLoggedIn,
      authenticate: async () => {
        setIsAuthenticating(true);
        setAuthError(null);
        try {
          const authResult = await LocalAuthentication.authenticateAsync();
          setIsLoggedIn(authResult.success);
        } catch (e: any) {
          setAuthError(e);
        }
        setIsAuthenticating(false);
      },
      deauthenticate: async () => {
        setIsAuthenticating(true);
        setAuthError(null);
        try {
          setIsLoggedIn(false);
        } catch (e: any) {
          setAuthError(e);
        }
        setIsAuthenticating(false);
      }
    };
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={authContext}>
    <Stack.Navigator>
      {isAuthenticating && <Stack.Screen name="Loading" component={LoadingScreen} />}
      {isLoggedIn ? (
        <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="Login" component={LoginNavigator} options={{ headerShown: false }} />
      )}
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      {/* <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group> */}
    </Stack.Navigator>
    </AuthContext.Provider>
  );
}

