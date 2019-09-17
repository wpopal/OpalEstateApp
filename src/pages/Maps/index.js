import React, {Component} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {Marker} from 'react-native-maps';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Creators as MapMainCreators} from '~/store/ducks/mapMain';
import Index from '../Main/index'
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Text,
  Button,
} from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  panel: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    backgroundColor: 'white',
    position: 'relative'
  },
  panelHeader: {
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flex: 1,
    backgroundColor: '#dddddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textHeader: {
    fontSize: 28,
    color: '#FFF',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -24,
    right: 18,
    width: 48,
    height: 48,
    zIndex: 1,
  },
  iconBg: {
    backgroundColor: '#2b8a3e',
    position: 'absolute',
    top: -24,
    right: 18,
    width: 48,
    height: 48,
    borderRadius: 24,
    zIndex: 1,
  }
});

class MapMain extends Component {
  static defaultProps = {
    draggableRange: {top: height - 70, bottom: 30}
  };

  _draggedValue = new Animated.Value(30);

  // const { mainRequest } = this.props;
  // const { loading, error, data } = mainRequest;
  render() {
    const {top, bottom} = this.props.draggableRange;

    const backgoundOpacity = this._draggedValue.interpolate({
      inputRange: [height, height],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
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
          <Marker
            coordinate={{
              latitude: 37.78835,
              longitude: -122.4335,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
            title={'hree Room Apartment'}
            description={
              'The ideal starter set upon on 25 acres of flat country, the choice is yours. Only 15 Minutes from\n' +
              '            Toowoomba you can enjoy a comfortable semi – rural lifestyle with multiple living areas.\n'
            }
          />
          <Marker
            coordinate={{
              latitude: 37.78855,
              longitude: -122.4355,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
            title={'hree Room Apartment'}
            description={
              'The ideal starter set upon on 25 acres of flat country, the choice is yours. Only 15 Minutes from\n' +
              '            Toowoomba you can enjoy a comfortable semi – rural lifestyle with multiple living areas.\n'
            }
          />
          <Marker
            coordinate={{
              latitude: 37.78877,
              longitude: -122.439,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
            title={'hree Room Apartment'}
            description={
              'The ideal starter set upon on 25 acres of flat country, the choice is yours. Only 15 Minutes from\n' +
              '            Toowoomba you can enjoy a comfortable semi – rural lifestyle with multiple living areas.\n'
            }
          />
          <Marker
            coordinate={{
              latitude: 37.78899,
              longitude: -122.4311,
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
        <SlidingUpPanel
          ref={c => (this._panel = c)}
          draggableRange={this.props.draggableRange}
          animatedValue={this._draggedValue}
          snappingPoints={[360]}
          height={viewportHeight - 30 }
          friction={0.5}>
          <View style={styles.panel}>
            <View style={styles.panelHeader}>
              <Animated.View
                style={[
                  styles.textHeader
                ]}>
                <View style={{
                  height: 3,
                  width: 60,
                  borderRadius: 50,
                  backgroundColor: '#dddddd',
                }}></View>
              </Animated.View>
            </View>
            <View style={styles.container}>
              <Index style={{marginBottom: 60}}/>
            </View>
          </View>
        </SlidingUpPanel>
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
