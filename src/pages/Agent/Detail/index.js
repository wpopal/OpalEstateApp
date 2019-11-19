import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import {ROUTE_NAMES} from '../routes';
import {TabView, SceneMap} from 'react-native-tab-view';

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

class Detail extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      routes: [
        {key: 'first', title: 'First'},
        {key: 'second', title: 'Second'},
      ],
      position: 1,
      interval: null,
      dataSource: [
        {
          title: 'Title 1',
          caption: 'Caption 1',
          url:
            'http://demo2.themelexus.com/housey/wp-content/uploads/2019/08/property-05.jpg',
        },
        {
          title: 'Title 2',
          caption: 'Caption 2',
          url:
            'http://demo2.themelexus.com/housey/wp-content/uploads/2019/08/property-27.jpg',
        },
        {
          title: 'Title 3',
          caption: 'Caption 3',
          url:
            'http://demo2.themelexus.com/housey/wp-content/uploads/2019/08/property-26.jpg',
        },
      ],
    };
  }
  renderIcon = () => {
    return <Icon name="google-maps" style={styles.actionButtonIcon} />;
  };
  componentWillMount() {
    this.setState({
      interval: setInterval(() => {
        this.setState({
          position:
            this.state.position === this.state.dataSource.length
              ? 0
              : this.state.position + 1,
        });
      }, 10000),
    });
  }

  FirstRoute = () => {
    return <Text>xxxxxxxxxx</Text>;
  };

  SecondRoute = () => {
    return <Text>yyyyyyyyy</Text>;
  };

  render() {
    const {navigation} = this.props;
    const data = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
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
        <View style={{width: '100%', height: 500}}>
          <TabView
            navigationState={this.state}
            renderScene={SceneMap({
              first: this.FirstRoute,
              second: this.SecondRoute,
            })}
            onIndexChange={index => this.setState({index})}
            initialLayout={{width: Dimensions.get('window').width}}
          />
        </View>
        <ActionButton
          buttonColor="#8e5cf1"
          onPress={() => {
            navigation.navigate(ROUTE_NAMES.MAPS);
          }}
          renderIcon={this.renderIcon}
        />
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
