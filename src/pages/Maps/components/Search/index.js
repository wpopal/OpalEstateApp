import React from 'react';
import {Input, Button, ListItem} from 'react-native-elements';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  Image,
} from 'react-native';
import styles from './style-search';
import {Slider} from 'react-native-elements';
import {Path, Svg} from 'react-native-svg';
import {TagSelect} from 'react-native-tag-select';
import RNPickerSelect from 'react-native-picker-select';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import axios from 'axios';
import {Params} from '@fortawesome/fontawesome-svg-core';
import RNPicker from '../../containers/MapView/RNModalPicker';
import {withNavigation} from 'react-navigation';
import GridList from 'react-native-grid-list';
import Geolocation from '@react-native-community/geolocation';
import {bindActionCreators} from 'redux';
import {Creators as mapMainCreators} from '../../../../store/ducks/mapMain';
import {connect} from 'react-redux';

var params = {
  geo_radius: '',
  amenities: '',
  cat: '',
  info: '',
  types: '',
  status: '',
  max_area: '',
  min_area: '',
  geo_long: '',
  geo_lat: '',
  max_price: '',
  min_price: '',
  search_text: '',
};

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.SearchBack = this.SearchBack.bind(this);
  }

  creUrl = l => {
    l = l.replace('localhost', '10.0.2.2');
    return l;
  };

  renderItem = ({item, index}) => {
    console.log('item', item);
    if (item.meta.opalestate_city_image) {
      return (
        <View style={styles.image}>
          <Image
            style={styles.image}
            source={{uri: this.creUrl(item.meta.opalestate_city_image[0])}}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.image}>
          <Image
            style={styles.image}
            source={{
              uri:
                'https://vtv1.mediacdn.vn/k:thumb_w/640/2015/26e3b3ac00000578-3006311-image-a-39-1427023392562-1427185816055/choang-ngop-voi-khung-canh-thanh-pho-dem-dieu-ki.jpg',
            }}
          />
        </View>
      );
    }
  };

  state = {
    dataSource: [],
    text: 'local',
    dataPlace: '',
    popular: [],
    max_area: '',
    min_area: '',
    max_price: '',
    min_price: '',
    geo_long: '',
    geo_lat: '',
    selectedText: 'Search.....',
    placeHolderText: 'Please Select Country',
    amenities: [],
    cat: [],
    status: [],
    info: [],
    types: [],
    forceRefresh: false,
  };

  componentDidMount(): void {
    this.getCity();
  }

  async getCity() {
    try {
      const posts = await axios({
        method: 'get',
        params: {
          consumer_key: 'ck_bd09789959d94c7021ec1719df2965d4b0053698',
          consumer_secret: 'cs_66aa5aad77dade62fb399435cff32dca3824ed9a',
        },
        url:
          'http://10.0.2.2/wordpress/latehome_free/wp-json/estate-api/v1/terms',
        headers: {
          'X-Custom-Header': 'foobar',
          Accept: 'application/json',
        },
      });
      console.log('postsxxxxxxxxxxxxx', posts);
      if (posts.data.status !== 200) {
        return [];
      } else {
        this.setState({popular: posts.data.collection.opalestate_city});
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  objToQueryString(obj) {
    const keyValuePairs = [];
    for (const key in obj) {
      keyValuePairs.push(
        encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]),
      );
    }
    return keyValuePairs.join('&');
  }

  SearchBack() {
    dataGet = {};
    for (let c in params) {
      if (params[c] === '') {
        delete params[c];
      }
    }
    const queryString = this.objToQueryString(params);

    fetch(
      `http://10.0.2.2/wordpress/latehome_free/wp-json/estate-api/v1/properties/search/?${queryString}`,
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log('adasasdasdasdasdasdasdsa', this.props, responseJson);
        if (responseJson.status === 200) {
          this.props.navigation.state.params.getdataMap({
            local: {geo_long: params.geo_long, geo_lat: params.geo_lat},
            data: responseJson.collection,
          });
          this.props.navigation.goBack();
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  findCoordinates = () => {
    Geolocation.getCurrentPosition(info => console.log(info));
  };

  _selectedValue(index, name) {
    this.setState({selectedText: name});
    console.log('ssadsdas', index, name);
  }

  render() {
    console.log('this.props;', this.state.popular.length);
    return (
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              paddingBottom: 0,
              justifyContent: 'flex-end',
            }}>
            <View style={{marginLeft: 2, width: '8%'}} />
            <RNPicker
              dataSource={this.state.dataSource}
              dummyDataSource={this.state.dataSource}
              defaultValue={false}
              pickerTitle={'Country Picker'}
              showSearchBar={true}
              disablePicker={false}
              changeAnimation={'none'}
              searchBarPlaceHolder={'Search.....'}
              showPickerTitle={true}
              searchBarContainerStyle={this.props.searchBarContainerStyle}
              pickerStyle={styles.pickerStyle}
              selectedLabel={this.state.selectedText}
              placeHolderLabel={this.state.placeHolderText}
              selectLabelTextStyle={styles.selectLabelTextStyle}
              placeHolderTextStyle={styles.placeHolderTextStyle}
              dropDownImageStyle={styles.dropDownImageStyle}
              dropDownImage={require('../../containers/MapView/ic_drop_down.png')}
              selectedValue={(index, name) => this._selectedValue(index, name)}
              onChangeText={text => {
                console.log(text);
              }}
            />
          </View>
          <TouchableOpacity
            onPress={this.findCoordinates}
            style={{
              flexDirection: 'row',
              paddingTop: 13,
              paddingBottom: 13,
              borderBottomColor: '#EEEEEE',
              borderBottomWidth: 1,
              borderStyle: 'solid',
            }}>
            <View style={{marginLeft: 2, width: '10%'}}>
              <Svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <Path
                  d="M0 6.26667L6.8 8.93333L9.8 16L16 0L0 6.26667Z"
                  fill="#272B2E"
                />
              </Svg>
            </View>
            <View style={{width: '90%'}}>
              <Text>Use my current location</Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              paddingTop: 13,
              paddingBottom: 13,
              borderBottomColor: '#EEEEEE',
              borderBottomWidth: 1,
              borderStyle: 'solid',
            }}>
            <View style={{marginLeft: 2, width: '10%'}}>
              <Svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <Path
                  d="M10.5333 0H8.93333V1.6H3.13333L0 4.73334L3.13333 7.86667H8.93333V14.1333H0.333333V15.7333H16V14.1333H10.5333V7.86667H16V1.6H10.5333V0ZM14.4 6.26667H3.73333L2.2 4.73334L3.8 3.13333H14.4667V6.26667H14.4Z"
                  fill="#272B2E"
                />
              </Svg>
            </View>
            <View style={{width: '90%'}}>
              <Text>Popular Cities</Text>
            </View>
          </View>
          <View style={styles.container}>
            {this.state.popular.length ? (
              <GridList
                data={this.state.popular}
                numColumns={2}
                renderItem={this.renderItem}
              />
            ) : (
              <View />
            )}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  console.log('state', state);
  return {
    mapMainRequest: state.mapMain,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(mapMainCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(Search));
