import {createSwitchNavigator, createAppContainer} from 'react-navigation';

import MainStack from './mainStack';
import Intro from '../pages/Search';
import User from '../pages/User';

export const ROUTE_NAMES = {
  MAIN_STACK: 'MAIN_STACK',
  INTRO: 'INTRO',
  USER: 'USER',

};

const InitialStack = createSwitchNavigator(
  {
    [ROUTE_NAMES.MAIN_STACK]: {
      screen: MainStack,
    },
    [ROUTE_NAMES.INTRO]: {
      screen: Intro,
    },
    [ROUTE_NAMES.USER]: {
      screen: User,
    },
  },
  {
    initialRouteName: ROUTE_NAMES.MAIN_STACK,
  },
);

const AppContainer = createAppContainer(InitialStack);

export default AppContainer;
