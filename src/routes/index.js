import {createSwitchNavigator, createAppContainer} from 'react-navigation';

import MainStack from './mainStack';
import Intro from '~/pages/Intro';
import MapMain from '~/pages/Maps';
import User from '~/pages/User';
import Login from '~/pages/Login';

export const ROUTE_NAMES = {
  MAIN_STACK: 'MAIN_STACK',
  INTRO: 'INTRO',
  MAPMAIN: 'MAPMAIN',
  USER: 'USER',
  LOGIN: 'LOGIN',
};

const InitialStack = createSwitchNavigator(
  {
    [ROUTE_NAMES.MAIN_STACK]: {
      screen: MainStack,
    },
    [ROUTE_NAMES.INTRO]: {
      screen: Intro,
    },
    [ROUTE_NAMES.MAPMAIN]: {
      screen: MapMain,
    },
    [ROUTE_NAMES.USER]: {
      screen: User,
    },
    [ROUTE_NAMES.LOGIN]: {
      screen: Login,
    },
  },
  {
    initialRouteName: ROUTE_NAMES.MAIN_STACK,
  },
);

const AppContainer = createAppContainer(InitialStack);

export default AppContainer;
