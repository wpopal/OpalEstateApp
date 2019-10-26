import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Animated,
  Picker,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import {debounce} from 'lodash';
import MapView, {Marker} from 'react-native-maps';
import {mapMarker} from '../../constants/assets';
import {findPlaceFromLatLng} from '../../services/google.service';
import styles from './styles';
import Geolocation from '@react-native-community/geolocation';
import RNPicker from './RNModalPicker';
import {withNavigation} from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';
import {Path, Svg, G, Defs, ClipPath} from 'react-native-svg';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

const latitudeDelta = 0.025;
const longitudeDelta = 0.025;
const {height: viewportHeight} = Dimensions.get('window');

class HomeLocator extends Component {
  static defaultProps = {
    draggableRange: {top: viewportHeight - 70, bottom: 30},
  };

  constructor() {
    super();
    this.state = {
      forceRefresh: true,
      value: null,
      items: [
        {key: 1, section: true, label: 'Fruits'},
        {key: 2, label: 'Red Apples'},
        {key: 3, label: 'Cherries'},
        {key: 4, label: 'Cranberries'},
        {key: 5, label: 'Pink Grapefruit'},
        {key: 6, label: 'Raspberries'},
        {key: 7, section: true, label: 'Vegetables'},
        {key: 8, label: 'Beets'},
        {key: 9, label: 'Red Peppers'},
        {key: 10, label: 'Radishes'},
        {key: 11, label: 'Radicchio'},
        {key: 12, label: 'Red Onions'},
        {key: 13, label: 'Red Potatoes'},
        {key: 14, label: 'Rhubarb'},
        {key: 15, label: 'Tomatoes'},
      ],
      dataMap: [],
      search: '',
      region: {
        latitude: 10.780889,
        longitude: 106.629271,
        latitudeDelta,
        longitudeDelta,
      },
      isPanding: false,
      openModal: false,
      dataSource: [],
      placeHolderText: 'Please Select Country',
      selectedText: 'Search.....',
      selectedFlag: false,
      defaultValue: true,
      select: '',
    };
    this.onPanDrag = debounce(this.onPanDrag, 1000, {
      leading: true,
      trailing: false,
    });
  }
  _selectedValue(index, name) {
    this.setState({selectedText: name});
    console.log('ssadsdas', index, name);
  }
  onSelectedItemsChange = (key, value) => {
    console.log(key, value);
  };

