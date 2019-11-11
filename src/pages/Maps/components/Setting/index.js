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
      console.log(this.props)
    const data = [
      {id: 1, label: 'Money'},
      {id: 2, label: 'Credit card'},
      {id: 3, label: 'Debit card'},
      {id: 4, label: 'Online payment'},
      {id: 5, label: 'Bitcoin'},
    ];
    return (
      <View style={styles.container}>

      </View>
    );
  }
}

export default Search;
