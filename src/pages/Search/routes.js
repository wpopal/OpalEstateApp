import {createStackNavigator} from 'react-navigation-stack';
import {Platform} from 'react-native';

import {
  setHiddenHeaderLayout,
  setDefaultHeaderLayout,
} from '~/routes/headerUtils';

import Intro from './index';

export const ROUTE_NAMES = {
  Intro: 'Intro',
};

const RootStack = createStackNavigator(
  {
    [ROUTE_NAMES.Intro]: {
      screen: Intro,
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
  const tabBarVisible = navigation.state.index <= 0;

  return {
    tabBarVisible,
  };
};

export default RootStack;
