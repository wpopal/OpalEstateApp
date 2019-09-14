import {createStackNavigator} from 'react-navigation-stack';
import {Platform} from 'react-native';

import {
  setHiddenHeaderLayout,
  setDefaultHeaderLayout,
} from '~/routes/headerUtils';

import Home from './ssssss';

export const ROUTE_NAMES = {
  HOME: 'HOME',
};

const RootStack = createStackNavigator(
  {
    [ROUTE_NAMES.HOME]: {
      screen: Home,
      navigationOptions: ({navigation}) =>
        setDefaultHeaderLayout(
          navigation,
          'Bon Appetit!',
          'Modesta-Script',
          27,
        ),
    },
  },
  {
    initialRouteName: ROUTE_NAMES.HOME,
    mode: Platform.OS === 'ios' ? 'card' : 'modal',
    headerMode: 'screen',
  },
);

RootStack.navigationOptions = ({navigation}) => {
  const tabBarVisible = navigation.state.ssssss <= 0;

  return {
    tabBarVisible,
  };
};

export default RootStack;
