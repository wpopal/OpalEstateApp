import {createStackNavigator} from 'react-navigation-stack';
import {Platform} from 'react-native';

import {
  setDefaultHeaderLayout,
  setHiddenHeaderLayout,
} from '../../../routes/headerUtils';

import SignUp from './components/SignUp';
import Login from './components/Login';
import ForgotPass from './components/forgotPassword';

export const ROUTE_NAMES = {
  LOGIN: 'LOGIN',
  SIGNUP: 'SIGNUP',
  FORGOT: 'FORGOT',
};

const RootStack = createStackNavigator(
  {
    [ROUTE_NAMES.LOGIN]: {
      screen: () => <Login />,
      navigationOptions: ({navigation}) =>
        setDefaultHeaderLayout(navigation, 'LOGIN'),
    },
    [ROUTE_NAMES.SIGNUP]: {
      screen: () => <SignUp />,
      navigationOptions: ({navigation}) =>
        setDefaultHeaderLayout(navigation, 'SING UP'),
    },
    [ROUTE_NAMES.FORGOT]: {
      screen: () => <ForgotPass />,
      navigationOptions: ({navigation}) =>
        setDefaultHeaderLayout(navigation, 'RECOVERY PASSWORD'),
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
