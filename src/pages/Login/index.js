// @flow

import React, {Component} from 'react';
import {StatusBar, Animated, Image, View, Text} from 'react-native';

import styled from 'styled-components';
import {withNavigation} from 'react-navigation';
import SignUpComponent from './components/SignUp';
import LoginComponent from './components/Login';

import appStyles from '~/styles';

const Container = styled(View)`
  flex: 1;
  background-color: #fff;
`;

const Wrapper = styled(View)`
  width: 100%;
  height: ${({theme}) => theme.metrics.getHeightFromDP('100%') - 20}px;
  flex-direction: column;
  margin-top: ${StatusBar.currentHeight + 30}px;
  justify-content: space-between;
  align-items: center;
`;

const ContentWrapper = styled(View)`
  width: ${({theme}) => theme.metrics.getWidthFromDP('100%')}px;
  height: ${({theme}) => theme.metrics.getHeightFromDP('100%')}px;
`;

const Title = styled(Text)`
  font-family: Modesta-Script;
  color: ${({theme}) => theme.colors.defaultWhite};
  font-size: ${({theme}) => theme.metrics.getWidthFromDP('11.5%')}px;
`;

const TitleWrapper = styled(View)`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-vertical: ${({theme}) => theme.metrics.getHeightFromDP('8%')}px;
`;

const BackgroundImage = styled(Image).attrs({
  source: {uri: 'login'},
  resizeMode: 'cover',
})`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const NavigationTitleWrapper = styled(View)`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${({theme}) => 2 * theme.metrics.extraLargeSize}px;
`;

const MAX_FONT_SIZE = appStyles.metrics.getWidthFromDP('6.5%');
const MIN_FONT_SIZE = appStyles.metrics.getWidthFromDP('4%');

const LAYOUTS = [
  {
    Layout: LoginComponent,
    id: 'login',
  },
  {
    Layout: SignUpComponent,
    id: 'signup',
  },
];

class Login extends Component {
  _loginFontSize: Object = new Animated.Value(1);
  _signUpFontSize: Object = new Animated.Value(0);
  _flatListRef: Object = {};

  state = {
    isBackgroundImageLoaded: true,
  };

  onClickLoginButton = (): void => {
    Animated.parallel([
      Animated.timing(this._loginFontSize, {
        toValue: 1,
        duration: 200,
      }),
      Animated.timing(this._signUpFontSize, {
        toValue: 0,
        duration: 200,
      }),
    ]).start(
      this._flatListRef.scrollToIndex({
        animated: true,
        index: 0,
      }),
    );
  };

  onClickSignUpButton = (): void => {
    Animated.parallel([
      Animated.timing(this._loginFontSize, {
        toValue: 0,
        duration: 200,
      }),
      Animated.timing(this._signUpFontSize, {
        toValue: 1,
        duration: 200,
      }),
    ]).start(
      this._flatListRef.scrollToIndex({
        animated: true,
        index: 1,
      }),
    );
  };

  onLoadBackgroundImage = (): void => {
    this.setState({
      isBackgroundImageLoaded: true,
    });
  };

  renderContent = (): Object => (
    <ContentWrapper>
      <LoginComponent />
    </ContentWrapper>
  );

  render() {
    const {isBackgroundImageLoaded} = this.state;

    return (
      <Container>
        <StatusBar
          backgroundColor="transparent"
          barStyle="light-content"
          translucent
          animated
        />
        <Wrapper>
          <NavigationTitleWrapper>
            <Animated.Text
              style={{
                textAlign: 'center',
                paddingBottom: appStyles.metrics.getHeightFromDP('3%'),
                paddingRight: appStyles.metrics.getHeightFromDP('4%'),
                paddingTop: appStyles.metrics.getHeightFromDP('1%'),
                fontFamily: 'Roboto-Bold',
                color: this._loginFontSize.interpolate({
                  inputRange: [0, 1],
                  outputRange: [
                    appStyles.colors.black,
                    appStyles.colors.defaultWhite,
                  ],
                  extrapolate: 'clamp',
                }),
                fontSize: this._loginFontSize.interpolate({
                  inputRange: [0, 1],
                  outputRange: [MIN_FONT_SIZE, MAX_FONT_SIZE],
                  extrapolate: 'clamp',
                }),
              }}>
              Log in
            </Animated.Text>
            <Text
              activeOpacity={2}
              style={{
                textAlign: 'center',
                color: '#aaa',
              }}>
              Where to share travel experiences, adventure and interesting
              experiences on adventure routes.
            </Text>
          </NavigationTitleWrapper>
          {this.renderContent()}
        </Wrapper>
      </Container>
    );
  }
}

export default withNavigation(Login);
