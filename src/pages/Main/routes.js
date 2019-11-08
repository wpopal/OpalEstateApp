import {createStackNavigator} from 'react-navigation-stack';
import {Platform} from 'react-native';

import {
  setHiddenHeaderLayout,
} from '../../routes/headerUtils';

import Login from './index';
import Maps from './maps';

export const ROUTE_NAMES = {
  LOGIN: 'LOGIN',
  MAPS: 'MAPS',
};

const RootStack = createStackNavigator(
  {
    [ROUTE_NAMES.LOGIN]: {
      screen: Login,
      navigationOptions: ({navigation}) => setHiddenHeaderLayout(navigation),
    },
    [ROUTE_NAMES.MAPS]: {
      screen: Maps,
      navigationOptions: ({navigation}) => setHiddenHeaderLayout(navigation),
    },
  },
  {
    initialRouteName: ROUTE_NAMES.LOGIN,
    mode: Platform.OS === 'ios' ? 'card' : 'modal',
    headerMode: 'screen',
  },
);

RootStack.navigationOptions = ({navigation}) => {
  const tabBarVisible = navigation.state.index <= 0;

  return {
    tabBarVisible,
  };
};

export default RootStack;
