import React from 'react';
import {View, ScrollView, Image, Alert} from 'react-native';
import {Avatar, Text, Button} from 'react-native-elements';
import {Input} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';

import DocumentPicker from 'react-native-document-picker';
import RNPickerSelect from 'react-native-picker-select';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Creators as userCreators} from '../../../store/ducks/login';

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
  quality: 1,
};

var params = {
  email: '',
  first_name: '',
  last_name: '',
  avatar_url: '',
};
class ProFile extends React.Component {
  constructor(props) {
    super(props);
  }

  uploadImg = () => {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        this.props.updateFu(response.uri);
        this.setState({
          avatarSource: source,
        });
      }
    });
  };
  componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
    this.setState({avatarSource: nextProps.loginRequest.fu});
  }

  async uploadFile() {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      Alert.alert('upload done', res.uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }

  state = {avatarSource: ''};

  render() {
    return (
      <ScrollView style={{backgroundColor: '#fff', height: '100%'}}>
        <View>
          <Avatar
            size="large"
            rounded
            source={this.state.avatarSource}
            onPress={() => {
              this.uploadImg();
            }}
          />
          <Text h4>Hò Văn Tẻn</Text>
        </View>
        <Button
          onPress={() => {
            this.props.updateFu('https://i.imgur.com/czujXMo.jpg');
          }}
        />
        <View style={{width: '100%'}}>
          <Text>first_name :</Text>
          <Input onChangeText={text => (params.first_name = text)} />
          <Text>last_name:</Text>
          <Text>Target Min Price :</Text>
          <Input onChangeText={text => (params.last_name = text)} />
          <Text>Target Max Price :</Text>
          <Input />
          <Text>Email :</Text>
          <Input onChangeText={text => (params.email = text)} />

          {/*data auto*/}

          <Text>Website :</Text>
          <Input />
          <Text>Phone :</Text>
          <Input />
          <Text>Mobile :</Text>
          <Input />
          <Text>Fax:</Text>
          <Input />
          {/*data auto end*/}

          <Text>Twitter:</Text>
          <Input />
          <Text>Facebook:</Text>
          <Input />
          <Text>Google:</Text>
          <Input />
          <Text>LinkedIn:</Text>
          <Input />
          <Text>Pinterest:</Text>
          <Input />
          <Text>Instagram:</Text>
          <Input />
          <Button title="Save" />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  loginRequest: state.login,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(userCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProFile);
