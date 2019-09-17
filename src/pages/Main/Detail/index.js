import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import { ROUTE_NAMES } from '../routes';
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
import {RFPercentage, RFValue} from "react-native-responsive-fontsize";
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
          url: 'http://demo2.themelexus.com/housey/wp-content/uploads/2019/08/property-05.jpg',
        }, {
          title: 'Title 2',
          caption: 'Caption 2',
          url: 'http://demo2.themelexus.com/housey/wp-content/uploads/2019/08/property-27.jpg',
        }, {
          title: 'Title 3',
          caption: 'Caption 3',
          url: 'http://demo2.themelexus.com/housey/wp-content/uploads/2019/08/property-26.jpg',
        },
      ],
    };
  }
  renderIcon = () => {
    return ( <Icon name="google-maps" style={styles.actionButtonIcon} />)
}
  componentWillMount() {
    this.setState({
      interval: setInterval(() => {
        this.setState({
          position: this.state.position === this.state.dataSource.length ? 0 : this.state.position + 1
        });
      }, 10000)
    });
  }

  render() {
        const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView>
          <Slideshow
            dataSource={this.state.dataSource}
            position={this.state.position}
            height={(viewportHeight / 100) * 35}
            onPositionChanged={position => this.setState({position})}/>
          <Text h3>Three Room Apartment</Text>
          <Text> 999 Rue du Marais, Québec, QC G1M 3T9Posted: 1 month ago</Text>
          <Text>$2,000.00 per month</Text>
          <Text h3>Property Description</Text>
          <Text> The ideal starter set upon on 25 acres of flat country, the choice is yours. Only 15 Minutes from
            Toowoomba you can enjoy a comfortable semi – rural lifestyle with multiple living areas.

            The spacious kitchen has ample storage space, an electric cooktop and oven. This solid brick home offers an
            open plan dining and living room that adjoins the carpeted formal lounge room, perfect for movie nights with
            family. The large deck is ideal for entertaining or just relaxing with a good book enjoying the breeze and
            the 25 acre outlook.

            There are four generously-sized bedrooms that are bright and airy and all 3 bedrooms have built in robes and
            are central the modern family bathroom. The master bedroom has a walk in robe and its own ensuite.

            Downstairs is a large rumpus/games room, which adjoins the oversized double car garage. Fully fenced and
            also a separate fenced house block, ample rainwater storage and a windmill perfect for stock water/garden
            irrigation. Don’t miss out on this fantastic opportunity! Call to arrange your inspection today! This home
            will be sold on or prior to Auction!</Text>
          <Text h4>Quick Information</Text>
          <Text h4>Amenities</Text>
          <Text h4>Facilities</Text>
          <Text h4>Attachments</Text>
        </ScrollView>
        <ActionButton
          buttonColor="#8e5cf1"
          onPress={() => {
            navigation.navigate(ROUTE_NAMES.MAPS)
          }}
          renderIcon = {this.renderIcon}
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
