// @flow

import React from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  createAppContainer,
} from 'react-navigation';

import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import MainRoutes from '../pages/Main/routes';
import index from '../pages/Intro';
import mapMain from '../pages/Maps';
import user from '../pages/User/routes';

import isEqualsOrLargestThanIphoneX from '~/utils/isEqualsOrLargestThanIphoneX';
import appStyles from '~/styles';

export const ROUTE_NAMES = {
  HOME: 'HOME',
  INDEX: 'INDEX',
  MAPMAIN: 'MAPMAIN',
  USER: 'USER',

};

type Props = {
  tintColor: string,
};

const getTabIcon = (icon: string): Object => ({tintColor}: Props) => {
  return <Icon color={tintColor} name={icon} size={25}/>;
};

const ApplicationTabs = createMaterialTopTabNavigator(
  {
    [ROUTE_NAMES.HOME]: {
      screen: MainRoutes,
      navigationOptions: {
        tabBarIcon: getTabIcon('home'),
      },
    },
    [ROUTE_NAMES.MAPMAIN]: {
      screen: mapMain,
      navigationOptions: {
        tabBarIcon: getTabIcon('map-search'),
      },
    },
    [ROUTE_NAMES.INDEX]: {
      screen: index,
      navigationOptions: {
        tabBarIcon: getTabIcon('magnify'),
      },
    },
    [ROUTE_NAMES.USER]: {
      screen: user,
      navigationOptions: {
        tabBarIcon: getTabIcon('account'),
      },
    },
  },
  {
    initialRouteName: ROUTE_NAMES.HOME,
    tabBarPosition: 'bottom',
    optimizationsEnabled: true,
    animationEnabled: true,
    swipeEnabled: false,
    lazy: true,
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      style: {
        paddingBottom: isEqualsOrLargestThanIphoneX() ? 30 : 0,
        backgroundColor: appStyles.colors.white,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 10,
      },
      indicatorStyle: {
        backgroundColor: 'transparent',
      },
      inactiveTintColor: appStyles.colors.gray,
      activeTintColor: appStyles.colors.violet,
    },
  },
);

const AppContainer = createAppContainer(ApplicationTabs);

export default AppContainer;
