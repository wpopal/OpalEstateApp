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
  TouchableOpacity,
} from 'react-native';
import {Button, ThemeProvider, Text} from 'react-native-elements';
import {Creators as DetailCreators} from '../../../store/ducks/detail';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import styles from './style-detail.js';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from "axios";

class Detail extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      position: 1,
      interval: null,
      dataSource: [],
    };
  }

  renderIcon = () => {
    return <Icon name="google-maps" style={styles.actionButtonIcon}/>;
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
      }, 1000),
    });
  }

  //   create = () => {
  //   axios.get('http://dev.wpopal.com/latehome_free/wp-json/estate-api/v1/properties', {
  //     params: {per_page: 1,
  //     page: 1}
  //   })
  //     .then(function (response) {
  //       console.log(response,'ádasdasdasdasdas');
  //     })
  //     .catch(function (error) {
  //       console.log(error,error);
  //     });
  //
  // }

  //
  // delete = () => {
  //   axios({
  //     method: 'delete',
  //     url: 'http://dev.wpopal.com/latehome_free/wp-json/estate-api/v1/properties/2346',
  //     responseType: 'stream'
  //   })
  //     .then(function (response) {
  //       console.log('response', response);
  //       response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
  //     });
  // }

  render() {
    const {navigation} = this.props;
    console.log('this.props.navigation', this.props.navigation);
    const property = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <View style={{width: '100%'}}>
          <ScrollView>
            <Slideshow
              dataSource={property.item.gallery}
              position={this.state.position}
              height={(viewportHeight / 100) * 35}
              onPositionChanged={position => this.setState({position})}
            />
            <Text h3>{property.item.title}</Text>
            <Text>{property.item.address}</Text>
            <Text>{property.item.price} per month</Text>
            <Text h3>Property Description</Text>
            <Text>{property.item.content}</Text>
            <Text h4>Quick Information</Text>
            <Text h4>Amenities</Text>
            {property.item.amenities.map((l, i) => (
              <Text key={i}>{l.name}</Text>
            ))}
            <Text h4>Facilities</Text>
            <Text h4>Attachments</Text>
          </ScrollView>
          <ActionButton
            buttonColor="#8e5cf1"
            onPress={() => {
              navigation.navigate(ROUTE_NAMES.MAPS, property.item.map);
            }}
            renderIcon={this.renderIcon}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  console.log('state', state);
  return {DetailRequest: state.detail};
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(DetailCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(Detail));
