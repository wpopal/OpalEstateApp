// @flow

import React, {Component} from 'react';
import {
  StatusBar,
  Animated,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';

import styled from 'styled-components';
import SignUpComponent from './components/SignUp';
import LoginComponent from './components/Login';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Creators as LoginCreators} from '../../../store/ducks/login';
import SplashScreen from 'react-native-splash-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {Path, Svg} from 'react-native-svg';

const {height: viewportHeight} = Dimensions.get('window');
const Container = styled(View)`
  flex: 1;
  background-color: #f9f9fb;
`;

const Wrapper = styled(View)`
  background-color: #f9f9fb;
  width: 100%;
  height: ${viewportHeight - 20}px;
  flex-direction: column;
  margin-top: ${StatusBar.currentHeight + 30}px;
  justify-content: space-between;
  align-items: center;
`;

const ContentWrapper = styled(View)``;
SplashScreen.hide();
class Login extends Component {
  _loginFontSize: Object = new Animated.Value(1);

  state = {
    isBackgroundImageLoaded: true,
  };

  renderContent = (): Object => {
    console.log('Object', Object);
    return (
      <ContentWrapper>
        <LoginComponent />
      </ContentWrapper>
    );
  };
  componentDidMount(): void {
    SplashScreen.hide();
  }

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
              left: -20,
              fontSize: RFPercentage(2.5),
              fontWeight: 'bold',
            }}>
            LOGIN
          </Text>
          <TouchableOpacity />
        </View>
        <Wrapper>{this.renderContent()}</Wrapper>
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
