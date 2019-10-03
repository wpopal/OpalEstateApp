import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ROUTE_NAMES} from '../Main/routes';
import {
  Image,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Searchbar from '../components/searchbar';
import {Button, ThemeProvider, Text} from 'react-native-elements';
import {Creators as MainCreators} from '~/store/ducks/main';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import styles from './style-main';
import Icon from 'react-native-vector-icons/FontAwesome';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars, faSearch} from '@fortawesome/free-solid-svg-icons';

class Main extends Component<Props, State> {
  // const { mainRequest } = this.props;
  // const { loading, error, data } = mainRequest;
  componentDidMount(): void {
    this.props.getmainRequest();
  }

  render() {
    const {navigation} = this.props;
    const {mainRequest} = this.props;
    const {loading, error, data} = mainRequest;
    return (
      <ImageBackground
        source={{
          uri:
            'https://s3-sa-east-1.amazonaws.com/rocketseat-cdn/background.png',
        }}
        style={styles.container}
        resizeMode="cover">
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.logos}>OPAL ESTATE</Text>
          </View>
          <View style={styles.body}>
            {loading && (
              <View>
                <Text>Loading...</Text>
              </View>
            )}
            {error && (
              <View>
                <Text>ERROR !!!</Text>
              </View>
            )}
            {!loading && !error && (<View style={{width: '100%'}}>
              {data.collection.map((l, i) => (
                <TouchableOpacity key={i}
                                  onPress={() =>
                                    this.props.navigation.navigate(ROUTE_NAMES.DETAIL,l)
                                  }>
                  <View style={styles.listing}>
                    <ImageBackground
                      style={{width: '100%', height: '100%'}}
                      source={{
                        uri:
                        l.info.thumbnail,
                      }}>
                      <View style={styles.statust}>
                        <View
                          style={{
                            flexDirection: 'row',
                          }}>
                          {
                            l.is_featured === 'on' ? (<View
                              style={{
                                backgroundColor: 'red',
                                paddingTop: 3,
                                paddingBottom: 3,
                                paddingRight: 6,
                                paddingLeft: 6,
                              }}>

                              <Text
                                style={{color: '#fff', fontSize: RFPercentage(1.8)}}>
                                FEATURED
                              </Text>
                            </View>) : (<View></View>)
                          }
                          {
                            l.labels.length == 0 ? (<View></View>) : (<View
                              style={{
                                backgroundColor: '#efc065',
                                paddingTop: 3,
                                paddingBottom: 3,
                                paddingRight: 6,
                                paddingLeft: 6,
                              }}>
                              {
                                l.labels.map((y, x) => (
                                  <Text key={x}
                                        style={{color: '#fff', fontSize: RFPercentage(1.8)}}>{y.name}</Text>
                                ))
                              }
                            </View>)}
                        </View>
                        <View>
                          {
                            l.status.length == 0 ? (<View></View>) : (<View
                              style={{
                                backgroundColor: 'green',
                                paddingTop: 3,
                                paddingBottom: 3,
                                paddingRight: 6,
                                paddingLeft: 6,
                              }}>
                              {
                                l.status.map((y, x) => (
                                  <Text key={x}
                                        style={{color: '#fff', fontSize: RFPercentage(1.8)}}>
                                    {y.name}
                                  </Text>
                                ))
                              }
                            </View>)
                          }
                        </View>
                      </View>
                    </ImageBackground>
                    <View style={{flex: 1, width: '100%'}}>
                      <View>
                        <Text h4>{l.info.title}</Text>
                        <Text style={{color: '#aaa'}}>{l.info.address}</Text>
                        <Text style={{color: '#1e4ecc'}}>Call to Price</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>)}
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  mainRequest: state.main,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(MainCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
