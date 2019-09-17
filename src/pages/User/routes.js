import {createStackNavigator} from 'react-navigation-stack';
import {Platform} from 'react-native';

import {
  setHiddenHeaderLayout,
  setDefaultHeaderLayout,
} from '~/routes/headerUtils';

import User from './index';

export const ROUTE_NAMES = {
  USER: 'USER',
};

const RootStack = createStackNavigator(
  {
    [ROUTE_NAMES.USER]: {
      screen: User,
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
  const tabBarVisible = navigation.state.user <= 0;

  return {
    tabBarVisible,
  };
};

export default RootStack;
