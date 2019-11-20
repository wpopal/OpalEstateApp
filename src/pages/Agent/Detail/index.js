import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import {ROUTE_NAMES} from '../routes';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

import Slideshow from 'react-native-image-slider-show';
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
import {Creators as DetailCreators} from '../../../store/ducks/detail';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import styles from './style-detail.js';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Circle, ClipPath, Defs, G, Path, Rect, Svg} from 'react-native-svg';
import MapViewZoom from 'react-native-map-clustering';
import MapView, {Marker} from 'react-native-maps';

class Detail extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      routes: [
        {key: 'listingMap', title: 'listing Map'},
        {key: 'listingList', title: 'listing List'},
      ],
      region: {
        longitude: -118.3108551,
        latitude: 33.9877578,
        latitudeDelta: 0.8,
        longitudeDelta: 0.8,
      },
      dataSource: {},
    };
  }
  renderIcon = () => {
    return <Icon name="google-maps" style={styles.actionButtonIcon} />;
  };
  componentWillMount() {
    const dataM = this.props.navigation.state.params.listing;
    this.setState({
      dataSource: this.props.navigation.state.params,
      region: {
        longitude: dataM.length ? Number(dataM[0].map.longitude) : -118.3108661,
        latitude: dataM.length ? Number(dataM[0].map.latitude) : 33.9877342,
        latitudeDelta: 0.8,
        longitudeDelta: 0.8,
      },
    });
    console.log(' this.state this.state', this.state);
  }

  FirstRoute = data => {
    console.log('state', this.state.dataSource);
    console.log(' this.state this.state', this.state);
    const itemxx = this.state.dataSource.listing;
    if (Object.keys(this.state.dataSource).length) {
      return (
        <MapViewZoom
          key={this.state.forceRefresh}
          region={this.state.region}
          style={{width: '100%', height: '100%'}}
          loadingEnabled={true}>
          {itemxx.map(item => {
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
                  source={require('../../Maps/assets/images/Vector.png')}>
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
                <MapView.Callout>
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
      );
    } else {
      return <View />;
    }
  };

  SecondRoute = data => {
    return <Text>yyyyyyyyy</Text>;
  };

  render() {
    const {navigation} = this.props;
    const data = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <Image
          source={{uri: data.thumbnail}}
          style={{
            height: (viewportWidth / 100) * 30,
            width: (viewportWidth / 100) * 30,
            borderRadius: ((viewportWidth / 100) * 30) / 2,
          }}
        />
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontWeight: 'bold', fontSize: 18, marginRight: 5}}>
            {data.name}
          </Text>
          {data.trusted ? (
            <Svg
              width="15"
              height="15"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <Circle cx="6" cy="6" r="6" fill="#1790FF" />
              <G clip-path="url(#clip0)">
                <Path
                  d="M4.99995 8.79999C4.89995 8.79999 4.79995 8.74999 4.72495 8.67499L3.12495 7.07499C2.97495 6.92499 2.97495 6.67499 3.12495 6.49999C3.27495 6.34999 3.52495 6.34999 3.67495 6.49999L4.97495 7.79999L8.29995 4.12499C8.44995 3.94999 8.69995 3.94999 8.87495 4.09999C9.02495 4.24999 9.04995 4.49999 8.89995 4.67499L5.29995 8.67499C5.22495 8.74999 5.12495 8.79999 4.99995 8.79999Z"
                  fill="white"
                />
              </G>
              <Defs>
                <ClipPath id="clip0">
                  <Rect
                    width="6"
                    height="4.8"
                    fill="white"
                    transform="translate(3 4)"
                  />
                </ClipPath>
              </Defs>
            </Svg>
          ) : (
            <View />
          )}
        </View>
        <Text style={{color: '#5F6870'}}>{data.company}</Text>
        <Text numberOfLines={2} style={{color: '#6923E7', fontSize: 16}}>
          {data.listing_count}
          {' Listings'}
        </Text>
        <View style={{width: '100%', height: 500, marginTop: 30}}>
          <TabView
            renderTabBar={props => (
              <TabBar
                {...props}
                indicatorStyle={{backgroundColor: '#6923E7'}}
                labelStyle={{color: '#5F6870'}}
                style={{backgroundColor: '#FFF'}}
                onTabPress={({route, preventDefault}) => {
                  console.log('route', route);
                  console.log('preventDefault', preventDefault);
                }}
              />
            )}
            navigationState={this.state}
            renderScene={SceneMap({
              listingMap: this.FirstRoute,
              listingList: this.SecondRoute,
            })}
            onIndexChange={index => this.setState({index})}
            initialLayout={{width: Dimensions.get('window').width}}
          />
        </View>
        {/*<ActionButton*/}
        {/*  buttonColor="#8e5cf1"*/}
        {/*  onPress={() => {*/}
        {/*    navigation.navigate(ROUTE_NAMES.MAPS);*/}
        {/*  }}*/}
        {/*  renderIcon={this.renderIcon}*/}
        {/*/>*/}
      </View>
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
)(withNavigation(Detail));
