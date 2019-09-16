import React , { Component }from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  Text, Image, StyleSheet, Dimensions, ImageBackground, StatusBar,
} from 'react-native';
import {Button, ThemeProvider} from 'react-native-elements';
import {Creators as MainCreators} from '~/store/ducks/main';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 20,
  },
  fileName: {
    fontWeight: 'bold',
    marginTop: 5,
  },
  instructions: {
    color: '#DDD',
    fontSize: 14,
    marginTop: 20,
    textAlign: 'center',
  },
  logo: {
    height: Dimensions.get('window').height * 0.11,
    marginVertical: Dimensions.get('window').height * 0.11,
    width: Dimensions.get('window').height * 0.11 * (1950 / 662),
  },
  welcome: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

class Main extends Component<Props, State> {
  // const { mainRequest } = this.props;
  // const { loading, error, data } = mainRequest;

  render() {
    return (
      <ImageBackground
        source={{
          uri: 'https://s3-sa-east-1.amazonaws.com/rocketseat-cdn/background.png',
        }}
        style={styles.container}
        resizeMode="cover"
      >
        <ThemeProvider>
          <Button title="Hey!"/>
        </ThemeProvider>
        <StatusBar barStyle="light-content" backgroundColor="#7159c1"/>
      </ImageBackground>
    )
  }
};


const mapStateToProps = state => ({
  mainRequest: state.main,
});

const mapDispatchToProps = dispatch => bindActionCreators(MainCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);

