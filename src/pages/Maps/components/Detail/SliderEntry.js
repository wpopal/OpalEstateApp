import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {ParallaxImage} from 'react-native-snap-carousel';
import styles from './SliderEntry.style';

export default class SliderEntry extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    even: PropTypes.bool,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object,
  };

  get image() {
    const {
      data: {url},
      parallax,
      parallaxProps,
      even,
    } = this.props;
    const urlc = url.replace('localhost', '10.0.2.2');
    return parallax ? (
      <ParallaxImage
        source={{uri: urlc}}
        containerStyle={[
          styles.imageContainer,
          even ? styles.imageContainerEven : {},
        ]}
        style={styles.image}
        parallaxFactor={0.35}
        showSpinner={true}
        spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
        {...parallaxProps}
      />
    ) : (
      <Image source={{uri: urlc}} style={styles.image} />
    );
  }

  render() {
    return (
      <View style={styles.slideInnerContainer2}>
        <View activeOpacity={1} style={styles.slideInnerContainer}>
          <View style={[styles.imageContainer]}>{this.image}</View>
        </View>
      </View>
    );
  }
}
