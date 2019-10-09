import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ROUTE_NAMES} from '../Main/routes';
import {
  Image,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  ListRenderItemInfo,
} from 'react-native';
import Searchbar from '../components/searchbar';
import {Button, ThemeProvider, Text} from 'react-native-elements';
import {Creators as MainCreators} from '../../store/ducks/main';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import styles from './style-main';
import Icon from 'react-native-vector-icons/FontAwesome';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars, faSearch} from '@fortawesome/free-solid-svg-icons';
import Grid from 'react-native-infinite-scroll-grid';

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
    const posts = await fetch(
      `http://dev.wpopal.com/latehome_free/wp-json/estate-api/v1/properties/?per_page=${perPage}&page=${page}`,
    ).then(response => response.json());
    return posts.collection;
  }

  async loadData(refresh: boolean) {
    if (this.isLoading) {
      return;
    }
    if (refresh) {
      console.log('refresh', refresh);
      this.setState({refreshing: true});
      this.setState({posts: []});
      try {
        this.isLoading = true;
        const posts = await this.fetchPosts(1);
        this.setState(previousState => {
          console.log(previousState);
          return {
            loadingMore: false,
            posts: refresh ? posts : previousState.posts.concat(posts),
            nextPage: 1,
          };
        });
      } catch (error) {
        console.error(error);
      } finally {
        console.log('adasdasdasdasdasdasdasdas');
        this.isLoading = false;
        this.setState({loadingMore: false, refreshing: false});
      }
    } else {
      console.log('refresh', refresh, this.state.nextPage);
      this.setState({loadingMore: true});
      try {
        this.isLoading = true;
        const posts = await this.fetchPosts(this.state.nextPage + 1);
        console.log('posts', posts);
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
    this.loadData(true);
  }

  render() {
    const {navigation} = this.props;
    const {mainRequest} = this.props;
    const {loading, error, data} = mainRequest;
    return (
      <View style={{flex:1}}>
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
