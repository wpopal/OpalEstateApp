import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Animated,
  Picker,
  StatusBar,
  ScrollView,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {debounce} from 'lodash';
import MapView, {Marker} from 'react-native-maps';
import {mapMarker} from '../../assets/images/Vector.png';
import {findPlaceFromLatLng} from '../../services/google.service';
import styles from './styles';
import Geolocation from '@react-native-community/geolocation';
import {Creators as mapMainCreators} from '../../../../store/ducks/mapMain';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';
import {Path, Svg, G, Defs, ClipPath} from 'react-native-svg';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import axios from 'axios';
import MainList from '../../../Main/index';
import MapViewZoom from 'react-native-map-clustering';

const latitudeDelta = 0.8;
const longitudeDelta = 0.8;
const {height: viewportHeight} = Dimensions.get('window');
let scrollYPos = 0;
var dataSetting = {};
class HomeLocator extends Component {
  static defaultProps = {
    draggableRange: {top: viewportHeight - 70, bottom: 30},
  };

  constructor() {
    super();
    this.state = {
      forceRefresh: true,
      Changeicon: true,
      info: [],
      screenHeight: Dimensions.get('window').height,
      screenWidth: Dimensions.get('window').width,
      dataMap: [],
      search: '',
      selectedText: 'Search.....',
      placeHolderText: 'Please Select Country',
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta,
        longitudeDelta,
      },
      isPanding: false,
      openModal: false,
      selectedFlag: false,
      defaultValue: true,
      select: '',
    };
  }

  scrollToB = () => {
    scrollXPos = this.state.screenWidth * 1;
    this.scroller.scrollTo({x: scrollXPos, y: 0});
    this.setState({Changeicon: !this.state.Changeicon});
  };
  scrollToTop = () => {
    this.scroller.scrollTo({x: 0, y: 0});
    this.setState({Changeicon: !this.state.Changeicon});
  };

  onSelectedItemsChange = (key, value) => {};

  componentDidMount() {
    this.getFillter();
    SplashScreen.hide();
  }

  async getFillter() {
    try {
      const posts = await axios({
        method: 'get',
        params: {
          consumer_key: 'ck_bd09789959d94c7021ec1719df2965d4b0053698',
          consumer_secret: 'cs_66aa5aad77dade62fb399435cff32dca3824ed9a',
        },
        url:
          'http://10.0.2.2/wordpress/latehome_free/wp-json/estate-api/v1/search-form',
        headers: {
          'X-Custom-Header': 'foobar',
          Accept: 'application/json',
        },
      });
      if (posts.data.status !== 200) {
        return [];
      } else {
        console.log('posts', posts);
        dataSetting = posts.data.fields;
        this.setState({
          info: Array.from(posts.data.fields.info),
        });
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
    console.log('sdadasdasda',);
    if (nextProps.mapMainRequest.data.length > 0) {
      this.reRenderMap(nextProps.mapMainRequest);
    }
  }

  _draggedValue = new Animated.Value(30);

  reRenderMap = data => {
    if (data.geoLocal.latitude !== '') {
      this.setState({
        forceRefresh: !this.state.forceRefresh,
        dataMap: data.data,
        region: {
          longitude: Number(data.geoLocal.longitude),
          latitude: Number(data.geoLocal.latitude),
          latitudeDelta,
          longitudeDelta,
        },
      });
    } else {
      this.setState({
        forceRefresh: !this.state.forceRefresh,
        dataMap: data.data,
        region: {
          longitude: Number(data.data[0].map.longitude),
          latitude: Number(data.data[0].map.latitude),
          latitudeDelta,
          longitudeDelta,
        },
      });
    }
  };

  eventScroll(event) {
    if (event.nativeEvent.contentOffset.x === 0) {
      this.setState({Changeicon: !this.state.Changeicon});
    }
  }

  render() {
    const {region, isPanding, text, openModal} = this.state;
    const {top, bottom} = this.props.draggableRange;
    const {search} = this.state;
    const backgoundOpacity = this._draggedValue.interpolate({
      inputRange: [viewportHeight, viewportHeight],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    const options = [
      {value: 0, label: '0'},
      {value: 1, label: '1'},
      {value: 2, label: '2'},
      {value: 3, label: '3'},
    ];
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <View
          style={{
            position: 'absolute',
            zIndex: 999999,
            backgroundColor: '#fff',
            width: '100%',
            paddingBottom: 10,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.0,

            elevation: 1,
          }}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{marginLeft: '2%'}}>
              {this.state.Changeicon ? (
                <TouchableOpacity onPress={this.scrollToB}>
                  <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={RFPercentage(5)}
                    height={RFPercentage(3)}
                    fill="none"
                    viewBox="0 0 20 18">
                    <Path
                      fill="#6923E7"
                      d="M9 3.417h9.833c.584 0 1.084-.5 1.084-1.084 0-.583-.5-1.083-1.084-1.083H9c-.583 0-1.083.5-1.083 1.083 0 .667.5 1.084 1.083 1.084zM18.917 7.833H9c-.583 0-1.083.5-1.083 1.084C7.917 9.5 8.417 10 9 10h9.833c.584 0 1.084-.5 1.084-1.083.083-.584-.417-1.084-1-1.084zM18.917 14.417H9c-.583 0-1.083.5-1.083 1.083s.5 1.083 1.083 1.083h9.833c.584 0 1.084-.5 1.084-1.083.083-.583-.417-1.083-1-1.083zM4.583 1.5H3.25L2.833.25A.458.458 0 002.417 0c-.084 0-.25.083-.334.25L1.667 1.5H.333c-.166 0-.25.083-.333.25 0 .167 0 .333.167.417l1.083.75L.833 4.25c-.083.167 0 .25.084.417.166.083.333.083.416 0l1.084-.75 1.083.75c.083.083.167.083.25.083.083 0 .167 0 .25-.083.083-.167.167-.25.083-.417L3.667 3l1.083-.75c.167-.083.167-.25.167-.417-.084-.25-.25-.333-.334-.333zM3.667 7.333H1.25c-.25 0-.417.167-.417.334v2.416c0 .167.167.334.334.334h2.416a.359.359 0 00.334-.334V7.667c.166-.167 0-.334-.25-.334zM3.667 13.917H1.25a.358.358 0 00-.333.333v2.417c0 .166.166.333.333.333h2.417A.358.358 0 004 16.667V14.25c.083-.167-.083-.333-.333-.333z"
                    />
                  </Svg>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={this.scrollToTop}>
                  <Svg
                    width={RFPercentage(5)}
                    height={RFPercentage(3)}
                    viewBox="0 0 20 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <Path
                      d="M10 15.75C10.25 15.75 10.4167 15.6667 10.5833 15.5C11.0833 14.8333 15.75 8.66667 15.75 5.75C15.75 2.58333 13.1667 0 10 0C6.83333 0 4.25 2.58333 4.25 5.75C4.25 8.66667 8.83333 14.75 9.41667 15.5C9.58333 15.5833 9.75 15.75 10 15.75ZM10 1.41667C12.3333 1.41667 14.25 3.33333 14.25 5.66667C14.25 7.5 11.5 11.5833 10 13.75C8.41667 11.6667 5.75 7.5 5.75 5.75C5.75 3.33333 7.66667 1.41667 10 1.41667ZM12.5 5.33333C12.5 3.91667 11.4167 2.83333 10 2.83333C8.58333 2.83333 7.5 3.91667 7.5 5.33333C7.5 6.75 8.58333 7.83333 10 7.83333C11.4167 7.83333 12.5 6.75 12.5 5.33333ZM8.91667 5.33333C8.91667 4.75 9.41667 4.25 10 4.25C10.5833 4.25 11.0833 4.75 11.0833 5.33333C11.0833 5.91667 10.5833 6.41667 10 6.41667C9.41667 6.41667 8.91667 5.91667 8.91667 5.33333ZM19.8333 18.25C19.6667 18.4167 19.5 18.5833 19.25 18.5833H0.75C0.5 18.5833 0.333333 18.5 0.166666 18.25C-5.10365e-07 18.0833 -5.10365e-07 17.8333 0.0833328 17.5833L2.91667 9.75C3 9.5 3.25 9.25 3.58333 9.25H5C5.41667 9.25 5.75 9.58333 5.75 10C5.75 10.4167 5.41667 10.75 5 10.75H4.08333L1.75 17.1667H18.25L15.9167 10.75H15C14.5833 10.75 14.25 10.4167 14.25 10C14.25 9.58333 14.5833 9.25 15 9.25H16.4167C16.75 9.25 17 9.41667 17.0833 9.75L19.9167 17.5833C20 17.8333 20 18.0833 19.8333 18.25Z"
                      fill="#6923E7"
                    />
                  </Svg>
                </TouchableOpacity>
              )}
            </View>
            <View style={{width: '77%'}}>
              <View>
                <TouchableOpacity
                  disabled={false}
                  onPress={() =>
                    this.props.navigation.navigate('SEARCH', {
                      getdataMap: this.reRenderMap,
                    })
                  }
                  activeOpacity={0.7}>
                  <View>
                    <View style={styles.pickerStyle}>
                      <Svg
                        style={{marginLeft: 10}}
                        width={RFPercentage(4)}
                        height={RFPercentage(2)}
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <Path
                          d="M17.7 16.425L14.4 13.125C16.95 9.975 16.725 5.25 13.8 2.4C12.3 0.9 10.275 0 8.1 0C5.925 0 3.9 0.825 2.4 2.4C0.9 3.9 0 5.925 0 8.1C0 10.275 0.825 12.3 2.4 13.8C3.9 15.3 5.925 16.2 8.1 16.2C9.9 16.2 11.7 15.6 13.125 14.4L16.425 17.7C16.575 17.85 16.8 18 17.025 18C17.25 18 17.475 17.925 17.625 17.7C18.075 17.325 18.075 16.8 17.7 16.425ZM14.4 8.025C14.4 9.675 13.725 11.25 12.6 12.45C11.475 13.65 9.825 14.25 8.175 14.25C6.525 14.25 4.95 13.575 3.75 12.45C2.55 11.325 1.8 9.75 1.8 8.025C1.8 6.3 2.475 4.8 3.6 3.6C4.725 2.4 6.375 1.8 8.025 1.8C9.675 1.8 11.25 2.475 12.45 3.6C13.65 4.725 14.4 6.375 14.4 8.025Z"
                          fill="#AEB3BA"
                        />
                      </Svg>
                      <Text style={styles.textStyle}>
                        {this.state.selectedText}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginRight: '2%'}}>
              <TouchableOpacity
                disabled={false}
                onPress={() =>
                  this.props.navigation.navigate('SETTING', dataSetting)
                }
                activeOpacity={0.7}>
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={RFPercentage(5)}
                  height={RFPercentage(3)}
                  fill="none"
                  viewBox="0 0 20 17">
                  <G fill="#6923E7" clip-path="url(#clip0)">
                    <Path d="M4 8C1.75 8 0 6.167 0 4s1.75-4 4-4c1.75 0 3.25 1.083 3.75 2.833v.084h11.167C19.5 2.917 20 3.417 20 4s-.5 1.083-1.083 1.083H7.833v.084C7.25 6.833 5.75 8 4 8zm0-5.833C3 2.167 2.167 3 2.167 4S3 5.833 4 5.833 5.833 5 5.833 4 5 2.167 4 2.167zM16 16.417c-1.75 0-3.25-1.084-3.75-2.834V13.5H1.083C.5 13.5 0 13.083 0 12.5s.5-1.083 1.083-1.083H12.25v-.084C12.75 9.667 14.333 8.5 16 8.5c2.167 0 4 1.75 4 4s-1.75 3.917-4 3.917zm0-5.75c-1 0-1.833.833-1.833 1.833S15 14.333 16 14.333s1.833-.833 1.833-1.833S17 10.667 16 10.667z" />
                  </G>
                  <Defs>
                    <ClipPath id="clip0">
                      <Path fill="#fff" d="M0 0H20V16.417H0z" />
                    </ClipPath>
                  </Defs>
                </Svg>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView
          onMomentumScrollEnd={event => this.eventScroll(event)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          scrollEnables={false}
          directionalLockEnabled={true}
          horizontal={true}
          style={styles.container}
          ref={scroller => {
            this.scroller = scroller;
          }}>
          <View style={[styles.screen, styles.screenA]}>
            <View style={styles.mapWrapper}>
              {region.latitude === 0 ? (
                <View>
                  <Text>loading...</Text>
                </View>
              ) : (
                <MapViewZoom
                  key={this.state.forceRefresh}
                  region={region}
                  style={styles.map}
                  loadingEnabled={true}>
                  {this.state.dataMap.map(item => {
                    return (
                      <Marker
                        key={item.id}
                        style={{
                          height: 50,
                          width: 50,
                        }}
                        coordinate={{
                          latitude: Number(item.map.latitude),
                          longitude: Number(item.map.longitude),
                        }}>
                        <ImageBackground
                          style={{
                            width: 50,
                            height: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          resizeMode="contain"
                          source={require('../../assets/images/Vector.png')}>
                          <Text
                            style={{
                              fontSize: 13,
                              color: '#fff',
                              fontWeight: 'bold',
                              bottom: 6,
                            }}>
                            {Number(
                              item.price
                                .replace('&#36;', '')
                                .replace(',', '')
                                .replace('.', ''),
                            ) / 1000000}
                            {' M'}
                          </Text>
                        </ImageBackground>
                        <MapView.Callout
                          onPress={() =>
                            this.props.navigation.navigate('DETAIL', {
                              item: item,
                            })
                          }>
                          <View
                            style={{
                              width: 250,
                              height: 200,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text style={{top: -85}}>
                              <Image
                                style={{width: 250, height: 250}}
                                source={{uri: item.thumbnail}}
                              />
                            </Text>
                            <Text style={{top: -85, fontWeight: 'bold'}}>
                              {item.name}
                            </Text>
                            <Text
                              style={{
                                top: -85,
                                fontWeight: 'bold',
                                color: '#706e72',
                              }}>
                              {item.address}
                            </Text>
                          </View>
                        </MapView.Callout>
                      </Marker>
                    );
                  })}
                </MapViewZoom>
              )}
            </View>
          </View>
          <View style={[styles.screen, styles.screenB]}>
            <Text style={styles.letter}>B</Text>
            <MainList />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    mapMainRequest: state.mapMain,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(mapMainCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(HomeLocator));
