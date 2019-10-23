import React, {Component} from 'react';
import {Avatar} from 'react-native-elements';
import styles from './style-user';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Creators as userCreators} from '../../store/ducks/users';
import {View} from 'react-native';
import {Text, ListItem} from 'react-native-elements';
import {queryUser, deleteDataUser} from '../../database/allSchemas';

class User extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: {},
      token: false,
      list2: [
        {
          title: 'Profile',
          icon: 'chrome-reader-mode',
        },
        {
          title: 'Bookmarks',
          icon: 'library-books',
        },
        {
          title: 'Settings',
          icon: 'settings-applications',
        },
        {
          title: 'Login',
          icon: 'settings-applications',
        },
      ],
      list: [
        {
          title: 'Profile',
          icon: 'chrome-reader-mode',
        },
        {
          title: 'Bookmarks',
          icon: 'library-books',
        },
        {
          title: 'Settings',
          icon: 'settings-applications',
        },
        {
          title: 'Logout',
          icon: 'settings-applications',
        },
      ],
    };
  }
  componentDidMount(): void {
    queryUser()
      .then(item => {
        const dataUser = Array.from(item);
        this.setState({token: dataUser[0].token, data: dataUser[0]});
        console.log('bbbbbbbbbbbb', this.state.data);
      })
      .catch(error => {
        console.log('error !', error);
      });
  }

  logout = () => {};

  redirects = item => {
    switch (item) {
      case 'Profile':
        console.log('Profile');
        break;
      case 'Bookmarks':
        console.log('Bookmarks');
        break;
      case 'Settings':
        console.log('Settings');
        break;
      case 'Login':
        this.props.navigation.navigate('LOGIN');
        break;
      case 'Logout':
        deleteDataUser()
          .then(res => {
            console.log('res', res);
          })
          .catch(error => {
            console.log('error', error);
          });
        break;
      default:
        console.log('error');
        break;
    }
  };
  creUrl(l) {
    let avatar_url = l;
    avatar_url = avatar_url.replace('localhost', '10.0.2.2');
    return avatar_url;
  }
  render() {
    const {navigation} = this.props;
    if (this.state.token !== false) {
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
                uri: this.creUrl(this.state.data.avatar),
              }}
              showEditButton
            />
            <Text h4>{this.state.data.user_display_name}</Text>
            <Text>{this.state.data.user_email}</Text>
            <Text>{this.state.data.user_nicename}</Text>
          </View>
          <View style={styles.listItem}>
            {this.state.list.map((item, i) => (
              <ListItem
                key={i}
                onPress={() => {
                  this.redirects(item.title);
                }}
                title={item.title}
                leftIcon={{name: item.icon}}
                bottomDivider
                chevron
              />
            ))}
          </View>
        </View>
      );
    } else {
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
            {this.state.list2.map((item, i) => (
              <ListItem
                key={i}
                onPress={() => {
                  this.redirects(item.title);
                }}
                title={item.title}
                leftIcon={{name: item.icon}}
                bottomDivider
                chevron
              />
            ))}
          </View>
        </View>
      );
    }
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
