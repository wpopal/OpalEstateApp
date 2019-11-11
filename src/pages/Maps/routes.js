import {createStackNavigator} from 'react-navigation-stack';
import {Platform} from 'react-native';

import {
  setHiddenHeaderLayout,
  setDefaultHeaderLayout,
} from '../../routes/headerUtils';

import Map from './containers/MapView';
import Search from './components/Search';
import Detail from './components/Detail';
import Setting from './components/Setting';

export const ROUTE_NAMES = {
  MAP: 'MAP',
  DETAIL: 'DETAIL',
  SEARCH: 'SEARCH',
  SETTING: 'SETTING',
};

const RootStack = createStackNavigator(
  {
    [ROUTE_NAMES.MAP]: {
      screen: Map,
      navigationOptions: ({navigation}) => setHiddenHeaderLayout(navigation),
    },
    [ROUTE_NAMES.DETAIL]: {
      screen: Detail,
      navigationOptions: ({navigation}) => setHiddenHeaderLayout(navigation),
    },
    [ROUTE_NAMES.SEARCH]: {
      screen: Search,
      navigationOptions: ({navigation}) => setHiddenHeaderLayout(navigation),
    },
    [ROUTE_NAMES.SETTING]: {
      screen: Setting,
      navigationOptions: ({navigation}) => setHiddenHeaderLayout(navigation),
    },
  },
  {
    initialRouteName: ROUTE_NAMES.MAP,
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
