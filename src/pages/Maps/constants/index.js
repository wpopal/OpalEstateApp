import {Dimensions, StatusBar, Platform} from 'react-native';
import apis from './api';

const {width, height} = Dimensions.get('window');
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const heightWithStatusBar = !StatusBar.currentHeight
  ? height - STATUSBAR_HEIGHT
  : height - StatusBar.currentHeight;

const googlePlaceToken = 'googlePlaceToken';

export {
  width,
  height,
  heightWithStatusBar,
  STATUSBAR_HEIGHT,
  googlePlaceToken,
  apis,
};
