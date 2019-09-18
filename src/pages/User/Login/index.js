// @flow

import React, {Component} from 'react';
import {StatusBar, Animated, View, Dimensions, Text} from 'react-native';

import styled from 'styled-components';
import SignUpComponent from './components/SignUp';
import LoginComponent from './components/Login';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Creators as LoginCreators} from '~/store/ducks/login';
const {height: viewportHeight} = Dimensions.get('window');
const Container = styled(View)`
  flex: 1;
  background-color: #fff;
`;

const Wrapper = styled(View)`
  width: 100%;
  height: ${viewportHeight - 20}px;
  flex-direction: column;
  margin-top: ${StatusBar.currentHeight + 30}px;
  justify-content: space-between;
  align-items: center;
`;

const ContentWrapper = styled(View)``;

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
      <LoginComponent/>
    </ContentWrapper>
  );

  render() {
    return (
      <Container>
        <StatusBar
          backgroundColor="transparent"
          barStyle="light-content"
          translucent
          animated
        />
        <Wrapper>
          <Animated.Text
            style={{
              textAlign: 'center',
              paddingBottom: (viewportHeight / 100) * 3,
              paddingRight: (viewportHeight / 100) * 4,
              paddingTop: viewportHeight / 100,
              fontFamily: 'Roboto-Bold',
              color: this._loginFontSize.interpolate({
                inputRange: [0, 1],
                outputRange: ['#000', '#000'],
                extrapolate: 'clamp',
              }),
              fontSize: this._loginFontSize.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 30],
                extrapolate: 'clamp',
              }),
            }}>
            Log in
          </Animated.Text>
          {this.renderContent()}
        </Wrapper>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  loginRequest: state.login,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(LoginCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
