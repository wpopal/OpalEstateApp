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

import Input from './Input';
import {NavigationActions} from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';

var {height} = Dimensions.get('window');
const ButtonText = styled(Text)`
  color: #fff;
  font-family: CircularStd-Bold;
`;
const Container = styled(View)`
  height: ${height};
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding-top: ${StatusBar.currentHeight + 30}px;
`;
const TEXTERR = styled(Text)`
  color: #ffbf35;
  font-family: Roboto-Bold;
`;
const Button = styled(TouchableOpacity)`
  justify-content: center;
  align-items;
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

const renderInput = (
  placeholder: string,
  iconName: string,
  type: string,
): Object => (
  <Input placeholder={placeholder} iconName={iconName} type={type} />
);

class SignUp extends Component {
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
    return (
      <Container>
        <NavigationTitleWrapper>
          <Animated.Text
            style={{
              textAlign: 'center',
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
            Register
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
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#fff',
            padding: '15%',
          }}>
          {renderInput('Name', 'user', 'name')}
          {renderInput('E-mail', 'envelope', 'emailAddress')}
          {renderInput('Password', 'unlock-alt', 'password')}
          {renderInput('Confirm Password', 'unlock-alt', 'password')}
          <Button
            style={{
              marginTop: 15,
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
              <ButtonText>REGISTER</ButtonText>
            </LinearGradient>
          </Button>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
              width: '100%',
            }}>
            <Text>Already have an account?</Text>
            {this.renderLogIn()}
          </View>
        </View>
      </Container>
    );
  }
}

export default SignUp;