  componentDidMount() {
    SplashScreen.hide();
    Geolocation.getCurrentPosition(
      position => {
        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta,
          longitudeDelta,
        };
        this.onRegionChangeComplete(region);
      },
      error => {},
      {enableHighAccuracy: false},
    );
  }

  onRegionChangeComplete = async region => {
    const {data} = await findPlaceFromLatLng(
      `${region.latitude},${region.longitude}`,
    );
    const newState = {
      region,
      isPanding: false,
    };
    if (data.status === 'OK') {
      newState.text = data.results[0].formatted_address;
    }
    this.setState(newState);
  };

  onPanDrag = () => {
    const {isPanding} = this.state;
    if (isPanding) {
      return;
    }
    this.setState({
      isPanding: true,
    });
  };
  _draggedValue = new Animated.Value(30);

  reRenderMap = data => {
    console.log('data', data);
    if (data.geo_lat) {
      console.log('22222');
      this.setState({
        forceRefresh: !this.state.forceRefresh,
        dataMap: data.data,
        region: {
          longitude: Number(data.geo_long),
          latitude: Number(data.geo_lat),
          latitudeDelta,
          longitudeDelta,
        },
      });
    } else {
      console.log('11111');
      this.setState({
        forceRefresh: !this.state.forceRefresh,
        dataMap: data.data,
        region: {
          longitude: Number(data.data[0].map.longitude),
          latitude: Number(data.data[0].map.latitude),
          latitudeDelta,
          longitudeDelta,
        },
      });
    }
  };

  render() {
    const {region, isPanding, text, openModal} = this.state;
    const {top, bottom} = this.props.draggableRange;
    const {search} = this.state;
    const backgoundOpacity = this._draggedValue.interpolate({
      inputRange: [viewportHeight, viewportHeight],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    const options = [
      {value: 0, label: '0'},
      {value: 1, label: '1'},
      {value: 2, label: '2'},
      {value: 3, label: '3'},
    ];
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <View
          style={{
            position: 'absolute',
            zIndex: 999999,
            backgroundColor: '#fff',
            width: '100%',
            paddingBottom: 10,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.0,

            elevation: 1,
          }}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{marginLeft: '2%'}}>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={RFPercentage(5)}
                height={RFPercentage(3)}
                fill="none"
                viewBox="0 0 20 18">
                <Path
                  fill="#6923E7"
                  d="M9 3.417h9.833c.584 0 1.084-.5 1.084-1.084 0-.583-.5-1.083-1.084-1.083H9c-.583 0-1.083.5-1.083 1.083 0 .667.5 1.084 1.083 1.084zM18.917 7.833H9c-.583 0-1.083.5-1.083 1.084C7.917 9.5 8.417 10 9 10h9.833c.584 0 1.084-.5 1.084-1.083.083-.584-.417-1.084-1-1.084zM18.917 14.417H9c-.583 0-1.083.5-1.083 1.083s.5 1.083 1.083 1.083h9.833c.584 0 1.084-.5 1.084-1.083.083-.583-.417-1.083-1-1.083zM4.583 1.5H3.25L2.833.25A.458.458 0 002.417 0c-.084 0-.25.083-.334.25L1.667 1.5H.333c-.166 0-.25.083-.333.25 0 .167 0 .333.167.417l1.083.75L.833 4.25c-.083.167 0 .25.084.417.166.083.333.083.416 0l1.084-.75 1.083.75c.083.083.167.083.25.083.083 0 .167 0 .25-.083.083-.167.167-.25.083-.417L3.667 3l1.083-.75c.167-.083.167-.25.167-.417-.084-.25-.25-.333-.334-.333zM3.667 7.333H1.25c-.25 0-.417.167-.417.334v2.416c0 .167.167.334.334.334h2.416a.359.359 0 00.334-.334V7.667c.166-.167 0-.334-.25-.334zM3.667 13.917H1.25a.358.358 0 00-.333.333v2.417c0 .166.166.333.333.333h2.417A.358.358 0 004 16.667V14.25c.083-.167-.083-.333-.333-.333z"
                />
              </Svg>
            </View>
            <View style={{width: '77%'}}>
              <View>
                <TouchableOpacity
                  disabled={false}
                  onPress={() =>
                    this.props.navigation.navigate('SEARCH', {
                      getdataMap: this.reRenderMap,
                    })
                  }
                  activeOpacity={0.7}>
                  <View>
                    <View style={styles.pickerStyle}>
                      <Svg
                        style={{marginLeft: 10}}
                        width={RFPercentage(4)}
                        height={RFPercentage(2)}
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <Path
                          d="M17.7 16.425L14.4 13.125C16.95 9.975 16.725 5.25 13.8 2.4C12.3 0.9 10.275 0 8.1 0C5.925 0 3.9 0.825 2.4 2.4C0.9 3.9 0 5.925 0 8.1C0 10.275 0.825 12.3 2.4 13.8C3.9 15.3 5.925 16.2 8.1 16.2C9.9 16.2 11.7 15.6 13.125 14.4L16.425 17.7C16.575 17.85 16.8 18 17.025 18C17.25 18 17.475 17.925 17.625 17.7C18.075 17.325 18.075 16.8 17.7 16.425ZM14.4 8.025C14.4 9.675 13.725 11.25 12.6 12.45C11.475 13.65 9.825 14.25 8.175 14.25C6.525 14.25 4.95 13.575 3.75 12.45C2.55 11.325 1.8 9.75 1.8 8.025C1.8 6.3 2.475 4.8 3.6 3.6C4.725 2.4 6.375 1.8 8.025 1.8C9.675 1.8 11.25 2.475 12.45 3.6C13.65 4.725 14.4 6.375 14.4 8.025Z"
                          fill="#AEB3BA"
                        />
                      </Svg>
                      <Text style={styles.textStyle}>
                        {this.state.selectedText}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              {/*<RNPicker*/}
              {/*  dataSource={this.state.dataSource}*/}
              {/*  dummyDataSource={this.state.dataSource}*/}
              {/*  defaultValue={false}*/}
              {/*  pickerTitle={'Country Picker'}*/}
              {/*  showSearchBar={true}*/}
              {/*  disablePicker={false}*/}
              {/*  changeAnimation={'none'}*/}
              {/*  searchBarPlaceHolder={'Search.....'}*/}
              {/*  showPickerTitle={true}*/}
              {/*  searchBarContainerStyle={this.props.searchBarContainerStyle}*/}
              {/*  pickerStyle={styles.pickerStyle}*/}
              {/*  selectedLabel={this.state.selectedText}*/}
              {/*  placeHolderLabel={this.state.placeHolderText}*/}
              {/*  selectLabelTextStyle={styles.selectLabelTextStyle}*/}
              {/*  placeHolderTextStyle={styles.placeHolderTextStyle}*/}
              {/*  dropDownImageStyle={styles.dropDownImageStyle}*/}
              {/*  dropDownImage={require('./ic_drop_down.png')}*/}
              {/*  selectedValue={(index, name) =>*/}
              {/*    this._selectedValue(index, name)*/}
              {/*  }*/}
              {/*  onChangeText={text => {*/}
              {/*    console.log(text);*/}
              {/*  }}*/}
              {/*/>*/}
            </View>
            <View style={{marginRight: '2%'}}>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={RFPercentage(5)}
                height={RFPercentage(3)}
                fill="none"
                viewBox="0 0 20 17">
                <G fill="#6923E7" clip-path="url(#clip0)">
                  <Path d="M4 8C1.75 8 0 6.167 0 4s1.75-4 4-4c1.75 0 3.25 1.083 3.75 2.833v.084h11.167C19.5 2.917 20 3.417 20 4s-.5 1.083-1.083 1.083H7.833v.084C7.25 6.833 5.75 8 4 8zm0-5.833C3 2.167 2.167 3 2.167 4S3 5.833 4 5.833 5.833 5 5.833 4 5 2.167 4 2.167zM16 16.417c-1.75 0-3.25-1.084-3.75-2.834V13.5H1.083C.5 13.5 0 13.083 0 12.5s.5-1.083 1.083-1.083H12.25v-.084C12.75 9.667 14.333 8.5 16 8.5c2.167 0 4 1.75 4 4s-1.75 3.917-4 3.917zm0-5.75c-1 0-1.833.833-1.833 1.833S15 14.333 16 14.333s1.833-.833 1.833-1.833S17 10.667 16 10.667z" />
                </G>
                <Defs>
                  <ClipPath id="clip0">
                    <Path fill="#fff" d="M0 0H20V16.417H0z" />
                  </ClipPath>
                </Defs>
              </Svg>
            </View>
          </View>
          <View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.viewPic}>
                  <Picker
                    selectedValue={''}
                    style={styles.pic}
                    onValueChange={(itemValue, itemIndex) =>
                      console.log(itemValue, itemIndex)
                    }>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                  </Picker>
                </View>
                <View style={styles.viewPic}>
                  <Picker
                    selectedValue={''}
                    style={styles.pic}
                    onValueChange={(itemValue, itemIndex) =>
                      console.log(itemValue, itemIndex)
                    }>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                  </Picker>
                </View>
                <View style={styles.viewPic}>
                  <Picker
                    selectedValue={''}
                    style={styles.pic}
                    onValueChange={(itemValue, itemIndex) =>
                      console.log(itemValue, itemIndex)
                    }>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                  </Picker>
                </View>
                <View style={styles.viewPic}>
                  <Picker
                    selectedValue={''}
                    style={styles.pic}
                    onValueChange={(itemValue, itemIndex) =>
                      console.log(itemValue, itemIndex)
                    }>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                  </Picker>
                </View>
                <View style={styles.viewPic}>
                  <Picker
                    selectedValue={''}
                    style={styles.pic}
                    onValueChange={(itemValue, itemIndex) =>
                      console.log(itemValue, itemIndex)
                    }>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                  </Picker>
                </View>
                <View style={styles.viewPic}>
                  <Picker
                    selectedValue={''}
                    style={styles.pic}
                    onValueChange={(itemValue, itemIndex) =>
                      console.log(itemValue, itemIndex)
                    }>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                  </Picker>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
        <View style={styles.mapWrapper}>
          <MapView
            key={this.state.forceRefresh}
            ref={map => (this.map = map)}
            initialRegion={region}
            style={styles.map}
            showsUserLocation={true}
            followUserLocation={true}
            loadingEnabled={true}
            onPanDrag={this.onPanDrag}
            onRegionChangeComplete={this.onRegionChangeComplete}>
            {this.state.dataMap.map(item => {
              return (
                <Marker
                  key={item.id}
                  coordinate={{
                    latitude: Number(item.map.latitude),
                    longitude: Number(item.map.longitude),
                  }}
                  title={item.name}
                  description={item.content}
                />
              );
            })}
          </MapView>
        </View>
        <View
          style={[styles.markerFixed, isPanding ? styles.isPanding : null]}
          pointerEvents="none">
          <Image
            style={styles.marker}
            resizeMode="contain"
            source={mapMarker}
          />
        </View>
      </View>
    );
  }
}

export default withNavigation(HomeLocator);
