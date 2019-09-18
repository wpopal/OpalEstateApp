// @flow

import React, {Component} from 'react';
import {TouchableOpacity, Animated, View, Text} from 'react-native';

import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Input from './Input';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faFacebookF, faGoogle} from '@fortawesome/free-brands-svg-icons';
import appStyles from '~/styles';
import LinearGradient from 'react-native-linear-gradient';
import {withNavigation} from 'react-navigation';
import {ROUTE_NAMES} from '~/routes';

const Container = styled(View)`
  width: 100%;
  height: 100%;
  padding-right: 10%;
  padding-left: 10%;
  padding-bottom: 20%;
  justify-content: space-around;
  align-items: center;
`;

const ButtonIconFB = styled(Icon).attrs(({iconName}) => ({
  name: iconName,
  size: 24,
}))`
  height: 100%;
  width: 100%;
  color: ${({theme}) => theme.colors.defaultWhite};
  margin-left: ${({iconName}) => (iconName === 'facebook' ? -4 : 0)}px;
  background-color: ${({iconName}) =>
    iconName === 'facebook'
      ? appStyles.colors.blue
      : appStyles.colors.googlePlus};
`;

const TEXTERR = styled(Text)`
  color: #ffbf35;
  font-family: Roboto-Bold;
`;

const SocialButtonWrapper = styled(TouchableOpacity)`
  width: 45%;
  height: ${({theme}) => theme.metrics.getHeightFromDP('8%')}px;
  border: solid 1px #e5e5e5;
  border-top-right-radius: 50px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  flex-direction: row;
  padding-left: 4%;
  justify-content: flex-start;
  align-items: center;
`;

const SocialButtonsContainer = styled(View)`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

const ForgotPasswordContainer = styled(Animated.View)`
  justify-content: center;
  align-items: center;
`;

const ForgotPasswordWrapper = styled(View)`
  flex-direction: row;
`;

const RecoverTextButton = styled(TouchableOpacity)`
  margin-left: 4px;
`;
const Button = styled(TouchableOpacity)`
  height: ${({theme}) => theme.metrics.getHeightFromDP('6%')}px;
  justify-content: center;
  align-items;
`;

const ButtonText = styled(Text)`
  color: ${({theme}) => theme.colors.defaultWhite};
  font-family: CircularStd-Bold;
  font-size: ${({theme}) => theme.metrics.largeSize}px;
