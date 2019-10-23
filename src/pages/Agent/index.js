import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ROUTE_NAMES} from '../Agent/routes';
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
    console.log('this.state.token', this.state.token);
    if (this.state.token) {
      const posts = await axios({
        method: 'get',
        params: {
          consumer_key: 'ck_bd09789959d94c7021ec1719df2965d4b0053698',
          consumer_secret: 'cs_66aa5aad77dade62fb399435cff32dca3824ed9a',
          per_page: perPage,
          page: page,
        },
        url:
          'http://10.0.2.2/wordpress/latehome_free/wp-json/estate-api/v1/agents',
        headers: {
          'X-Custom-Header': 'foobar',
          Authorization: 'Bearer ' + this.state.token,
          Accept: 'application/json',
        },
      });
      console.log('posts', posts);
      if (posts.data.status !== 200) {
        return [];
      } else {
        return posts.data.collection;
      }
    } else {
      return [];
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
        <Image
          style={{width: 50, height: 100}}
          source={{uri: this.creUrl(l)}}
        />
        <View>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>{l.name}</Text>
          <Text>2223 W Jefferson Blvd, Los Angeles, CA 90018, USA</Text>
          <Text numberOfLines={2} style={{color: '#767676', fontSize: 16}}>
            {l.content}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  componentDidMount(): void {
    queryUser()
      .then(item => {
        const dataUser = Array.from(item);
        this.setState({token: dataUser[0].token});
        this.loadData(true);
      })
      .catch(error => {
        console.log('error !', error);
      });
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={{flex: 1}}>
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
