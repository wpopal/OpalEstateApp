// @flow

import React, {Component} from 'react';
import {
  TouchableOpacity,
  Animated,
  View,
  Text,
  Dimensions,
  ScrollView,
} from 'react-native';

import styled from 'styled-components';
import Input from './Input';
import LinearGradient from 'react-native-linear-gradient';
import {withNavigation} from 'react-navigation';
import {ROUTE_NAMES} from '../routes';
import {updateUser} from '../../../../database/allSchemas';
import {Base_url} from '../../../../config/setting';
const {height: viewportHeight} = Dimensions.get('window');
import RNRestart from 'react-native-restart';
import AppText from '../../../Text-i18n';
const Container = styled(View)`
  width: 100%;
  height: 100%;
  padding-right: 10%;
  padding-left: 10%;
  padding-bottom: 20%;
  justify-content: space-around;
  align-items: center;
`;

const TEXTERR = styled(Text)`
  color: #6923e7;
  font-family: Roboto-Bold;
`;

const SocialButtonWrapper = styled(TouchableOpacity)`
  width: 100%;
  height: ${(viewportHeight / 100) * 8}px;
  border: solid 1px #e5e5e5;
  background-color: #0083ff;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  flex-direction: row;
  padding-left: 4%;
  justify-content: center;
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
  justify-content: center;
  align-items;
`;

const ButtonText = styled(Text)`
  color: #fff;
  font-family: CircularStd-Bold;
  font-size: 15px;
`;
var data = {
  Email: '',
  Password: '',
};

class LoginComponent extends Component {
  _emailInputFieldAnimation = new Animated.Value(0);
  _passwordInputFieldAnimation = new Animated.Value(0);
  _loginButtonAnimation = new Animated.Value(0);
  _loginFacebookButtonAnimation = new Animated.Value(0);
  _loginGooglePlusButtonAnimation = new Animated.Value(0);
  _forgotPasswordTextAnimation = new Animated.Value(0);

  constructor(props: Props) {
    super(props);
  }
  state = {
    errorLog: '',
  };

  componentDidMount() {
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

  async Clicklogin() {
    const posts = await fetch(Base_url + '/wp-json/jwt-auth/v1/token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: data.Email,
        password: data.Password,
      }),
    })
      .then(response => response.json())
      .catch(errer => {
        console.log('errer', errer);
      });
    console.log('posts.token', posts);
    if (posts.token) {
      this.CheckToken(posts);
    } else {
      this.setState({errorLog: 'LOGIN_ERROR_NAMEORPASS'});
    }
  }

  async CheckToken(data) {
    console.log('data', data);
    const x = data.token;
    await fetch(Base_url + '/wp-json/jwt-auth/v1/token/validate', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + x,
      },
    }).then(response => {
      this.setToken(data);
    });
  }

  async setToken(data) {
    console.log('data', data);
    data.user_role = data.user_role.toString();
    await updateUser(data)
      .then(item => {
        setTimeout(function() {
          RNRestart.Restart();
        }, 2000);
      })
      .catch(error => {
        console.log('error !', error);
      });
  }

  renderInput = (
    placeholder: string,
    iconName: string,
    type: string,
    style: Object,
  ): Object => {
    return (
      <Input
        placeholder={placeholder}
        iconName={iconName}
        type={type}
        onChange={text => this.setInPut(placeholder, text)}
      />
    );
  };

  setInPut(placeholder, text) {
    if (placeholder === 'E-mail') {
      data.Email = text;
    } else {
      data.Password = text;
    }
  }

  renderForgotPasswordText = (): Object => {
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
    return (
      <SocialButtonsContainer>
        <SocialButtonWrapper
          onPress={() =>
            this.props.navigation.navigate(ROUTE_NAMES.MAIN_STACK)
          }>
          <Text
            style={{
              color: '#fff',
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
    return (
      <Container>
        <ScrollView>
          <View
            style={{
              height: '60%',
              minHeight: 350,
              width: '100%',
              borderRadius: 15,
              backgroundColor: '#fff',
              padding: 30,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.18,
              shadowRadius: 1.0,

              elevation: 1,
            }}>
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
            <View>
              {
                (this.state.errorLog = '' ? (
                  <View />
                ) : (
                  <AppText
                    style={{color: 'rgba(204,37,0,0.85)'}}
                    i18nKey={this.state.errorLog}
                  />
                ))
              }
            </View>
            <View
              style={{
                backgroundColor: '#ccc',
                flexDirection: 'row',
                marginBottom: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <AppText i18nKey={'DONE_ACC'}>Don’t have an account?</AppText>
              {this.renderSignUp()}
            </View>
            <Button
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                height: 55,
              }}
              onPress={() => {
                this.Clicklogin();
              }}>
              <LinearGradient
                start={{
                  x: 0,
                  y: 0,
                }}
                end={{
                  x: 1,
                  y: 0,
                }}
                colors={['#a685e7', '#9733e7', '#6923E7']}
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  height: 55,
                }}>
                <ButtonText>LOGIN</ButtonText>
              </LinearGradient>
            </Button>
            {this.renderForgotPasswordText()}
          </View>
          <View
            style={{
              marginTop: 10,
              height: '20%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#aaa'}}>or</Text>
            {this.renderSocialButtons()}
          </View>
        </ScrollView>
      </Container>
    );
  }
}

export default withNavigation(LoginComponent);
