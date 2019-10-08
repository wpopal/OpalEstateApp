import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import {ROUTE_NAMES} from '../routes';
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
import {Creators as DetailCreators} from '~/store/ducks/detail';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import styles from './style-detail.js';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class Detail extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
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

  render() {
    const {navigation} = this.props;
    const data = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <ScrollView>
          <Image
            source={{uri: data.thumbnail}}
            style={{height: (viewportHeight / 100) * 35}}
          />
          <Text h3>{data.title}</Text>
          <Text>{data.title}</Text>
          <Text>{data.email}</Text>
          <Text>{data.address}</Text>
          <Text h3>Property Description</Text>
          <Text>{data.content}</Text>
        </ScrollView>
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
