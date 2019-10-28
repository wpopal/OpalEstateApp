import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ROUTE_NAMES} from '../Main/routes';
import {queryUser} from '../../database/allSchemas';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  ListRenderItemInfo,
} from 'react-native';
import {Text} from 'react-native-elements';
import {Creators as MainCreators} from '../../store/ducks/main';
import {RFPercentage} from 'react-native-responsive-fontsize';
import styles from './style-main';
import Grid from 'react-native-infinite-scroll-grid';
import axios from 'axios';
import SplashScreen from 'react-native-splash-screen';

interface Props {}

interface State {
  token: string;
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

class Main extends Component<Props, State> {
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
    console.log('reload');
    this.loadData(true);
  }

  onEndReached() {
    console.log('load more');
    this.loadData(false);
  }

  async fetchPosts(page: number, perPage: number = 5): Promise<[Post]> {
    try {
      const posts = await axios({
        method: 'get',
        params: {
          consumer_key: 'ck_bd09789959d94c7021ec1719df2965d4b0053698',
          consumer_secret: 'cs_66aa5aad77dade62fb399435cff32dca3824ed9a',
          per_page: perPage,
          page: page,
        },
        url:
          'http://10.0.2.2/wordpress/latehome_free/wp-json/estate-api/v1/properties',
        headers: {
          'X-Custom-Header': 'foobar',
          Accept: 'application/json',
        },
      });
      if (posts.data.status !== 200) {
        return [];
      } else {
        return posts.data.collection;
      }
    } catch (error) {
      console.log('error', error);
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
          console.log(previousState);
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
    const l = info;
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate(ROUTE_NAMES.DETAIL, l)}>
        <View style={styles.listing}>
          <ImageBackground
            style={{width: '100%', height: '100%'}}
            source={{
              uri: l.item.thumbnail,
            }}>
            <View style={styles.statust}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                {l.item.is_featured === 'on' ? (
                  <View
                    style={{
                      backgroundColor: 'red',
                      paddingTop: 3,
                      paddingBottom: 3,
                      paddingRight: 6,
                      paddingLeft: 6,
                    }}>
                    <Text style={{color: '#fff', fontSize: RFPercentage(1.8)}}>
                      FEATURED
                    </Text>
                  </View>
                ) : (
                  <View />
                )}
                {l.item.labels.length == 0 ? (
                  <View />
                ) : (
                  <View
                    style={{
                      backgroundColor: '#efc065',
                      paddingTop: 3,
                      paddingBottom: 3,
                      paddingRight: 6,
                      paddingLeft: 6,
                    }}>
                    {l.item.labels.map((y, x) => (
                      <Text
                        key={x}
                        style={{color: '#fff', fontSize: RFPercentage(1.8)}}>
                        {y.name}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
              <View>
                {l.item.statuses.length == 0 ? (
                  <View />
                ) : (
                  <View
                    style={{
                      backgroundColor: 'green',
                      paddingTop: 3,
                      paddingBottom: 3,
                      paddingRight: 6,
                      paddingLeft: 6,
                    }}>
                    {l.item.statuses.map((y, x) => (
                      <Text
                        key={x}
                        style={{color: '#fff', fontSize: RFPercentage(1.8)}}>
                        {y.name}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            </View>
          </ImageBackground>
          <View style={{flex: 1, width: '100%'}}>
            <View>
              <Text h4>{l.item.name}</Text>
              <Text style={{color: '#aaa'}}>{l.item.address}</Text>
              <Text style={{color: '#1e4ecc'}}>Call to Price</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  componentDidMount(): void {
    SplashScreen.hide();
    queryUser()
      .then(item => {
        const dataUser = Array.from(item);
        console.log('dataUser', dataUser);
        this.setState({token: dataUser[0].token});
        this.loadData(true);
      })
      .catch(error => {
        console.log('error !', error);
      });
  }

  render() {
    const {navigation} = this.props;
    const {mainRequest} = this.props;
    const {loading, error, data} = mainRequest;
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

const mapStateToProps = state => ({
  mainRequest: state.main,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(MainCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
