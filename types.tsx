/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  Login: NavigatorScreenParams<LoginTabParamList | undefined>;
  Loading: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type LoginStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Home: undefined;
  TabTwo: undefined;
  Water: undefined;
  Test: undefined;
};

export type LoginTabParamList = {
  Signup: undefined;
  Login: undefined;
}

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;


export type LoginTabScreenProps<Screen extends keyof LoginTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<LoginTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;


export type NewRecord<T> = Omit<T, 'id' | 'created_at'>;