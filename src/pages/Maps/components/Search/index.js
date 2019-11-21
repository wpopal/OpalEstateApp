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
  ImageBackground,
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
import {upDateGeoLocal} from '../../../../database/allSchemas';
import RNRestart from 'react-native-restart';
import {
  Base_url,
  consumer_key,
  consumer_secret,
} from '../../../../config/setting';

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
    this.setLocal = this.setLocal.bind(this);
  }

  creUrl = l => {
    l = l.replace('localhost', '10.0.2.2');
    return l;
  };

  renderItem = ({item, index}) => {
    if (item.meta.opalestate_city_image) {
      return (
        <View style={styles.image}>
          <TouchableOpacity onPress={() => this.findPopularCities(item)}>
            <ImageBackground
              imageStyle={{
                justifyContent: 'flex-end',
                alignItems: 'center',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                borderWidth: 1,
                borderColor: '#fff',
              }}
              style={{
                width: '100%',
                height: '100%',
              }}
              source={{uri: this.creUrl(item.meta.opalestate_city_image[0])}}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  width: '100%',
                  height: '30%',
                  backgroundColor: '#000',
                  opacity: 0.2,
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  width: '100%',
                  height: '30%',
                }}>
                <Text
                  style={{
                    opacity: 1,
                    color: '#fff',
                    fontWeight: 'bold',
                  }}>
                  {item.name}
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.image}>
          <TouchableOpacity onPress={() => this.findPopularCities(item)}>
            <ImageBackground
              imageStyle={{
                justifyContent: 'flex-end',
                alignItems: 'center',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                borderWidth: 1,
                borderColor: '#fff',
              }}
              style={{
                width: '100%',
                height: '100%',
              }}
              source={{
                uri:
                  'https://vtv1.mediacdn.vn/k:thumb_w/640/2015/26e3b3ac00000578-3006311-image-a-39-1427023392562-1427185816055/choang-ngop-voi-khung-canh-thanh-pho-dem-dieu-ki.jpg',
              }}>
              <View
                style={{
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  width: '100%',
                  height: '20%',
                }}>
                <Text style={{color: '#fff', fontWeight: 'bold'}}>
                  {item.name}
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
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
          consumer_key: consumer_key,
          consumer_secret: consumer_secret,
        },
        url: Base_url + '/wp-json/estate-api/v1/terms',
        headers: {
          'X-Custom-Header': 'foobar',
          Accept: 'application/json',
        },
      });
      if (posts.data.status !== 200) {
        return [];
      } else {
        this.setState({popular: posts.data.collection.opalestate_city});
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  findCoordinates = () => {
    Geolocation.getCurrentPosition(info => this.setLocal(info));
  };

  findPopularCities = Geolocal => {
    console.log('Geolocal', Geolocal);
    this.props.setPopularCiti(Geolocal.slug);
    this.props.navigation.navigate('MAP');
  };

  async setLocal(data) {
    console.log('data', data);
    const item = {
      latitude: data.coords.latitude,
      longitude: data.coords.longitude,
    };
    await upDateGeoLocal(
      JSON.stringify({
        latitude: data.coords.latitude,
        longitude: data.coords.longitude,
      }),
    )
      .then(item => {
        console.log(this.props);
        this.props.setGeo({
          latitude: data.coords.latitude,
          longitude: data.coords.longitude,
        });
        this.props.navigation.navigate('MAP');
      })
      .catch(error => {
        console.log('error !', error);
      });
  }

  _selectedValue(index, name) {
    console.log(' this.state.selectedText', this.state.selectedText);
    params.search_text = name;
    this.props.setSettingmapMainSuccess(params);
    this.setState({selectedText: name});
    console.log('ssadsdas', index, name);
    this.props.navigation.navigate('MAP');
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
