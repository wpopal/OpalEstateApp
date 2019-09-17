import {createStackNavigator} from 'react-navigation-stack';
import {Platform} from 'react-native';

import {
  setHiddenHeaderLayout,
  setDefaultHeaderLayout,
} from '~/routes/headerUtils';

import map from './index';

export const ROUTE_NAMES = {
  MAPMAIN: 'MAPMAIN',
};

const RootStack = createStackNavigator(
  {
    [ROUTE_NAMES.MAPMAIN]: {
      screen: map,
      navigationOptions: ({navigation}) =>
        setDefaultHeaderLayout(
          navigation,
          'Opal Estate App!',
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
  const tabBarVisible = navigation.state.maps <= 0;

  return {
    tabBarVisible,
  };
};

export default RootStack;
