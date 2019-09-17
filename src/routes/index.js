import {createSwitchNavigator, createAppContainer} from 'react-navigation';

import MainStack from './mainStack';
import Intro from '~/pages/Intro';
import MapMain from '~/pages/Maps';

export const ROUTE_NAMES = {
  MAIN_STACK: 'MAIN_STACK',
  INTRO: 'INTRO',
  MAPMAIN: 'MAPMAIN',
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
  },
  {
    initialRouteName: ROUTE_NAMES.MAIN_STACK,
  },
);

const AppContainer = createAppContainer(InitialStack);

export default AppContainer;
