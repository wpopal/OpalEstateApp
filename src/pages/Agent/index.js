import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ROUTE_NAMES} from '../Agent/routes';
import {Base_url, consumer_secret, consumer_key} from '../../config/setting';
import {
  Text,
  Dimensions,
  Image,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  ListRenderItemInfo,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import styles from './style-main';
import {TabView, SceneMap} from 'react-native-tab-view';
import Grid from 'react-native-infinite-scroll-grid';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import axios from 'axios';
import {queryUser} from '../../database/allSchemas';
import SplashScreen from 'react-native-splash-screen';
import {Path, Svg, Circle, Rect, ClipPath, G, Defs} from 'react-native-svg';
import AppText from '../Text-i18n';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
interface Props {}

interface State {
  loadingMore: boolean;
  refreshing: boolean;
  posts: Post[];
  nextPage: number;
  numColumns: number;
}

interface Post {
  id: number;
  title: string;
  thumbnailUrl: string;
}

class Agent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: false,
      loadingMore: false,
      refreshing: false,
      posts: [],
      nextPage: 1,
    };
  }

  onRefresh() {
    this.loadData(true);
  }

  onEndReached() {
    this.loadData(false);
  }

  async fetchPosts(page: number, perPage: number = 5): Promise<[Post]> {
    const posts = await axios({
      method: 'get',
      params: {
        consumer_key: consumer_key,
        consumer_secret: consumer_secret,
        per_page: perPage,
        page: page,
      },
      url: Base_url + '/wp-json/estate-api/v1/agents',
      headers: {
        'X-Custom-Header': 'foobar',
        // Authorization: 'Bearer ' + this.state.token,
        Accept: 'application/json',
      },
    });
    SplashScreen.hide();
    if (posts.data.status !== 200) {
      return [];
    } else {
      return posts.data.collection;
    }
  }

  async loadData(refresh: boolean) {
    if (this.isLoading) {
      return;
    }
    if (refresh) {
      this.setState({refreshing: true});
      this.setState({posts: []});
      try {
        this.isLoading = true;
        const posts = await this.fetchPosts(1);
        this.setState(previousState => {
          return {
            loadingMore: false,
            posts: refresh ? posts : previousState.posts.concat(posts),
            nextPage: 1,
          };
        });
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
        this.setState({loadingMore: false, refreshing: false});
      }
    } else {
      this.setState({loadingMore: true});
      try {
        this.isLoading = true;
        const posts = await this.fetchPosts(this.state.nextPage + 1);
        this.setState(previousState => {
          return {
            loadingMore: false,
            posts: refresh ? posts : previousState.posts.concat(posts),
            nextPage: previousState.nextPage + 1,
          };
        });
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
        this.setState({loadingMore: false, refreshing: false});
      }
    }
  }
  creUrl(l) {
    let avatar_url = l.avatar;
    avatar_url = avatar_url.replace('localhost', '10.0.2.2');
    return avatar_url;
  }
  renderItem(info: ListRenderItemInfo<Post>) {
    const l = info.item;
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate(ROUTE_NAMES.DETAIL, l)}>
        <View
          style={{
            borderRadius: 10,
            flexDirection: 'row',
            justifyContent: 'center',
            paddingLeft: 10,
            paddingTop: 10,
            marginTop: 10,
            marginLeft: 10,
            paddingBottom: 10,
            paddingRight: 25,
            backgroundColor: '#fff',
            alignItems: 'center',
          }}>
          <Image
            style={{
              width: 80,
              height: 80,
              borderRadius: 50,
              marginLeft: 10,
              marginRight: 10,
            }}
            source={{uri: this.creUrl(l)}}
          />
          <View style={{width: viewportWidth - 170, marginLeft: 5}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontWeight: 'bold', fontSize: 18, marginRight: 5}}>
                {l.name}
              </Text>
              {l.trusted ? (
                <Svg
                  width="15"
                  height="15"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <Circle cx="6" cy="6" r="6" fill="#1790FF" />
                  <G clip-path="url(#clip0)">
                    <Path
                      d="M4.99995 8.79999C4.89995 8.79999 4.79995 8.74999 4.72495 8.67499L3.12495 7.07499C2.97495 6.92499 2.97495 6.67499 3.12495 6.49999C3.27495 6.34999 3.52495 6.34999 3.67495 6.49999L4.97495 7.79999L8.29995 4.12499C8.44995 3.94999 8.69995 3.94999 8.87495 4.09999C9.02495 4.24999 9.04995 4.49999 8.89995 4.67499L5.29995 8.67499C5.22495 8.74999 5.12495 8.79999 4.99995 8.79999Z"
                      fill="white"
                    />
                  </G>
                  <Defs>
                    <ClipPath id="clip0">
                      <Rect
                        width="6"
                        height="4.8"
                        fill="white"
                        transform="translate(3 4)"
                      />
                    </ClipPath>
                  </Defs>
                </Svg>
              ) : (
                <View />
              )}
            </View>
            <Text numberOfLines={2} style={{color: '#767676', fontSize: 16}}>
              {l.address}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text numberOfLines={2} style={{color: '#6923E7', fontSize: 16}}>
                {l.listing_count}{' '}
              </Text>
              <AppText
                style={{color: '#6923E7', fontSize: 16}}
                i18nKey={'AGENT_LISTINGS'}>
                Listings
              </AppText>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  componentWillMount(): void {
    queryUser()
      .then(item => {
        const dataUser = Array.from(item);
        this.setState({token: dataUser[0].token});
        this.loadData(true);
      })
      .catch(error => {
        this.loadData(true);
        console.log('error !', error);
      });
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={{flex: 1, backgroundColor: '#EFEFF1', padding: 10}}>
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
          <TouchableOpacity onPress={() => this.props.navigation.goBack()} />
          <AppText
            i18nKey={'AGENT_TITLE'}
            style={{fontSize: RFPercentage(2.5)}}>
            AGENCYS
          </AppText>
          <TouchableOpacity />
        </View>
        <Grid
          style={{flex: 1}}
          key={this.state.numColumns}
          numColumns={this.state.numColumns}
          data={this.state.posts}
          keyExtractor={item => item.id.toString()}
          renderItem={info => this.renderItem(info)}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.refreshing}
          onEndReached={() => this.onEndReached()}
          loadingMore={this.state.loadingMore}
          marginExternal={10}
          marginInternal={10}
        />
      </View>
    );
  }
}

export default Agent;
