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
import {Path, Svg} from 'react-native-svg';
import {RFPercentage} from 'react-native-responsive-fontsize';

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
        <View
          style={{
            width: '100%',
            height: 70,
            flexDirection: 'row',
            backgroundColor: '#fff',
            paddingRight: 20,
            paddingLeft: 20,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Svg
              width="20"
              height="16"
              viewBox="0 0 20 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <Path
                d="M7.5 15.1667C7.25 15.1667 7 15.0833 6.83333 14.8333L0.25 8.16667C-0.0833333 7.83333 -0.0833333 7.25 0.25 6.91667L6.83333 0.25C7.08333 0.0833333 7.25 0 7.5 0C7.75 0 8 0.0833333 8.16667 0.25C8.33333 0.416667 8.41667 0.666667 8.41667 0.916667C8.41667 1.16667 8.33333 1.41667 8.16667 1.58333L3.08333 6.66667H19.0833C19.5833 6.66667 20 7.08333 20 7.58333C20 8.08333 19.5833 8.5 19.0833 8.5H3.08333L8.16667 13.5833C8.58333 14 8.5 14.5833 8.16667 14.9167C8 15.0833 7.75 15.1667 7.5 15.1667Z"
                fill="#6923E7"
              />
            </Svg>
          </TouchableOpacity>
          <Text
            style={{
              left: -10,
              fontSize: RFPercentage(2.5),
              fontWeight: 'bold',
            }}>
            SIGN UP
          </Text>
          <TouchableOpacity />
        </View>
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
              colors={['#a685e7', '#9733e7', '#6923E7']}
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
