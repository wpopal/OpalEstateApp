import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {debounce} from 'lodash';
import MapView, {Marker} from 'react-native-maps';
import {mapMarker} from '../../constants/assets';
import {findPlaceFromLatLng} from '../../services/google.service';
import styles from './styles';
import Geolocation from '@react-native-community/geolocation';
import SlidingUpPanel from 'rn-sliding-up-panel';
import {withNavigation} from 'react-navigation';

const latitudeDelta = 0.025;
const longitudeDelta = 0.025;
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
const {width, height} = Dimensions.get('window');

class HomeLocator extends Component {
  static defaultProps = {
    draggableRange: {top: height - 70, bottom: 30},
  };

  constructor() {
    super();
    this.state = {
      forceRefresh: true,
      dataMap: [],
      region: {
        latitude: 10.780889,
        longitude: 106.629271,
        latitudeDelta,
        longitudeDelta,
      },
      isPanding: false,
      openModal: false,
    };
    this.onPanDrag = debounce(this.onPanDrag, 1000, {
      leading: true,
      trailing: false,
    });
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(
      position => {
        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta,
          longitudeDelta,
        };
        this.onRegionChangeComplete(region);
      },
      error => {},
      {enableHighAccuracy: false},
    );
  }

  onRegionChangeComplete = async region => {
    const {data} = await findPlaceFromLatLng(
      `${region.latitude},${region.longitude}`,
    );
    const newState = {
      region,
      isPanding: false,
    };
    if (data.status === 'OK') {
      newState.text = data.results[0].formatted_address;
    }
    this.setState(newState);
  };

  onPanDrag = () => {
    const {isPanding} = this.state;
    if (isPanding) {
      return;
    }
    this.setState({
      isPanding: true,
    });
  };
  _draggedValue = new Animated.Value(30);

  reRenderMap = data => {
    console.log('data', data);
    if (data.geo_lat) {
      console.log('22222');
      this.setState({
        forceRefresh: !this.state.forceRefresh,
        dataMap: data.data,
        region: {
          longitude: Number(data.geo_long),
          latitude: Number(data.geo_lat),
          latitudeDelta,
          longitudeDelta,
        },
      });
    } else {
      console.log('11111');
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

  render() {
    const {region, isPanding, text, openModal} = this.state;
    const {top, bottom} = this.props.draggableRange;

    const backgoundOpacity = this._draggedValue.interpolate({
      inputRange: [height, height],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <View style={styles.container}>
        <View style={{position: 'absolute', zIndex: 999999}}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('SEARCH', {
                getdataMap: this.reRenderMap,
              })
            }>
            <Icon raised name="search" type="font-awesome" color="#f50" />
          </TouchableOpacity>
        </View>
        <View style={styles.mapWrapper}>
          <MapView
            key={this.state.forceRefresh}
            ref={map => (this.map = map)}
            initialRegion={region}
            style={styles.map}
            showsUserLocation={true}
            followUserLocation={true}
            loadingEnabled={true}
            onPanDrag={this.onPanDrag}
            onRegionChangeComplete={this.onRegionChangeComplete}>
            {this.state.dataMap.map(item => {
              return (
                <Marker
                  key={item.id}
                  coordinate={{
                    latitude: Number(item.map.latitude),
                    longitude: Number(item.map.longitude),
                  }}
                  title={item.name}
                  description={item.content}
                />
              );
            })}
          </MapView>
        </View>
        <View
          style={[styles.markerFixed, isPanding ? styles.isPanding : null]}
          pointerEvents="none">
          <Image
            style={styles.marker}
            resizeMode="contain"
            source={mapMarker}
          />
        </View>
        <SlidingUpPanel
          ref={c => (this._panel = c)}
          draggableRange={this.props.draggableRange}
          animatedValue={this._draggedValue}
          snappingPoints={[360]}
          height={viewportHeight - 30}
          friction={0.5}>
          <View style={styles.panel}>
            <View style={styles.panelHeader}>
              <Animated.View style={[styles.textHeader]}>
                <View
                  style={{
                    height: 3,
                    width: 60,
                    borderRadius: 50,
                    backgroundColor: '#dddddd',
                  }}
                />
              </Animated.View>
            </View>
            <View style={styles.container2} />
          </View>
        </SlidingUpPanel>
      </View>
    );
  }
}

export default withNavigation(HomeLocator);
