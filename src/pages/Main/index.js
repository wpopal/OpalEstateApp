import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ROUTE_NAMES} from '../Main/routes';
import {Path, Svg, G, Defs, ClipPath} from 'react-native-svg';
import {queryUser} from '../../database/allSchemas';
import {
  View,
  Image,
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

  async fetchPosts(page: number, perPage: number = 10): Promise<[Post]> {
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
        console.log('posts.data.collection', posts.data.collection);
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
      <View style={styles.listing}>
        <View
          style={{
            width: '100%',
            height: '60%',
          }}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate(ROUTE_NAMES.DETAIL, l)
            }>
            <ImageBackground
              imageStyle={{
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                borderWidth: 1,
                borderColor: '#fff',
              }}
              style={{
                width: '100%',
                height: '100%',
              }}
              source={{
                uri: l.item.thumbnail,
              }}>
              <View style={styles.statust}>
                <View
                  style={{
                    width: '100%',
                    height: '100%',
                    flexDirection: 'row-reverse',
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '12%',
                      height: '12%',
                      backgroundColor: '#fff',
                      paddingTop: 6,
                      paddingBottom: 6,
                      paddingRight: 6,
                      paddingLeft: 6,
                      borderRadius: 50,
                    }}>
                    <Svg
                      width="80%"
                      height="80%"
                      viewBox="0 0 16 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <Path
                        d="M8 14.1333C7.86667 14.1333 7.73333 14.1333 7.66667 14.0667C4.8 12.6 0 9.46667 0 5C0 2.26667 1.93333 0.0666667 4.4 0.0666667C6.06667 0.0666667 7.26667 0.866667 8 1.53333L8.06667 1.46667C8.8 0.8 9.93333 0 11.6667 0C14.0667 0.0666667 16 2.26667 16 5C16 9.46667 11.2 12.6 8.33333 14.0667C8.26667 14.1333 8.13333 14.1333 8 14.1333ZM4.4 1.53333C2.53333 1.53333 1.53333 3.33333 1.53333 5C1.53333 8.53333 5.6 11.2667 8 12.5333C10.4667 11.2667 14.5333 8.53333 14.5333 5C14.5333 3.33333 13.5333 1.53333 11.6667 1.53333C9.73333 1.53333 8.73333 3 8.66667 3.06667C8.53333 3.26667 8.26667 3.4 8.06667 3.4C7.8 3.4 7.6 3.26667 7.46667 3.06667C6.86667 2.33333 5.73333 1.53333 4.4 1.53333Z"
                        fill="#6923E7"
                      />
                    </Svg>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            height: '40%',
            padding: 20,
          }}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate(ROUTE_NAMES.DETAIL, l)
            }>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: RFPercentage(3),
                color: '#272B2E',
              }}>
              {l.item.address}
            </Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: '#6923E7',
                fontWeight: 'bold',
                fontSize: RFPercentage(4),
              }}>
              ${l.item.price.replace('&#36;', '')}
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: RFPercentage(3),
                color: '#5F6870',
              }}>
              /month
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 15,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Svg
                width={RFPercentage(3)}
                height={RFPercentage(3)}
                viewBox="0 0 16 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <Path
                  d="M15.2998 12.22C15.1011 12.22 14.9024 12.1207 14.8031 12.0213C14.7037 11.922 14.6044 11.7233 14.6044 11.5246V8.94146H1.49024V11.5246C1.49024 11.7233 1.39089 11.922 1.29154 12.0213C1.1922 12.1207 0.993496 12.22 0.794797 12.22C0.596098 12.22 0.397398 12.1207 0.298049 12.0213C0.0993496 11.8226 0 11.7233 0 11.5246V0.695447C0 0.496748 0.0993496 0.298049 0.198699 0.198699C0.397398 0.0993496 0.496748 0 0.695447 0C0.894146 0 1.09285 0.0993496 1.1922 0.198699C1.29154 0.298049 1.39089 0.496748 1.39089 0.695447V7.45122H8.24602V2.38439C8.24602 2.18569 8.34537 1.98699 8.44471 1.88764C8.54406 1.78829 8.74276 1.68894 8.94146 1.68894H13.6109C14.207 1.68894 14.8031 1.88764 15.2998 2.38439C15.7966 2.88114 15.9953 3.47724 15.9953 4.07333V11.5246C15.9953 11.7233 15.8959 11.922 15.7966 12.0213C15.6972 12.1207 15.4985 12.22 15.2998 12.22ZM9.73626 7.45122H14.6044V4.07333C14.6044 3.87463 14.505 3.57659 14.3063 3.37789C14.1076 3.17919 13.9089 3.07984 13.6109 3.07984H9.73626V7.45122ZM4.86813 6.45772C4.27203 6.45772 3.67593 6.25902 3.17919 5.76228C2.68244 5.26553 2.48374 4.66943 2.48374 4.07333C2.48374 3.57659 2.58309 3.17919 2.88114 2.78179C3.17919 2.28504 3.47724 1.98699 3.97398 1.78829C4.27203 1.68894 4.57008 1.58959 4.86813 1.58959C5.06683 1.58959 5.16618 1.58959 5.36488 1.58959C5.76228 1.78829 6.25902 1.98699 6.55707 2.38439C6.85512 2.78179 7.15317 3.17919 7.25252 3.57659C7.35187 4.07333 7.25252 4.47073 7.15317 4.96748C6.85512 5.36488 6.55707 5.76228 6.15967 6.06033C5.76228 6.25902 5.36488 6.45772 4.86813 6.45772ZM4.86813 3.07984C4.57008 3.07984 4.37138 3.17919 4.17268 3.37789C4.07333 3.57659 3.97398 3.77528 3.97398 4.07333C3.97398 4.27203 3.97398 4.37138 4.07333 4.57008C4.17268 4.76878 4.27203 4.86813 4.47073 4.86813C4.66943 4.96748 4.76878 4.96748 4.86813 4.96748C4.96748 4.96748 4.96748 4.96748 5.06683 4.96748C5.26553 4.96748 5.36488 4.86813 5.56358 4.66943C5.66293 4.57008 5.76228 4.37138 5.86163 4.17268C5.86163 3.97398 5.86163 3.77528 5.76228 3.67594C5.66293 3.47724 5.56358 3.37789 5.36488 3.27854C5.26553 3.17919 5.06683 3.07984 4.86813 3.07984Z"
                  fill="#AEB3BA"
                />
              </Svg>
              <Text
                style={{
                  color: '#AEB3BA',
                  fontSize: RFPercentage(2.6),
                  marginLeft: 4,
                }}>
                {l.item.full_info.bedrooms.value}
              </Text>
              <Text
                style={{
                  color: '#AEB3BA',
                  fontSize: RFPercentage(2.6),
                  marginLeft: 4,
                }}>
                bds
              </Text>
            </View>
          </View>
        </View>
      </View>
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
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Grid
          style={{flex: 1, marginTop: 20}}
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
