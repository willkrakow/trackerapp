/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: 'home',
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: 'two',
            },
          },
          Records: {
            screens: {
              RecordsScreen: 'recordsscreen',
            }
          }
        },
      },
      Modal: 'modal',
      NotFound: '*',
      Loading: 'loading',
      Login: {
        screens: {
          LoginScreen: 'loginscreen',
          SignUpScreen: 'signupscreen',
        }
      }
    },
  },
};

export default linking;
