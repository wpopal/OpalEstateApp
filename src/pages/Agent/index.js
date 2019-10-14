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
    const posts = await fetch(
      `http://dev.wpopal.com/latehome_free/wp-json/estate-api/v1/agents/?per_page=${perPage}&page=${page}`,
    ).then(response => response.json());
    return posts.collection;
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

  renderItem(info: ListRenderItemInfo<Post>) {
    const l = info.item;
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate(ROUTE_NAMES.DETAIL, l)}>
        <Image style={{width: 50, height: 100}} source={{uri: l.avatar}} />
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
    this.loadData(true);
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
