import React from 'react';
import {Input, Button} from 'react-native-elements';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import styles from './style-search';
import {Slider} from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';

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
        console.log('responseJson', responseJson);
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
  };

  render() {
    const data = [
      {id: 1, label: 'Money'},
      {id: 2, label: 'Credit card'},
      {id: 3, label: 'Debit card'},
      {id: 4, label: 'Online payment'},
      {id: 5, label: 'Bitcoin'},
    ];
    return (
      <View style={styles.container}>
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
            <Text>Từ khóa</Text>
            <Input
              style={{
                paddingHorizontal: 16,
                margin: 10,
              }}
              placeholder="Công việc, công ty ...v..v.."
            />
            <Text>Địa điểm tìm kiếm :</Text>
            <Input
              style={{
                paddingHorizontal: 16,
                margin: 10,
              }}
              onChangeText={text => this.searchMaps(text)}
              value={this.state.text}
              placeholder="BASIC INPUT"
            />
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
        <View style={{marginTop: 30, width: '100%'}}>
          <Text>Khoảng cách : </Text>
          <Slider
            step={0.5}
            maximumValue={15}
            minimumValue={1}
            value={this.state.value}
            onValueChange={value => this.setState({value})}
          />
          <Text>KM: {this.state.value}</Text>
        </View>
        <View style={{marginTop: 30, width: '100%'}}>
          <Text>Cấp bậc :</Text>
          <RNPickerSelect
            onValueChange={value => console.log(value)}
            items={[
              {label: 'Trưởng phòng', value: 'truongphong'},
              {label: 'Giám đốc va cao hơn', value: 'giamdocvacaohon'},
              {label: 'Nhân viên', value: 'nhanvien'},
              {label: 'Mới tốt nghiệp', value: 'sinhvien'},
            ]}
          />
        </View>
        <View style={{marginTop: 30, width: '100%'}}>
          <Text>Mức lương :</Text>
          <RNPickerSelect
            onValueChange={value => console.log(value)}
            items={[
              {label: 'Dưới 500 USD', value: '<500'},
              {label: '500 - 1000 USD', value: '500-1000'},
              {label: '1000 - 1500 USD', value: '1000-1500'},
              {label: '1500 - 2000 USD', value: '1500-2000'},
              {label: 'Trên 2000 USD', value: '>2000'},
            ]}
          />
        </View>
        <View>
          <Button title="Solid Button" />
        </View>
      </View>
    );
  }
}

export default Search;
