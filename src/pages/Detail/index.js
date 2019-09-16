import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  Image,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  ImageBackground,
  StatusBar,
} from 'react-native';
import {Button, ThemeProvider, Text} from 'react-native-elements';
import {Creators as DetailCreators} from '~/store/ducks/Detail';
import {RFPercentage, RFValue} from "react-native-responsive-fontsize";
import styles from './style-Detail';
import Icon from 'react-native-vector-icons/FontAwesome';

class Dâtil extends Component<Props, State> {
  // const { DetailRequest } = this.props;
  // const { loading, error, data } = DetailRequest;

  render() {
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
            <View style={styles.listing}>
              <ImageBackground
                style={{width: '100%', height: '100%'}}
                source={{
                  uri:
                    'http://demo2.themelexus.com/housey/wp-content/uploads/2019/08/property-09-650x428.jpg',
                }}>
                <View
                  style={styles.statust}>
                  <View style={{
                    flexDirection: 'row',
                  }}>
                    <View
                      style={{
                        backgroundColor: 'red',
                        paddingTop: 3,
                        paddingBottom: 3,
                        paddingRight: 6,
                        paddingLeft: 6,
                      }}>
                      <Text style={{color: '#fff', fontSize: RFPercentage(1.8)}}>FEATURED</Text>
                    </View>
                    <View style={{
                      backgroundColor: '#efc065', paddingTop: 3,
                      paddingBottom: 3,
                      paddingRight: 6,
                      paddingLeft: 6,
                    }}><Text style={{color: '#fff', fontSize: RFPercentage(1.8)}}>FOR SALE</Text></View>
                  </View>
                  <View>
                    <View style={{
                      backgroundColor: 'green', paddingTop: 3,
                      paddingBottom: 3,
                      paddingRight: 6,
                      paddingLeft: 6,
                    }}><Text style={{color: '#fff', fontSize: RFPercentage(1.8)}}>SOLD</Text></View>
                  </View>
                </View>
              </ImageBackground>
              <View style={{flex: 1, width: '100%'}}>
                <View>
                  <Text h4>312 Hue Street</Text>
                  <Text style={{color: '#aaa'}}> Hai Ba Trung District</Text>
                  <Text style={{color: '#1e4ecc'}}>Call to Price</Text>
                </View>
              </View>
            </View>
            <View style={styles.listing}>
              <ImageBackground
                style={{width: '100%', height: '100%'}}
                source={{
                  uri:
                    'http://demo2.themelexus.com/housey/wp-content/uploads/2019/08/property-04-650x428.jpg',
                }}>
                <View
                  style={styles.statust}>
                  <View style={{
                    flexDirection: 'row',
                  }}>
                    <View
                      style={{
                        backgroundColor: 'red',
                        paddingTop: 3,
                        paddingBottom: 3,
                        paddingRight: 6,
                        paddingLeft: 6,
                      }}>
                      <Text style={{color: '#fff', fontSize: RFPercentage(1.8)}}>FEATURED</Text>
                    </View>
                    <View style={{
                      backgroundColor: '#efc065', paddingTop: 3,
                      paddingBottom: 3,
                      paddingRight: 6,
                      paddingLeft: 6,
                    }}><Text style={{color: '#fff', fontSize: RFPercentage(1.8)}}>FOR SALE</Text></View>
                  </View>
                  <View>
                    <View style={{
                      backgroundColor: 'green', paddingTop: 3,
                      paddingBottom: 3,
                      paddingRight: 6,
                      paddingLeft: 6,
                    }}><Text style={{color: '#fff', fontSize: RFPercentage(1.8)}}>SOLD</Text></View>
                  </View>
                </View>
              </ImageBackground>
              <View style={{flex: 1, width: '100%'}}>
                <View>
                  <Text h4>Apartment In San Francisco</Text>
                  <Text style={{color: '#aaa'}}> 2018 Clement St, San Francisco, CA 94121, USA</Text>
                  <Text style={{color: '#1e4ecc'}}>Call to Price</Text>
                </View>
              </View>
            </View>
            <View style={styles.listing}>
              <ImageBackground
                style={{width: '100%', height: '100%'}}
                source={{
                  uri:
                    'http://demo2.themelexus.com/housey/wp-content/uploads/2019/08/property-01-650x428.jpg',
                }}>
                <View
                  style={styles.statust}>
                  <View style={{
                    flexDirection: 'row',
                  }}>
                    <View
                      style={{
                        backgroundColor: 'red',
                        paddingTop: 3,
                        paddingBottom: 3,
                        paddingRight: 6,
                        paddingLeft: 6,
                      }}>
                      <Text style={{color: '#fff', fontSize: RFPercentage(1.8)}}>FEATURED</Text>
                    </View>
                    <View style={{
                      backgroundColor: '#efc065', paddingTop: 3,
                      paddingBottom: 3,
                      paddingRight: 6,
                      paddingLeft: 6,
                    }}><Text style={{color: '#fff', fontSize: RFPercentage(1.8)}}>FOR SALE</Text></View>
                  </View>
                  <View>
                    <View style={{
                      backgroundColor: 'green', paddingTop: 3,
                      paddingBottom: 3,
                      paddingRight: 6,
                      paddingLeft: 6,
                    }}><Text style={{color: '#fff', fontSize: RFPercentage(1.8)}}>SOLD</Text></View>
                  </View>
                </View>
              </ImageBackground>
              <View style={{flex: 1, width: '100%'}}>
                <View>
                  <Text h4>Easy Mill Arbor</Text>
                  <Text style={{color: '#aaa'}}>  4767 Lake Rd, Miami, FL</Text>
                  <Text style={{color: '#1e4ecc'}}>Call to Price</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <StatusBar barStyle="dark-content" backgroundColor="#7159c1"/>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  DetailRequest: state.Detail,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(DetailCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Detail);
