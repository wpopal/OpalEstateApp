import React, {Component} from 'react';
import {Avatar} from 'react-native-elements';
import styles from './style-user';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Creators as userCreators} from '../../store/ducks/login';
import {View} from 'react-native';
import {Text, ListItem} from 'react-native-elements';
import {queryUser, deleteDataUser} from '../../database/allSchemas';
import RNRestart from 'react-native-restart'; // Import package from node modules
import RNPickerSelect from 'react-native-picker-select';
import AppText from '../Text-i18n';
import {RFPercentage} from 'react-native-responsive-fontsize';

class User extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: {},
      token: false,
      list2: [
        {
          title: 'USER_CONTACT',
          icon: 'library-books',
        },
        {
          title: 'USER_ABOUT',
          icon: 'account-balance',
        },
        // {
        //   title: 'Language',
        //   icon: 'language',
        // },
        {
          title: 'USER_LOGIN',
          icon: 'people',
        },
      ],
      list: [
        {
          title: 'USER_CONTACT',
          icon: 'library-books',
        },
        {
          title: 'USER_ABOUT',
          icon: 'account-balance',
        },
        // {
        //   title: 'Language',
        //   icon: 'language',
        // },
        {
          title: 'USER_LOGOUT',
          icon: 'block',
        },
      ],
    };

    this.creUrl = this.creUrl.bind(this);
  }
  componentDidMount(): void {
    queryUser()
      .then(item => {
        const dataUser = Array.from(item);
        this.setState({token: dataUser[0].token, data: dataUser[0]});
      })
      .catch(error => {
        console.log('error !', error);
      });
  }

  logout = () => {};

  componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
    console.log('nextProps', nextProps);
    if (nextProps.loginRequest.fu !== 'nânnanannanana') {
      this.setState({data: {avatar: nextProps.loginRequest.fu}});
    }
  }

  redirects = item => {
    switch (item) {
      case 'USER_CONTACT':
        // this.props.navigation.navigate('PRO_FILE');
        break;
      case 'USER_ABOUT':
        console.log('Bookmarks');
        break;
      case 'USER_LOGIN':
        this.props.navigation.navigate('LOGIN');
        break;
      case 'USER_LOGOUT':
        deleteDataUser()
          .then(res => {
            setTimeout(function() {
              RNRestart.Restart();
            }, 2000);
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
  setLang(lang) {
    this.props.setLang(lang);
  }
  render() {
    const {navigation} = this.props;
    if (this.state.token !== false && this.state.token !== '') {
      return (
        <View style={styles.container}>
          <View style={styles.avatar}>
            <Avatar
              title="NU"
              size="xlarge"
              onPress={() => console.log('Works!')}
              activeOpacity={0.7}
              rounded
              source={{
                uri: this.state.data.avatar,
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
                title={() => {
                  return <AppText i18nKey={item.title}>{item.title}</AppText>;
                }}
                leftIcon={{name: item.icon}}
                bottomDivider
                chevron
              />
            ))}
          </View>
          <View style={{width: '100%', height: 100}}>
            <RNPickerSelect
              onValueChange={value => this.setLang(value)}
              items={[
                {label: 'English', value: 'en'},
                {label: 'Vietnamese', value: 'vi'},
              ]}
            />
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
                title={() => {
                  return <AppText i18nKey={item.title}>{item.title}</AppText>;
                }}
                leftIcon={{name: item.icon}}
                bottomDivider
                chevron
              />
            ))}
          </View>
          <View style={{width: '100%', height: 100}}>
            <RNPickerSelect
              onValueChange={value => this.setLang(value)}
              items={[
                {label: 'English', value: 'en'},
                {label: 'Vietnamese', value: 'vi'},
              ]}
            />
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
