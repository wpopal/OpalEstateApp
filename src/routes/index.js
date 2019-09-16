import {createSwitchNavigator, createAppContainer} from 'react-navigation';

import MainStack from './mainStack';
import Intro from '~/pages/Intro';

export const ROUTE_NAMES = {
  MAIN_STACK: 'MAIN_STACK',
  INTRO: 'INTRO',
};

const InitialStack = createSwitchNavigator(
  {
    [ROUTE_NAMES.MAIN_STACK]: {
      screen: MainStack,
    },
    [ROUTE_NAMES.INTRO]: {
      screen: Intro,
    },
  },
  {
    initialRouteName: ROUTE_NAMES.MAIN_STACK,
  },
);

const AppContainer = createAppContainer(InitialStack);

export default AppContainer;
