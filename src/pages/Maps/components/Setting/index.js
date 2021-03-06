import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import styles from './style-search';
import {Path, Svg, Circle} from 'react-native-svg';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import ChonseSelect from './chonseSelect';
import ChonseSelectRooms from './chonseSelectRooms';
import RNPickerSelect from 'react-native-picker-select';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import CheckBox from 'react-native-check-box';
import {updateParams, queryParams} from '../../../../database/allSchemas';
import {Button} from 'react-native-elements';
import RNRestart from 'react-native-restart';
import {bindActionCreators} from 'redux';
import {Creators as mapMainCreators} from '../../../../store/ducks/mapMain';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import AppText from '../../../Text-i18n';

const data = [
  {
    value: '0',
    label: 'Male',
  },
  {
    value: '1',
    label: 'Female',
  },
];
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
var params = {
  min_price: 0,
  max_price: 10000,
  min_area: 0,
  max_area: 10000,
  amenities: [],
  geo_radius: '',
  cat: '',
  info: {},
  types: '',
  status: '',
  labels: '',
  geo_long: '',
  geo_lat: '',
  search_text: '',
};

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.SearchBack = this.SearchBack.bind(this);
  }

  state = {
    dataSource: [],
    text: 'local',
    gender: '0',
    Bedrooms: '0',
    checked: true,
    Bathrooms: '0',
    CarSpace: '0',
    types: [],
    typesValue: '',
    max_price: '',
    max_area: '',
    min_price: '',
    info: [],
    min_area: '',
    dataSetting: {},
    dataMoreOp: [],
  };

  reSetSetting = () => {
    const reAmen = this.state.dataMoreOp;
    const reInfor = this.state.info;

    for (let i in reAmen) {
      reAmen[i].checked = false;
    }
    this.state.dataMoreOp = reAmen;

    for (let o in reInfor) {
      reInfor[o].value = '0';
    }

    this.state.gender = '0';
    this.state.typesValue = '';

    console.log('this.props', this.props);
    this.state.max_price = this.props.navigation.state.params.max_price
      ? Number(this.props.navigation.state.params.max_price.default)
      : 10000;
    this.state.max_area = this.props.navigation.state.params.max_area
      ? Number(this.props.navigation.state.params.max_area.default)
      : 10000;
    this.state.min_price = this.props.navigation.state.params.min_price
      ? Number(this.props.navigation.state.params.min_price.default)
      : 0;
    this.state.min_area = this.props.navigation.state.params.min_area
      ? Number(this.props.navigation.state.params.min_area.default)
      : 0;
    this.state.info = reInfor;
    this.setState(this.state);
    params.min_price = this.props.navigation.state.params.min_price
      ? Number(this.props.navigation.state.params.min_price.default)
      : 0;
    params.max_price = this.props.navigation.state.params.max_price
      ? Number(this.props.navigation.state.params.max_price.default)
      : 10000;

    params.min_area = this.props.navigation.state.params.min_area
      ? Number(this.props.navigation.state.params.min_area.default)
      : 0;
    params.max_area = this.props.navigation.state.params.max_area
      ? Number(this.props.navigation.state.params.max_area.default)
      : 10000;
    params.amenities = [];
    params.geo_radius = '';
    params.cat = '';
    params.info = {};
    params.types = '';
    params.status = '';
    params.labels = '';
  };

  componentWillMount(): void {
    if (Object.keys(this.props.navigation.state.params).length) {
      if (
        this.props.navigation.state.params.types.enable &&
        this.props.navigation.state.params.types.data.length
      ) {
        let dataSS = this.props.navigation.state.params.types.data;
        let typesS = [];
        for (let i in dataSS) {
          typesS.push({
            label: dataSS[i].name,
            value: dataSS[i].slug,
          });
        }
        this.state.types = typesS;
      }

      if (this.props.navigation.state.params.max_price.enable) {
        params.max_price =
          this.props.mapMainRequest.paramsSetting.max_price === ''
            ? Number(this.props.navigation.state.params.max_price.default)
            : this.props.mapMainRequest.paramsSetting.max_price;
        params.min_price =
          this.props.mapMainRequest.paramsSetting.min_price === ''
            ? Number(this.props.navigation.state.params.min_price.default)
            : this.props.mapMainRequest.paramsSetting.min_price;

        this.state.max_price =
          this.props.mapMainRequest.paramsSetting.max_price === ''
            ? Number(this.props.navigation.state.params.max_price.default)
            : this.props.mapMainRequest.paramsSetting.max_price;
        this.state.min_price =
          this.props.mapMainRequest.paramsSetting.min_price === ''
            ? Number(this.props.navigation.state.params.min_price.default)
            : this.props.mapMainRequest.paramsSetting.min_price;
      }

      if (this.props.navigation.state.params.max_area.enable) {
        params.max_area =
          this.props.mapMainRequest.paramsSetting.max_area === ''
            ? Number(this.props.navigation.state.params.max_area.default)
            : this.props.mapMainRequest.paramsSetting.max_area;
        params.min_area =
          this.props.mapMainRequest.paramsSetting.min_area === ''
            ? Number(this.props.navigation.state.params.min_area.default)
            : this.props.mapMainRequest.paramsSetting.min_area;

        this.state.max_area =
          this.props.mapMainRequest.paramsSetting.max_area === ''
            ? Number(this.props.navigation.state.params.max_area.default)
            : this.props.mapMainRequest.paramsSetting.max_area;
        this.state.min_area =
          this.props.mapMainRequest.paramsSetting.min_area === ''
            ? Number(this.props.navigation.state.params.min_area.default)
            : this.props.mapMainRequest.paramsSetting.min_area;
      }

      if (this.props.navigation.state.params.amenities.enable) {
        const dda = this.props.navigation.state.params.amenities.data;
        const dataAmen =
          this.props.mapMainRequest.paramsSetting.amenities !== ''
            ? JSON.parse(this.props.mapMainRequest.paramsSetting.amenities)
            : '';
        for (let i in dda) {
          if (dataAmen.indexOf(dda[i].slug) >= 0) {
            dda[i].checked = true;
          } else {
            dda[i].checked = false;
          }
        }
        this.state.dataMoreOp = dda;
      }
      this.state.gender =
        this.props.mapMainRequest.paramsSetting.labels === 'rented'
          ? '1'
          : this.props.mapMainRequest.paramsSetting.labels === 'sold'
          ? '2'
          : '0';
      this.state.typesValue = this.props.mapMainRequest.paramsSetting.types;

      if (this.props.navigation.state.params.info.length) {
        let infox = this.props.navigation.state.params.info;

        for (let z in infox) {
          if (this.props.mapMainRequest.paramsSetting.info !== '') {
            const dataInfo = JSON.parse(
              this.props.mapMainRequest.paramsSetting.info,
            );
            this.state.info.push({
              key: infox[z].key,
              name: infox[z].name,
              value: dataInfo[infox[z].key],
            });
          } else {
            this.state.info.push({
              key: infox[z].key,
              name: infox[z].name,
              value: '0',
            });
          }
        }
      }
    }

    this.setState(this.state);
    // this.setState({dataSetting: this.props.navigation.state.params});
  }

  componentDidMount(): void {}

  async SearchBack() {
    params.geo_long = this.props.mapMainRequest.geoLocal.longitude;
    params.geo_lat = this.props.mapMainRequest.geoLocal.latitude;
    params.city = this.props.mapMainRequest.PopularCiti;
    const dataUpdates = Object.assign({}, params);
    dataUpdates.info = JSON.stringify(params.info);
    dataUpdates.amenities = JSON.stringify(params.amenities);

    if (!params.types) {
      params.types = '';
    }
    await updateParams(dataUpdates)
      .then(item => {
        this.props.setSettingmapMainSuccess(item);
        this.props.navigation.goBack();
      })
      .catch(error => {
        console.log('error !', error);
      });
  }

  render() {
    ``;
    const data = [
      {
        value: '0',
        label: 'All',
        slug: '',
      },
      {
        value: '1',
        label: 'RENT',
        slug: 'rented',
      },
      {
        value: '2',
        label: 'SOLD',
        slug: 'sold',
      },
    ];
    return (
      <View style={styles.container}>
        <View
          style={{
            width: '100%',
            height: 50,
            flexDirection: 'row',
            backgroundColor: '#fff',
            paddingRight: 20,
            paddingLeft: 20,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Svg
              width="20"
              height="16"
              viewBox="0 0 20 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <Path
                d="M7.5 15.1667C7.25 15.1667 7 15.0833 6.83333 14.8333L0.25 8.16667C-0.0833333 7.83333 -0.0833333 7.25 0.25 6.91667L6.83333 0.25C7.08333 0.0833333 7.25 0 7.5 0C7.75 0 8 0.0833333 8.16667 0.25C8.33333 0.416667 8.41667 0.666667 8.41667 0.916667C8.41667 1.16667 8.33333 1.41667 8.16667 1.58333L3.08333 6.66667H19.0833C19.5833 6.66667 20 7.08333 20 7.58333C20 8.08333 19.5833 8.5 19.0833 8.5H3.08333L8.16667 13.5833C8.58333 14 8.5 14.5833 8.16667 14.9167C8 15.0833 7.75 15.1667 7.5 15.1667Z"
                fill="#6923E7"
              />
            </Svg>
          </TouchableOpacity>
          <AppText
            i18nKey={'SETTINGS_FILTERS'}
            style={{fontSize: RFPercentage(3)}}>
            FILTERS
          </AppText>
          <TouchableOpacity onPress={this.reSetSetting}>
            <AppText i18nKey={'SETTINGS_RESET'} style={{color: '#6923E7'}}>
              RESET
            </AppText>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: viewportHeight - 185,
            backgroundColor: '#F9F9FB',
            paddingLeft: 20,
            paddingRight: 20,
          }}>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <ChonseSelect
              style={{width: '100%', marginTop: 15}}
              height={50}
              data={data}
              initValue={this.state.gender}
              onPress={item => {
                params.labels = item.slug;
                this.setState({gender: item.value});
              }}
            />

            {this.state.types.length ? (
              <View>
                <Text style={{marginTop: 20}}>Property Type</Text>
                <View
                  style={{
                    marginTop: 5,
                    height: 45,
                    borderStyle: 'solid',
                    borderWidth: 1,
                    borderColor: '#EEEEEE',
                    backgroundColor: '#FFF',
                  }}>
                  <RNPickerSelect
                    value={this.state.typesValue}
                    onValueChange={value => {
                      params.types = value;

                      this.setState({typesValue: value});
                    }}
                    items={this.state.types}
                  />
                </View>
              </View>
            ) : (
              <View />
            )}
            {this.state.max_price !== '' && this.state.max_price !== 0 ? (
              <View
                style={{
                  marginTop: 10,
                  width: '100%',

                  height: 'auto',
                }}>
                <View style={{marginBottom: 10}}>
                  <Text style={{marginTop: 10}}>
                    Price: ${this.state.min_price} - ${this.state.max_price}
                  </Text>
                </View>
                <MultiSlider
                  selectedStyle={{
                    backgroundColor: 'rgb(144,134,193)',
                    width: '100%',
                  }}
                  unselectedStyle={{
                    backgroundColor: 'silver',
                    width: '100%',
                  }}
                  containerStyle={{
                    alignItems: 'center',
                    width: '100%',
                    paddingBottom: 10,
                    height: 'auto',
                  }}
                  trackStyle={{
                    height: 8,
                    width: '100%',
                  }}
                  customMarker={() => (
                    <Svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="23">
                      <Circle cx="18" cy="11.5" r="11.5" fill="#6923E7" />
                    </Svg>
                  )}
                  values={[this.state.min_price, this.state.max_price]}
                  onValuesChange={item => {
                    params.min_price = item[0];
                    params.max_price = item[1];
                    this.setState({min_price: item[0], max_price: item[1]});
                  }}
                  step={1000}
                  min={Number(
                    this.props.navigation.state.params.min_price.default,
                  )}
                  max={Number(
                    this.props.navigation.state.params.max_price.default,
                  )}
                  touchDimensions={{
                    height: 80,
                    width: 40,
                    borderRadius: 20,
                    slipDisplacement: 60,
                  }}
                  sliderLength={viewportWidth - 70}
                />
              </View>
            ) : (
              <View />
            )}
            {this.state.max_area !== '' && this.state.max_area !== 0 ? (
              <View
                style={{
                  marginTop: 10,
                  width: '100%',

                  height: 'auto',
                }}>
                <View style={{marginBottom: 10}}>
                  <Text style={{marginTop: 10}}>
                    Land Size (sqft): {this.state.min_area} -{' '}
                    {this.state.max_area}
                  </Text>
                </View>
                <MultiSlider
                  selectedStyle={{
                    backgroundColor: 'rgb(144,134,193)',
                    width: '100%',
                  }}
                  unselectedStyle={{
                    backgroundColor: 'silver',
                    width: '100%',
                  }}
                  containerStyle={{
                    alignItems: 'center',
                    width: '100%',
                    paddingBottom: 10,
                    height: 'auto',
                  }}
                  trackStyle={{
                    height: 8,
                    width: '100%',
                  }}
                  customMarker={() => (
                    <Svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="23">
                      <Circle cx="18" cy="11.5" r="11.5" fill="#6923E7" />
                    </Svg>
                  )}
                  values={[this.state.min_area, this.state.max_area]}
                  onValuesChange={item => {
                    params.min_area = item[0];
                    params.max_area = item[1];
                    this.setState({min_area: item[0], max_area: item[1]});
                  }}
                  step={10}
                  min={Number(
                    this.props.navigation.state.params.min_area.default,
                  )}
                  max={Number(
                    this.props.navigation.state.params.max_area.default,
                  )}
                  touchDimensions={{
                    height: 80,
                    width: 40,
                    borderRadius: 20,
                    slipDisplacement: 60,
                  }}
                  sliderLength={viewportWidth - 70}
                />
              </View>
            ) : (
              <View />
            )}
            {this.state.info.length ? (
              this.state.info.map(item => (
                <View key={item.key}>
                  <Text style={{marginTop: 20}}>{item.name}</Text>
                  <ChonseSelectRooms
                    style={{width: '100%', marginTop: 10}}
                    height={40}
                    data={[
                      {
                        value: '0',
                        label: 'Any',
                      },
                      {
                        value: '1',
                        label: '+1',
                      },
                      {
                        value: '2',
                        label: '+2',
                      },
                      {
                        value: '3',
                        label: '+3',
                      },
                      {
                        value: '4',
                        label: '+4',
                      },
                      {
                        value: '5',
                        label: '+5',
                      },
                    ]}
                    initValue={item.value}
                    onPress={xx => {
                      for (let t in this.state.info) {
                        if (this.state.info[t].key === item.key) {
                          this.state.info[t].value = xx.value;
                          params.info[item.key] = xx.value;
                        }
                      }
                      this.setState(this.state);
                    }}
                  />
                </View>
              ))
            ) : (
              <View />
            )}
            {this.state.dataMoreOp.length > 0 ? (
              this.state.dataMoreOp.map((item, index) => {
                return (
                  <CheckBox
                    key={index}
                    style={{flex: 1, paddingTop: 10, paddingBottom: 10}}
                    checkBoxColor={'#7159C1'}
                    checkedCheckBoxColor={'#7159C1'}
                    onClick={() => {
                      this.state.dataMoreOp[index].checked = !this.state
                        .dataMoreOp[index].checked;
                      this.setState(this.state);
                      params.amenities = [];
                      for (let x in this.state.dataMoreOp) {
                        if (this.state.dataMoreOp[x].checked) {
                          params.amenities.push(this.state.dataMoreOp[x].slug);
                        }
                      }
                    }}
                    isChecked={this.state.dataMoreOp[index].checked}
                    leftText={item.name}
                  />
                );
              })
            ) : (
              <View />
            )}
          </ScrollView>
        </View>
        <View
          style={{
            width: '100%',
            paddingRight: 20,
            paddingLeft: 20,
            paddingTop: 10,
            height: 123,
            zIndex: 999999,
          }}>
          <Button
            title="APPLY"
            onPress={this.SearchBack}
            buttonStyle={{marginBottom: 10, backgroundColor: '#6923E7'}}
          />
          {/*<Button*/}
          {/*  title="Save this search"*/}
          {/*  type="outline"*/}
          {/*  titleStyle={{color: '#6923E7'}}*/}
          {/*  buttonStyle={{borderColor: '#6923E7', borderWidth: 2}}*/}
          {/*/>*/}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
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
