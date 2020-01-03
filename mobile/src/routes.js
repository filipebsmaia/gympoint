import React from 'react';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './pages/SignIn';

import Checkins from './pages/Checkins';

import HelpOrderList from './pages/HelpOrder/ListOrder';
import HelpOrderViewer from './pages/HelpOrder/Viewer';
import NewHelpOrder from './pages/HelpOrder/New';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        App: createBottomTabNavigator(
          {
            Checkins,
            HelpOrder: {
              screen: createStackNavigator(
                {
                  HelpOrderList,
                  HelpOrderViewer,
                  NewHelpOrder,
                },
                {
                  defaultNavigationOptions: {
                    headerTransparent: true,
                    headerTintColor: '#FFF',
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                    },
                  },
                },
              ),
              navigationOptions: {
                tabBarVisible: true,
                tabBarLabel: 'Pedir ajuda',
                tabBarIcon: ({tintColor}) => (
                  <Icon name="live-help" size={20} color={tintColor} />
                ),
              },
            },
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#EE4E62',
              inactiveTintColor: '#999',
              style: {
                backgroundColor: '#fff',
                borderTopWidth: 0,
              },
            },
          },
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      },
    ),
  );
