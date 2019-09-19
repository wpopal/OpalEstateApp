import React from 'react';
import {TagSelect} from 'react-native-tag-select';
import {
  Text,
  View,
  ScrollView,
  Button,
  Alert,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import styles from './style-search';
import {Slider} from 'react-native-elements';

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
        <View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              height: 60,
            }}>
            <TextInput
              style={{
                paddingHorizontal: 16,
                alignItems: 'center',
                flexDirection: 'row',
                margin: 10,
                width: '80%',
                borderWidth: 1,
                borderColor: '#000',
                height: 40,
              }}
              onChangeText={text => this.searchMaps(text)}
              value={this.state.text}
            />
          </View>
          <KeyboardAvoidingView behavior="padding">
            <ScrollView
              style={{
                maxHeight: 200,
                marginTop: 60,
                marginLeft: '5%',
                marginRight: '5%',
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
        <View
          style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
          <Slider
            step={0.5}
            maximumValue={15}
            minimumValue={1}
            value={this.state.value}
            onValueChange={value => this.setState({value})}
          /><Text>Value: {this.state.value}</Text></View>

        <TagSelect
          ref={tag => {
            this.tag = tag;
          }}
          onItemPress={() => {
            Alert.alert(
              'Selected items:',
              JSON.stringify(this.tag.itemsSelected),
            );
          }}
          data={data}
          itemStyle={styles.item}
          itemLabelStyle={styles.label}
          itemStyleSelected={styles.itemSelected}
          itemLabelStyleSelected={styles.labelSelected}
        />
      </View>
    );
  }
}

export default Search;
