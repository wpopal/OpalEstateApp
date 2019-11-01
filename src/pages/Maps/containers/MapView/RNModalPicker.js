import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  Modal,
  Image,
  FlatList,
  Platform,
  StyleSheet,
  TouchableOpacity,
  I18nManager,
  TextInput,
  ScrollView,
} from 'react-native';
import {Path, Svg} from 'react-native-svg';
import {RFPercentage} from 'react-native-responsive-fontsize';
var i = 0;
export default class RNModalPicker extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      selectedFlag: this.props.defaultValue,
      dataSource: [],
    };
  }

  componentDidMount() {
    this.setState({dataSource: this.props.dataSource});
  }

  static _setDefaultValue(
    defaultText,
    pickerStyle,
    textStyle,
    dropDownImageStyle,
    dropDownImage,
  ) {
    return (
      <View style={pickerStyle}>
        <View style={dropDownImageStyle}>
          <Svg
            width={RFPercentage(3.5)}
            height={RFPercentage(3)}
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <Path
              d="M17.7 16.425L14.4 13.125C16.95 9.975 16.725 5.25 13.8 2.4C12.3 0.9 10.275 0 8.1 0C5.925 0 3.9 0.825 2.4 2.4C0.9 3.9 0 5.925 0 8.1C0 10.275 0.825 12.3 2.4 13.8C3.9 15.3 5.925 16.2 8.1 16.2C9.9 16.2 11.7 15.6 13.125 14.4L16.425 17.7C16.575 17.85 16.8 18 17.025 18C17.25 18 17.475 17.925 17.625 17.7C18.075 17.325 18.075 16.8 17.7 16.425ZM14.4 8.025C14.4 9.675 13.725 11.25 12.6 12.45C11.475 13.65 9.825 14.25 8.175 14.25C6.525 14.25 4.95 13.575 3.75 12.45C2.55 11.325 1.8 9.75 1.8 8.025C1.8 6.3 2.475 4.8 3.6 3.6C4.725 2.4 6.375 1.8 8.025 1.8C9.675 1.8 11.25 2.475 12.45 3.6C13.65 4.725 14.4 6.375 14.4 8.025Z"
              fill="#AEB3BA"
            />
          </Svg>
        </View>
        <Text style={textStyle}>{defaultText}</Text>
      </View>
    );
  }

  static _setSelectedValue(
    defaultText,
    pickerStyle,
    textStyle,
    dropDownImageStyle,
    dropDownImage,
  ) {
    return (
      <View style={pickerStyle}>
        <Text style={textStyle}>{defaultText}</Text>
        <Image
          style={dropDownImageStyle}
          resizeMode="contain"
          source={dropDownImage}
        />
      </View>
    );
  }

  _searchFilterFunction(searchText) {
    console.log('searchText', searchText);
    fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchText}&key=AIzaSyDJU0Yxzl2ivG6icS_110NxaPZfsXQyzZ4&sessiontoken=1234567890`,
      {
        method: 'GET',
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log('predictions', responseJson);
        if (responseJson.status === 'OK') {
          this.setState({
            dataSource: responseJson.predictions,
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  _renderItemListValues(item, index) {
    return (
      <TouchableOpacity
        key={index}
        activeOpacity={1}
        style={styles.listRowClickTouchStyle}
        onPress={() => this._setSelectedIndex(item.place_id, item.description)}>
        <View key={item.id} style={styles.listRowContainerStyle}>
          <Text style={styles.listTextViewStyle}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  _setSelectedIndex(id, name) {
    fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&fields=name,geometry&key=AIzaSyDJU0Yxzl2ivG6icS_110NxaPZfsXQyzZ4`,
      {
        method: 'GET',
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log('responseJson', responseJson);
        if (responseJson.status === 'OK') {
          this.props.selectedValue(
            {
              geo_long: responseJson.result.geometry.location.lng,
              geo_lat: responseJson.result.geometry.location.lat,
            },
            name,
          );
        }
        // params.geo_long = responseJson.result.geometry.location.lng;
        // params.geo_lat = responseJson.result.geometry.location.lat;

        this.setState({selectedFlag: true});
        this.setState({modalVisible: false});
      })
      .catch(error => {
        console.error(error);
      });
  }

  _searchMaps(e) {
    this.setState({text: e});
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        {this.state.selectedFlag ? (
          <View>
            <TouchableOpacity
              disabled={this.props.disablePicker}
              onPress={() => this.setState({modalVisible: true})}
              activeOpacity={0.7}>
              <View>
                {RNModalPicker._setSelectedValue(
                  this.props.selectedLabel,
                  this.props.pickerStyle,
                  this.props.selectLabelTextStyle,
                  this.props.dropDownImageStyle,
                  this.props.dropDownImage,
                )}
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity
              disabled={this.props.disablePicker}
              style={styles.picker}
              onPress={() => this.setState({modalVisible: true})}
              activeOpacity={0.7}>
              <View>
                {RNModalPicker._setDefaultValue(
                  this.props.placeHolderLabel,
                  this.props.pickerStyle,
                  this.props.placeHolderTextStyle,
                  this.props.dropDownImageStyle,
                  this.props.dropDownImage,
                )}
              </View>
            </TouchableOpacity>
          </View>
        )}

        <Modal
          visible={this.state.modalVisible}
          transparent={true}
          animationType={this.props.changeAnimation}
          onRequestClose={() => this.setState({modalVisible: false})}>
          <View style={styles.container}>
            <View style={styles.listDataContainerStyle}>
              <View style={styles.pickerTitleContainerStyle}>
                {this.props.showPickerTitle ? (
                  <Text style={styles.pickerTitleTextStyle}>
                    {' '}
                    {this.props.pickerTitle}
                  </Text>
                ) : null}

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => this.setState({modalVisible: false})}>
                  <Image
                    resizeMode="contain"
                    style={styles.crossImageStyle}
                    source={require('./ic_cancel_grey.png')}
                  />
                </TouchableOpacity>
              </View>
              {this.props.showSearchBar ? (
                <View style={styles.searchBarContainerStyle}>
                  {/* <Image
                          resizeMode="contain"
                          style={styles.iconGPSStyle}
                          source={Images.ic_search}
                        /> */}

                  <TextInput
                    onChangeText={text =>
                      this._searchFilterFunction(
                        text,
                        this.props.dummyDataSource,
                      )
                    }
                    placeholder={'Search'}
                    style={styles.textInputStyle}
                    placeholderTextColor={'#909090'}
                    underlineColorAndroid="transparent"
                    keyboardType="default"
                    returnKeyType={'done'}
                    blurOnSubmit={true}
                  />
                </View>
              ) : null}

              <FlatList
                style={styles.flatListStyle}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                extraData={this.state}
                overScrollMode="never"
                keyboardShouldPersistTaps="always"
                numColumns={1}
                data={this.state.dataSource}
                renderItem={({item, index}) =>
                  this._renderItemListValues(item, index)
                }
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
RNModalPicker.defaultProps = {
  defaultValue: false,
  showSearchBar: false,
  showPickerTitle: false,
  disablePicker: false,
  changeAnimation: 'slide',
  dropDownImage: require('./ic_drop_down.png'),
  placeHolderLabel: 'Please select value from picker',
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectLabelTextStyle: {
    color: '#000',
    textAlign: 'left',
    width: '99%',
    padding: 10,
    flexDirection: 'row',
  },
  placeHolderTextStyle: {
    color: '#D3D3D3',
    padding: 10,
    textAlign: 'left',
    width: '99%',
    flexDirection: 'row',
  },
  dropDownImageStyle: {
    width: 10,
    height: 10,
    alignSelf: 'center',
  },
  pickerStyle: {
    marginLeft: 18,
    paddingRight: 25,
    marginRight: 10,
    marginBottom: 2,
    shadowRadius: 1,
    shadowOpacity: 1.0,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    borderColor: '#303030',
    shadowColor: '#303030',
    borderRadius: 5,
    elevation: 1,
    flexDirection: 'row',
  },
};
RNModalPicker.propTypes = {
  placeHolderLabel: PropTypes.any,
  selectedLabel: PropTypes.any,
  pickerTitle: PropTypes.any,
  dataSource: PropTypes.any,
  dummyDataSource: PropTypes.any,
  dropDownImage: PropTypes.number,
  defaultSelected: PropTypes.any,
  defaultValue: PropTypes.bool,
  showSearchBar: PropTypes.bool,
  showPickerTitle: PropTypes.bool,
  disablePicker: PropTypes.bool,
  changeAnimation: PropTypes.string,
  dropDownImageStyle: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
    PropTypes.array,
  ]),

  selectLabelTextStyle: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
    PropTypes.array,
  ]),
  placeHolderTextStyle: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
    PropTypes.array,
  ]),
  textStyle: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
    PropTypes.array,
  ]),
  pickerStyle: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
    PropTypes.array,
  ]),
};
const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'center',
  },
  pickerTitleContainerStyle: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  searchBarContainerStyle: {
    marginBottom: 10,
    flexDirection: 'row',
    height: 40,
    shadowRadius: 1,
    shadowOpacity: 1.0,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    borderColor: '#303030',
    shadowColor: '#303030',
    borderRadius: 5,
    elevation: 1,
    marginLeft: 10,
    marginRight: 10,
  },

  flatListStyle: {
    maxHeight: '85%',
    minHeight: '35%',
  },
  iconGPSStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    height: 20,
    width: 20,
    margin: 5,
    transform: [
      {
        scaleX: I18nManager.isRTL ? -1 : 1,
      },
    ],
  },

  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
  },
  listRowContainerStyle: {
    width: '100%',
    justifyContent: 'center',
  },
  textInputStyle: {
    color: 'black',
    paddingLeft: 15,
    marginTop: Platform.OS == 'ios' ? 10 : 0,
    marginBottom: Platform.OS == 'ios' ? 10 : 0,
    alignSelf: 'center',
    flex: 1,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  crossImageStyle: {
    width: 40,
    height: 40,
    marginTop: -4,

    marginRight: -7,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    alignSelf: 'flex-end',
  },

  listDataContainerStyle: {
    alignSelf: 'center',
    width: '90%',
    borderRadius: 10,
    maxHeight: '80%',
    backgroundColor: 'white',
  },

  listTextViewStyle: {
    color: '#000',
    marginVertical: 10,
    flex: 0.9,
    marginLeft: 20,
    marginHorizontal: 10,
    textAlign: 'left',
  },
  listRowClickTouchStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },

  pickerTitleTextStyle: {
    fontSize: 18,
    flex: 1,
    paddingBottom: 10,
    marginLeft: 40,
    color: '#000',
    textAlign: 'center',
  },
});