`;
const createAnimationStyle = (animation: Object): Object => {
  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-5, 0],
  });

  return {
    opacity: animation,
    transform: [
      {
        translateY,
      },
    ],
  };
};

class LoginComponent extends Component {
  _emailInputFieldAnimation = new Animated.Value(0);
  _passwordInputFieldAnimation = new Animated.Value(0);
  _loginButtonAnimation = new Animated.Value(0);
  _loginFacebookButtonAnimation = new Animated.Value(0);
  _loginGooglePlusButtonAnimation = new Animated.Value(0);
  _forgotPasswordTextAnimation = new Animated.Value(0);

  componentDidMount() {
    console.log('this.props.navigation', this.props.navigation);

    Animated.stagger(100, [
      Animated.timing(this._emailInputFieldAnimation, {
        toValue: 1,
        duration: 350,
      }),
      Animated.timing(this._passwordInputFieldAnimation, {
        toValue: 1,
        duration: 350,
      }),
      Animated.timing(this._loginButtonAnimation, {
        toValue: 1,
        duration: 350,
      }),
      Animated.timing(this._loginFacebookButtonAnimation, {
        toValue: 1,
        duration: 350,
      }),
      Animated.timing(this._loginGooglePlusButtonAnimation, {
        toValue: 1,
        duration: 350,
      }),
      Animated.timing(this._forgotPasswordTextAnimation, {
        toValue: 1,
        duration: 350,
      }),
    ]).start();
  }

  renderInput = (
    placeholder: string,
    iconName: string,
    type: string,
    style: Object,
  ): Object => {
    console.log('style', style);
    return <Input placeholder={placeholder} iconName={iconName} type={type} />;
  };

  renderForgotPasswordText = (): Object => {
    const forgotPasswordTextAnimationStyle = createAnimationStyle(
      this._forgotPasswordTextAnimation,
    );

    return (
      <ForgotPasswordContainer style={{marginTop: 10}}>
        <ForgotPasswordWrapper>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('FORGOT')}>
            <TEXTERR>Forgot Password?</TEXTERR>
          </TouchableOpacity>
        </ForgotPasswordWrapper>
      </ForgotPasswordContainer>
    );
  };
  renderSignUp = (): Object => {
    const forgotPasswordTextAnimationStyle = createAnimationStyle(
      this._forgotPasswordTextAnimation,
    );

    return (
      <ForgotPasswordContainer>
        <ForgotPasswordWrapper>
          <RecoverTextButton
            onPress={() => this.props.navigation.navigate('SIGNUP')}>
            <TEXTERR>Sign up</TEXTERR>
          </RecoverTextButton>
        </ForgotPasswordWrapper>
      </ForgotPasswordContainer>
    );
  };

  renderSocialButtons = (): Object => {
    const loginFacebookButtonAnimationStyle = createAnimationStyle(
      this._loginFacebookButtonAnimation,
    );

    const loginGooglePlusButtonAnimationStyle = createAnimationStyle(
      this._loginGooglePlusButtonAnimation,
    );

    return (
      <SocialButtonsContainer>
        <SocialButtonWrapper
          onPress={() =>
            this.props.navigation.navigate(ROUTE_NAMES.MAIN_STACK)
          }>
          <View
            style={{
              height: '75%',
              aspectRatio: 1 / 1,
              backgroundColor: '#0083ff',
              borderTopRightRadius: 50,
              borderTopLeftRadius: 50,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FontAwesomeIcon
              style={{color: '#fff'}}
              size={20}
              icon={faFacebookF}
            />
          </View>
          <Text
            style={{
              paddingLeft: 10,
              fontFamily: 'Roboto-Bold',
            }}>
            Facebook
          </Text>
        </SocialButtonWrapper>

        <SocialButtonWrapper
          onPress={() =>
            this.props.navigation.navigate(ROUTE_NAMES.MAIN_STACK)
          }>
          <View
            style={{
              height: '75%',
              aspectRatio: 1 / 1,
              backgroundColor: '#c93d36',
              borderTopRightRadius: 50,
              borderTopLeftRadius: 50,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FontAwesomeIcon
              style={{color: '#fff'}}
              size={20}
              icon={faGoogle}
            />
          </View>
          <Text
            style={{
              paddingLeft: 10,
              fontFamily: 'Roboto-Bold',
            }}>
            Facebook
          </Text>
        </SocialButtonWrapper>
      </SocialButtonsContainer>
    );
  };

  render() {
    const emailAnimationStyle = createAnimationStyle(
      this._emailInputFieldAnimation,
    );
    const passwordAnimationStyle = createAnimationStyle(
      this._passwordInputFieldAnimation,
    );
    const loginButtonAnimationStyle = createAnimationStyle(
      this._loginButtonAnimation,
    );

    return (
      <Container>
        <View style={{width: '100%'}}>
          <Animated.View>
            {this.renderInput('E-mail', 'envelope', 'emailAddress', {
              backgroundColor: '#fff',
              border: 'solid 1px #e5e5e5',
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            })}
          </Animated.View>
          <Animated.View>
            {this.renderInput('Password', 'unlock-alt', 'password', {
              backgroundColor: '#fff',
              border: 'solid 1px #e5e5e5',
            })}
          </Animated.View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}>
            <Text>Don’t have an account?</Text>
            {this.renderSignUp()}
          </View>
          <Animated.View style={{width: '100%'}}>
            <Button
              style={{
                marginTop: 40,
                backgroundColor: '#9900cc',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                height: 60,
              }}
              onPress={() =>
                this.props.navigation.navigate(ROUTE_NAMES.MAIN_STACK)
              }>
              <LinearGradient
                start={{
                  x: 0,
                  y: 0,
                }}
                end={{
                  x: 1,
                  y: 0,
                }}
                colors={['#ffbf35', '#ffa538', '#F67254']}
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  height: 60,
                }}>
                <ButtonText>LOGIN</ButtonText>
              </LinearGradient>
            </Button>
          </Animated.View>
          {this.renderForgotPasswordText()}
        </View>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#aaa'}}>or</Text>
          {this.renderSocialButtons()}
        </View>
      </Container>
    );
  }
}

export default withNavigation(LoginComponent);
