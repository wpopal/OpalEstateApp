// @flow

import React, {Component} from 'react';
import {
  View,
  Dimensions,
  Animated,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import styled from 'styled-components';
import ROUTE_NAMES from '../../../User/routes';
import {withNavigation} from 'react-navigation';
import Input from './Input';
import {NavigationActions} from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';

var {height} = Dimensions.get('window');

const Container = styled(View)`
  height: ${height};
  background-color: #fff;
  padding-top: ${StatusBar.currentHeight + 30}px;
`;
const TEXTERR = styled(Text)`
  color: #ffbf35;
  font-family: Roboto-Bold;
`;
const backAction = NavigationActions.back();

const NavigationTitleWrapper = styled(View)`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
`;
const RecoverTextButton = styled(TouchableOpacity)`
  margin-left: 4px;
`;
const ButtonText = styled(Text)`
  color: #fff;
  font-family: CircularStd-Bold;
`;
const Button = styled(TouchableOpacity)`
  justify-content: center;
  align-items;
  
`;

const MAX_FONT_SIZE = 20;
const MIN_FONT_SIZE = 10;

const renderInput = (
  placeholder: string,
  iconName: string,
  type: string,
): Object => (
  <Input placeholder={placeholder} iconName={iconName} type={type}/>
);

class forgotPass extends Component {
  _loginFontSize: Object = new Animated.Value(1);
  _signUpFontSize: Object = new Animated.Value(0);
  _flatListRef: Object = {};

  renderLogIn = (): Object => {
    return (
      <RecoverTextButton
        onPress={() => this.props.navigation.dispatch(backAction)}>
        <TEXTERR>Login</TEXTERR>
      </RecoverTextButton>
    );
  };

  render() {
    const {navigation} = this.props;
    return (
      <Container>
        <NavigationTitleWrapper>
          <Animated.Text
            style={{
              textAlign: 'center',
              fontFamily: 'Roboto-Bold',
              color: this._loginFontSize.interpolate({
                inputRange: [0, 1],
                outputRange: [
                  '#000',
                  '#000',
                ],
                extrapolate: 'clamp',
              }),
              fontSize: this._loginFontSize.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 30],
                extrapolate: 'clamp',
              }),
            }}>
            Forgot Password
          </Animated.Text>
          <Text
            activeOpacity={2}
            style={{
              textAlign: 'center',
              color: '#aaa',
            }}>
            Enter your email and will send you instructions on how to reset it.
          </Text>
        </NavigationTitleWrapper>
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#fff',
            padding: '10%',
          }}>
          {renderInput('E-mail', 'envelope', 'emailAddress')}
          <Button
            style={{
              marginTop: 15,
              backgroundColor: '#9900cc',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              height: 60,
            }}
            onPress={() => navigation.navigate(ROUTE_NAMES.USER)}>
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
              <ButtonText>SEND</ButtonText>
            </LinearGradient>
          </Button>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              marginTop: 20,
            }}>
            <Text>Already have an account?</Text>
            {this.renderLogIn()}
          </View>
        </View>
      </Container>
    );
  }
}

export default withNavigation(forgotPass);
