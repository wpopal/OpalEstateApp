import React, {Component} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {Marker} from 'react-native-maps';
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

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: viewportHeight,
    width: viewportWidth,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

class Mapsx extends Component {
  state = {
    local: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    },
  };
  // const { mainRequest } = this.props;
  // const { loading, error, data } = mainRequest;
  onRegionChange(region) {
    this.setState({region});
  }

  componentDidMount(): void {

    this.setState({
      local: {
        latitude: Number(this.props.navigation.state.params.latitude),
        longitude: Number(this.props.navigation.state.params.longitude),
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      },
    });
  }

  render() {
    const {address} = this.props.navigation.state.params
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: this.state.local.latitude,
            longitude: this.state.local.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          <Marker
            coordinate={{
              latitude: this.state.local.latitude,
              longitude: this.state.local.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
            title={address}
          />
        </MapView>
      </View>
    );
  }
}

export default Mapsx;
