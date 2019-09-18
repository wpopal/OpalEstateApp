import React, {Component} from 'react';
import {Avatar} from 'react-native-elements';
import styles from './style-user';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Creators as userCreators} from '~/store/ducks/users';
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  StatusBar,
} from 'react-native';
import {Button, ThemeProvider, Text, ListItem} from 'react-native-elements';
import ROUTE_NAMES from "../../routes/index";

const list = [
  {
    title: 'Profile',
    icon: 'chrome-reader-mode'
  },
  {
    title: 'Bookmarks',
    icon: 'library-books'
  },
  {
    title: 'Settings',
    icon: 'settings-applications'
  },
  {
    title: 'LogOut',
    icon: 'settings-applications'
  },
]

class User extends Component<Props, State> {
  render() {
    const {navigation} = this.props;
    console.log('ROUTE_NAMES', this.props);
    return (
      <View style={styles.container}>
        <View style={styles.avatar}>
          <Avatar
            title="NU"
            size="xlarge"
            onPress={() => console.log('Works!')}
            activeOpacity={0.7}
            rounded
            onEditPress={() => console.log('Works!')}
            source={{
              uri:
                'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
            }}
            showEditButton
          />
          <Text h4> Name User </Text>
        </View>
        <View style={styles.listItem}>
          {
            list.map((item, i) => (
              <ListItem
                key={i}
                onPress={() => navigation.navigate('LOGIN')}
                title={item.title}
                leftIcon={{name: item.icon}}
                bottomDivider
                chevron
              />
            ))
          }
        </View>
      </View>
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
)(User);
