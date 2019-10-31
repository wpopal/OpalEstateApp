import React from 'react';
import {Input, Button, ListItem} from 'react-native-elements';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import styles from './style-search';
import {Slider} from 'react-native-elements';
import {TagSelect} from 'react-native-tag-select';
import RNPickerSelect from 'react-native-picker-select';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import axios from 'axios';
import {Params} from '@fortawesome/fontawesome-svg-core';
import RNPicker from '../../containers/MapView/RNModalPicker';
import {withNavigation} from 'react-navigation';

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

  state = {
    dataSource: [],
    text: 'local',
    dataPlace: '',
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
    // this.getSetting();
  }

  async getSetting() {
    await fetch(
      'http://192.168.1.112/wordpress/latehome_free/wp-json/estate-api/v1/search-form',
      {
        method: 'GET',
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log('responseJson', responseJson);
        const dataAmen = [];
        const dataCat = [];
        const dataSta = [];
        const dataTyp = [];
        const cat = responseJson.fields.cat;
        const sta = responseJson.fields.status;
        const typ = responseJson.fields.types;
        const ameni = responseJson.fields.amenities;
        for (let x in cat.data) {
          dataCat.push({
            label: cat.data[x].name,
            value: cat.data[x].slug,
          });
        }
        for (let i in ameni.data) {
          dataAmen.push({
            id: ameni.data[i].term_id,
            label: ameni.data[i].name,
            value: ameni.data[i].slug,
          });
        }
        for (let z in sta.data) {
          dataSta.push({
            label: sta.data[z].name,
            value: sta.data[z].slug,
          });
        }
        for (let y in typ.data) {
          dataTyp.push({
            label: typ.data[y].name,
            value: typ.data[y].slug,
          });
        }

        this.setState({
          amenities: {data: dataAmen, enable: ameni.enable},
          cat: {data: dataCat, enable: cat.enable},
          status: {data: dataSta, enable: sta.enable},
          types: {data: dataTyp, enable: typ.enable},
          max_area: responseJson.fields.max_area,
          max_price: responseJson.fields.max_price,
          min_area: responseJson.fields.min_area,
          min_price: responseJson.fields.min_price,
          info: Array.from(responseJson.fields.info),
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  getplace(place, descriptio) {
    this.state.dataSource = [];
    this.state.text = descriptio;
    this.setState(this.state);

    fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?placeid=${place}&fields=name,geometry&key=AIzaSyCQldRa6xIAW6KUA6wZ6tno_Y7vZKXnWj8`,
      {
        method: 'GET',
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        params.geo_long = responseJson.result.geometry.location.lng;
        params.geo_lat = responseJson.result.geometry.location.lat;
        this.setState({
          forceRefresh: !this.state.forceRefresh,
          dataPlace: responseJson,
        });
      })
      .catch(error => {
        console.error(error);
      });
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
  _selectedValue(index, name) {
    this.setState({selectedText: name});
    console.log('ssadsdas', index, name);
  }
  async searchMaps(e) {
    this.setState({text: e});
    try {
      const posts = await axios({
        method: 'get',
        params: {
          consumer_key: 'ck_bd09789959d94c7021ec1719df2965d4b0053698',
          consumer_secret: 'cs_66aa5aad77dade62fb399435cff32dca3824ed9a',
        },
        url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${e}&key=AIzaSyCQldRa6xIAW6KUA6wZ6tno_Y7vZKXnWj8&sessiontoken=1234567890`,
        headers: {
          'X-Custom-Header': 'foobar',
          Accept: 'application/json',
        },
      });
      if (posts.data.status !== 200) {
        return [];
      } else {
        this.setState({dataSource: posts.predictions});
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  render() {
    console.log('this.props;', this.props);
    return (
      <ScrollView>
        <View style={styles.container}>
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
          <View
            style={{
              width: '100%',
            }}>
            <View
              style={{
                flexDirection: 'column',
                width: '100%',
                height: 60,
              }}>
              <View
                style={{
                  marginTop: 20,
                  width: '100%',
                  height: 60,
                }}>
                <Text>Key :</Text>
                <Input
                  onChangeText={text => {
                    console.log('text', text);
                    return (params.search_text = text);
                  }}
                  style={{
                    paddingHorizontal: 16,
                    margin: 10,
                  }}
                />
              </View>
              <View
                style={{
                  marginTop: 20,
                  width: '100%',
                  height: 60,
                }}>
                <Text>Location search :</Text>
                <Input
                  style={{
                    paddingHorizontal: 16,
                    margin: 10,
                  }}
                  onChangeText={text => this.searchMaps(text)}
                />
              </View>
            </View>
            <KeyboardAvoidingView behavior="padding">
              <ScrollView
                style={{
                  maxHeight: 200,
                  marginTop: 60,
                  marginLeft: '5%',
                  marginRight: '5%',
                  backgroundColor: '#fff',
                }}>
                {this.state.dataSource ? (
                  this.state.dataSource.map(item => (
                    <TouchableOpacity
                      key={item.place_id}
                      onPress={() =>
                        this.getplace(item.place_id, item.description)
                      }>
                      <Text
                        style={{
                          margin: 7,
                          fontSize: 14,
                        }}>
                        {item.description}
                      </Text>
                    </TouchableOpacity>
                  ))
                ) : (
                  <View />
                )}
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
          {this.state.max_area.enable ? (
            <View style={{marginTop: 30, width: '100%', height: 50}}>
              <MultiSlider
                selectedStyle={{
                  backgroundColor: 'gold',
                }}
                unselectedStyle={{
                  backgroundColor: 'silver',
                }}
                containerStyle={{
                  height: 80,
                }}
                trackStyle={{
                  height: 60,
                  backgroundColor: 'red',
                }}
                values={[
                  Number(this.state.min_area.default),
                  Number(this.state.max_area.default),
                ]}
                onValuesChange={item => {
                  params.min_area = item[0];
                  params.max_area = item[1];
                  this.state.min_area.default = item[0];
                  this.state.max_area.default = item[1];
                  this.setState(this.state);
                }}
                min={Number(this.state.min_area.default)}
                max={Number(this.state.max_area.default)}
                touchDimensions={{
                  height: 80,
                  width: 40,
                  borderRadius: 20,
                  slipDisplacement: 60,
                }}
                sliderLength={280}
              />
            </View>
          ) : (
            <View />
          )}

          {this.state.max_price.enable ? (
            <View
              style={{marginTop: 30, width: '100%', border: '#ccc 2px solid'}}>
              <MultiSlider
                values={[
                  Number(this.state.min_price.default),
                  Number(this.state.max_price.default),
                ]}
                sliderLength={280}
                onValuesChange={item => {
                  params.min_price = item[0];
                  params.max_price = item[1];
                  this.state.min_price.default = item[0];
                  this.state.max_price.default = item[1];
                  this.setState(this.state);
                }}
                min={Number(this.state.min_price.default)}
                max={Number(this.state.max_price.default)}
                step={20}
                allowOverlap
                snapped
              />
            </View>
          ) : (
            <View />
          )}
          {this.state.info ? this.state.info.map((item, i) => {}) : <View />}
          <View style={{marginTop: 30, width: '100%'}}>
            <Text>Range : </Text>
            <Slider
              step={0.5}
              maximumValue={15}
              minimumValue={1}
              value={this.state.value}
              onValueChange={value => (params.geo_radius = value)}
            />
            <Text>KM: {this.state.value}</Text>
          </View>
          {this.state.cat.enable ? (
            <View style={{width: '100%'}}>
              <Text style={{margin: 10}}>Select Category</Text>
              <RNPickerSelect
                style={{margin: 10}}
                onValueChange={value => (params.cat = value)}
                items={this.state.cat.data}
              />
            </View>
          ) : (
            <View />
          )}
          {this.state.info.length ? (
            this.state.info.map(item => (
              <View key={item.key} style={{width: '100%'}}>
                <Text style={{margin: 10}}>{item.name}</Text>
                <RNPickerSelect
                  style={{margin: 10}}
                  onValueChange={value => {
                    params.info[item.key] = value;
                  }}
                  items={[
                    {label: '1', value: '1'},
                    {label: '2', value: '2'},
                    {label: '3', value: '3'},
                    {label: '4', value: '4'},
                    {label: '5', value: '5'},
                    {label: '6', value: '6'},
                    {label: '7', value: '7'},
                    {label: '8', value: '8'},
                    {label: '9', value: '9'},
                    {label: '10', value: '10'},
                  ]}
                />
              </View>
            ))
          ) : (
            <View />
          )}

          {this.state.types.enable ? (
            <View style={{width: '100%'}}>
              <Text style={{margin: 10}}>Select Types</Text>
              <RNPickerSelect
                style={{margin: 10}}
                onValueChange={value => (params.types = value)}
                items={this.state.types.data}
              />
            </View>
          ) : (
            <View />
          )}

          {this.state.status.enable ? (
            <View style={{width: '100%'}}>
              <Text style={{margin: 10}}>Select Status</Text>
              <RNPickerSelect
                style={{margin: 10}}
                onValueChange={value => (params.status = value)}
                items={this.state.status.data}
              />
            </View>
          ) : (
            <View />
          )}
          <TagSelect
            ref={tag => {
              this.tag = tag;
            }}
            onItemPress={() => {
              const adp = this.tag.itemsSelected;
              let temp = [];
              for (i in adp) {
                temp.push(adp[i].value);
              }
              params.amenities = temp;
              console.log('this.tag', this.tag.itemsSelected);
              console.log('params', params);
            }}
            data={this.state.amenities.data}
            itemStyle={styles.item}
            itemLabelStyle={styles.label}
            itemStyleSelected={styles.itemSelected}
            itemLabelStyleSelected={styles.labelSelected}
          />
          <View>
            <Button title="Solid Button" onPress={this.SearchBack} />
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default withNavigation(Search);
