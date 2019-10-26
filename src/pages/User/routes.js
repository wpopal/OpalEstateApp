import {createStackNavigator} from 'react-navigation-stack';
import {Platform} from 'react-native';

import {
  setHiddenHeaderLayout,
  setDefaultHeaderLayout,
} from '../../routes/headerUtils';

import User from './index';
import Login from './Login';
import SignUp from './Login/components/SignUp';
import ForgotPass from './Login/components/forgotPassword';
import Profile from './components/profile';


export const ROUTE_NAMES = {
  USER: 'USER',
  LOGIN: 'LOGIN',
  SIGNUP: 'SIGNUP',
  FORGOT: 'FORGOT',
  PRO_FILE: 'PRO_FILE',
};

const RootStack = createStackNavigator(
  {
    [ROUTE_NAMES.USER]: {
      screen: User,
      navigationOptions: ({navigation}) =>
        setHiddenHeaderLayout(
          navigation,
          'Opal Estate App!',
          'Modesta-Script',
          27,
        ),
    },
    [ROUTE_NAMES.LOGIN]: {
      screen: Login,
      navigationOptions: ({navigation}) =>
        setHiddenHeaderLayout(
          navigation,
          'Opal Estate App!',
          'Modesta-Script',
          27,
        ),
    },
    [ROUTE_NAMES.SIGNUP]: {
      screen: SignUp,
      navigationOptions: ({navigation}) => setHiddenHeaderLayout(navigation),
    },
    [ROUTE_NAMES.FORGOT]: {
      screen: ForgotPass,
      navigationOptions: ({navigation}) => setHiddenHeaderLayout(navigation),
    },
    [ROUTE_NAMES.PRO_FILE]: {
      screen: Profile,
      navigationOptions: ({navigation}) => setHiddenHeaderLayout(navigation),
    },
  },
  {
    initialRouteName: ROUTE_NAMES.USER,
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
