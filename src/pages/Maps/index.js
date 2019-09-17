import React, {Component} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {Marker} from 'react-native-maps';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Creators as MapMainCreators} from '~/store/ducks/mapMain';
import {View, StyleSheet, Dimensions} from 'react-native';

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

class MapMain extends Component {
  // const { mainRequest } = this.props;
  // const { loading, error, data } = mainRequest;
  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          <Marker
            coordinate={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
            title={'hree Room Apartment'}
            description={
              'The ideal starter set upon on 25 acres of flat country, the choice is yours. Only 15 Minutes from\n' +
              '            Toowoomba you can enjoy a comfortable semi – rural lifestyle with multiple living areas.\n'
            }
          />
        </MapView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  mapMainRequest: state.main,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(MapMainCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapMain);
