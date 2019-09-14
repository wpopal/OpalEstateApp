// @flow

import { Platform, StatusBar } from 'react-native';

import CONSTANTS from '~/utils/CONSTANTS';
import appStyles from '~/styles';

const hiddenProps = {
  [CONSTANTS.NAVIGATION_PARAM_HEADER_HAS_DATA_STYLE]: {
    headerTransparent: true,
    headerStyle: {
      backgroundColor: 'transparent',
      borderBottomWidth: 0,
    },
  },
  [CONSTANTS.NAVIGATION_PARAM_HEADER_LOADING_STYLE]: {
    headerTintColor: appStyles.colors.primaryColor,
    headerTransparent: true,
    headerStyle: {
      backgroundColor: 'transparent',
      borderBottomWidth: 0,
    },
  },
};

export const handleHiddenHeaderStyle = (
  navigation: Object,
  loading: boolean,
  error: boolean,
): void => {
  const hasLoadingHeaderStyleParam = navigation.getParam(
    CONSTANTS.NAVIGATION_PARAM_HEADER_LOADING_STYLE,
    false,
  );

  const hasHasDataHeaderStyleParam = navigation.getParam(
    CONSTANTS.NAVIGATION_PARAM_HEADER_HAS_DATA_STYLE,
    false,
  );

  if (!hasLoadingHeaderStyleParam && loading) {
    navigation.setParams({
      [CONSTANTS.NAVIGATION_PARAM_HEADER_LOADING_STYLE]: true,
      [CONSTANTS.NAVIGATION_PARAM_HEADER_HAS_DATA_STYLE]: false,
    });
  }

  if (!hasHasDataHeaderStyleParam && !loading && !error) {
    navigation.setParams({
      [CONSTANTS.NAVIGATION_PARAM_HEADER_HAS_DATA_STYLE]: true,
      [CONSTANTS.NAVIGATION_PARAM_HEADER_LOADING_STYLE]: false,
    });
  }
};

const getHiddenProps = (navigation: Object): Object => {
  const { params } = navigation.state;

  let props = {
    headerTintColor: appStyles.colors.primaryColor,
    headerTransparent: true,
    headerStyle: {
      backgroundColor: 'transparent',
      borderBottomWidth: 0,
    },
  };

  if (!!params && params[CONSTANTS.NAVIGATION_PARAM_HEADER_LOADING_STYLE]) {
    props = hiddenProps[CONSTANTS.NAVIGATION_PARAM_HEADER_LOADING_STYLE];
  }

  if (!!params && params[CONSTANTS.NAVIGATION_PARAM_HEADER_HAS_DATA_STYLE]) {
    props = hiddenProps[CONSTANTS.NAVIGATION_PARAM_HEADER_HAS_DATA_STYLE];
  }

  return props;
};

export const setHiddenHeaderLayout = (navigation: Object): Object => {
  const props = getHiddenProps(navigation);

  return {
    headerTintColor: appStyles.colors.defaultWhite,
    ...props,
    headerBackTitle: null,
    ...Platform.select({
      android: {
        headerStyle: {
          marginTop: StatusBar.currentHeight,
        },
      },
    }),
  };
};

export const setDefaultHeaderLayout = (
  navigation: Object,
  title: string,
  fontFamily: string = 'CircularStd-Medium',
  fontSize: ?number,
): Object => ({
  title,
  headerTitleStyle: {
    fontSize: fontSize || appStyles.metrics.navigationHeaderFontSize,
    color: appStyles.colors.defaultWhite,
    fontWeight: undefined,
    fontFamily,
  },
  headerTintColor: appStyles.colors.defaultWhite,
  headerStyle: {
    backgroundColor: appStyles.colors.primaryColor,
    borderBottomWidth: 0,
  },
  ...Platform.select({
    android: {
      headerStyle: {
        backgroundColor: appStyles.colors.primaryColor,
        elevation: title === 'Near You' ? 0 : 4,
        marginTop: StatusBar.currentHeight,
      },
    },
  }),
  headerBackTitle: null,
  borderBottomWidth: 0,
});
