// @flow

import React, {Component} from 'react';
import {TouchableOpacity, Animated, View, Text, Dimensions} from 'react-native';

import styled from 'styled-components';
import Input from './Input';
import {faFacebookF, faGoogle} from '@fortawesome/free-brands-svg-icons';
import LinearGradient from 'react-native-linear-gradient';
import {withNavigation} from 'react-navigation';
import {ROUTE_NAMES} from '../routes';
import {updateUser} from '../../../../database/allSchemas';

const {height: viewportHeight} = Dimensions.get('window');
import RNRestart from 'react-native-restart'; // Import package from node modules
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
  color: #ffbf35;
  font-family: Roboto-Bold;
`;

const SocialButtonWrapper = styled(TouchableOpacity)`
  width: 45%;
  height: ${(viewportHeight / 100) * 8}px;
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
    const posts = await fetch(
      'http://10.0.2.2/wordpress/latehome_free/wp-json/jwt-auth/v1/token',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.Email,
          password: data.Password,
        }),
      },
    )
      .then(response => response.json())
      .catch(errer => {
        console.log('errer', errer);
      });
    console.log('posts.token', posts.token);
    if (posts.token) {
      this.CheckToken(posts);
    }
  }

  async CheckToken(data) {
    console.log('data', data);
    const x = data.token;
    await fetch(
      'http://10.0.2.2/wordpress/latehome_free/wp-json/jwt-auth/v1/token/validate',
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + x,
        },
      },
    ).then(response => {
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
          <Button
            style={{
              marginTop: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              height: 60,
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
