import React from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import styles from './style-search';
import {Path, Svg} from 'react-native-svg';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import ChonseSelect from './chonseSelect';
import RNPickerSelect from 'react-native-picker-select';

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

class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  getplace(place, descriptio) {
    this.state.dataSource = [];
    this.state.text = descriptio;
    this.setState(this.state);

    fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?placeid=${place}&fields=name,geometry&key=AIzaSyCrIDrz7VQItGYcnVrESlr0ADCq6SYxAzI`,
      {
        method: 'GET',
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        this.state.dataPlace = responseJson;
        this.state.longitude = responseJson.result.geometry.location.lng;
        this.state.latitude = responseJson.result.geometry.location.lat;
        this.state.forceRefresh = !this.state.forceRefresh;
        this.setState(this.state);
      })
      .catch(error => {
        console.error(error);
      });
  }

  searchMaps(e) {
    this.setState({text: e});
    fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${e}&key=AIzaSyCrIDrz7VQItGYcnVrESlr0ADCq6SYxAzI&sessiontoken=1234567890`,
      {
        method: 'GET',
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        this.state.dataSource = responseJson.predictions;
        this.setState(this.state);
      })
      .catch(error => {
        console.error(error);
      });
  }

  state = {
    dataSource: [],
    text: 'local',
    gender: '0',
  };

  render() {
    const data = [
      {
        value: '0',
        label: 'BUY',
      },
      {
        value: '1',
        label: 'RENT',
      },
      {
        value: '2',
        label: 'SOLD',
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
          <Text style={{fontSize: RFPercentage(3)}}>FILTERS</Text>
          <TouchableOpacity>
            <Text style={{color: '#6923E7'}}>RESET</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
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
              onPress={item => this.setState({gender: item.value})}
            />
            <Text style={{marginTop: 20}}>Property Type</Text>
            <View
              style={{
                marginTop: 5,
                height: 45,
                justifyContent: 'center',
                alignItems: 'center',
                borderStyle: 'solid',

                borderWidth: 1,
                borderColor: '#EEEEEE',
                backgroundColor: '#FFF',
              }}>
              <RNPickerSelect
                onValueChange={value => console.log(value)}
                items={[
                  {label: 'Football', value: 'football'},
                  {label: 'Baseball', value: 'baseball'},
                  {label: 'Hockey', value: 'hockey'},
                ]}
              />
            </View>
            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{width: '45%'}}>
                <Text>Min Price</Text>
                <View
                  style={{
                    height: 45,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderStyle: 'solid',
                    borderWidth: 1,
                    borderColor: '#EEEEEE',
                    backgroundColor: '#FFF',
                  }}>
                  <RNPickerSelect
                    onValueChange={value => console.log(value)}
                    items={[
                      {label: 'Football', value: 'football'},
                      {label: 'Baseball', value: 'baseball'},
                      {label: 'Hockey', value: 'hockey'},
                    ]}
                  />
                </View>
              </View>
              <View style={{width: '45%'}}>
                <Text>Max Price</Text>
                <View
                  style={{
                    height: 45,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderStyle: 'solid',
                    borderWidth: 1,
                    borderColor: '#EEEEEE',
                    backgroundColor: '#FFF',
                  }}>
                  <RNPickerSelect
                    onValueChange={value => console.log(value)}
                    items={[
                      {label: 'Football', value: 'football'},
                      {label: 'Baseball', value: 'baseball'},
                      {label: 'Hockey', value: 'hockey'},
                    ]}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default Search;
