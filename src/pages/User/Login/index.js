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

// GoogleSignin.configure({
//   scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
//   webClientId: "505447290427-8h3uc0kp5h84q1diij9e2nan8gfvbatb.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
//   offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
//   hostedDomain: '', // specifies a hosted domain restriction
//   loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
//   forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
//   accountName: '', // [Android] specifies an account name on the device that should be used
// });


class Login extends Component {
  _loginFontSize: Object = new Animated.Value(1);
  _signUpFontSize: Object = new Animated.Value(0);
  _flatListRef: Object = {};

  state = {
    isBackgroundImageLoaded: true,
  };

  // signIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     console.log('userInfo', userInfo);
  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       console.log('1', error);
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       console.log('1', error);
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       console.log('1', error);
  //     } else {
  //       console.log('1', error);
  //     }
  //   }
  // };

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
