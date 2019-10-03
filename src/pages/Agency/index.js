import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ROUTE_NAMES} from '../Agency/routes';
import {Creators as AgencyCreators} from '~/store/ducks/agency';
import {
  Text,
  Dimensions,
  Image,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import styles from './style-main';
import {TabView, SceneMap} from 'react-native-tab-view';

class Agency extends Component<Props, State> {
  state = {
    index: 0,
    routes: [{key: 'Agency', title: 'Agency'}, {key: 'Agent', title: 'Agent'}],
  };

  componentDidMount(): void {
    this.props.getagencyRequest();
    this.props.getagentRequest();
  }
  render() {
    const {navigation} = this.props;
    const {AgencyRequest} = this.props;
    console.log('AgencyRequest', AgencyRequest);
    const {
      loading,
      error,
      data,
      errorAgent,
      loadingAgent,
      dataAgent,
    } = AgencyRequest;
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <Text style={styles.logos}>OPAL ESTATE</Text>
        </View>
        <TabView
          navigationState={this.state}
          renderScene={SceneMap({
            Agency: () => (
              <ScrollView key={0}>
                <View style={styles.body}>
                  {loading && (
                    <View>
                      <Text>Loading...</Text>
                    </View>
                  )}
                  {error && (
                    <View>
                      <Text>ERROR !!!</Text>
                    </View>
                  )}
                  {!loading && !error && (
                    <View style={{width: '100%'}}>
                      {data.collection.map((l, i) => (
                        <TouchableOpacity
                          key={i}
                          onPress={() =>
                            this.props.navigation.navigate(
                              ROUTE_NAMES.DETAIL,
                              l,
                            )
                          }>
                          <Image
                            style={{width: 50, height: 100}}
                            source={{uri: l.info.avatar}}
                          />
                          <View>
                            <Text style={{fontWeight: 'bold', fontSize: 18}}>
                              {l.info.title} - {l.info.avatar}
                            </Text>
                            <Text>
                              2223 W Jefferson Blvd, Los Angeles, CA 90018, USA
                            </Text>
                            <Text
                              numberOfLines={2}
                              style={{color: '#767676', fontSize: 16}}>
                              {l.info.content}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              </ScrollView>
            ),
            Agent: () => (
              <ScrollView key={1}>
                <View style={styles.body}>
                  {loadingAgent && (
                    <View>
                      <Text>Loading...</Text>
                    </View>
                  )}
                  {errorAgent && (
                    <View>
                      <Text>ERROR !!!</Text>
                    </View>
                  )}
                  {!loadingAgent && !errorAgent && (
                    <View style={{width: '100%'}}>
                      {dataAgent.collection.map((l, i) => (
                        <TouchableOpacity
                          key={i}
                          onPress={() =>
                            this.props.navigation.navigate(
                              ROUTE_NAMES.DETAIL,
                              l,
                            )
                          }>
                          <Avatar
                            xlarge
                            rounded
                            source={{uri: l.info.avatar}}
                            onPress={() => console.log('Works!')}
                            activeOpacity={0.7}
                          />
                          <View>
                            <Text style={{fontWeight: 'bold', fontSize: 18}}>
                              {l.info.title}
                            </Text>
                            <Text>
                              2223 W Jefferson Blvd, Los Angeles, CA 90018, USA
                            </Text>
                            <Text
                              numberOfLines={2}
                              style={{color: '#767676', fontSize: 16}}>
                              {l.info.content}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              </ScrollView>
            ),
          })}
          onIndexChange={index => this.setState({index})}
          initialLayout={{width: Dimensions.get('window').width}}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  console.log('aadasdasdasdasdsadasdasd', state);
  return {
    AgencyRequest: state.agency,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(AgencyCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Agency);
