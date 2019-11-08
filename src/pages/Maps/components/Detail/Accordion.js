import React, {Component} from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Path, Svg} from 'react-native-svg';

class Accordion extends Component {
  constructor() {
    super();

    this.state = {
      layout_Height: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.item.expanded) {
      this.setState(() => {
        return {
          layout_Height: null,
        };
      });
    } else {
      this.setState(() => {
        return {
          layout_Height: 0,
        };
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.layout_Height !== nextState.layout_Height) {
      return true;
    }
    return false;
  }

  show_Selected_Category = item => {
    // Write your code here which you want to execute on sub category selection.
    Alert.alert(item);
  };

  render() {
    return (
      <View style={styles.Panel_Holder}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={this.props.onClickFunction}
          style={styles.category_View}>
          <Text style={styles.category_Text}>
            {this.props.item.category_Name}{' '}
          </Text>
          {this.props.item.expanded ? (
            <Svg
              className="icon"
              style="vertical-align: middle;fill: currentColor;overflow: hidden"
              width={RFPercentage(2)}
              height={RFPercentage(2)}
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg">
              <Path d="M62.4 744 520 288 968 744Z" />
            </Svg>
          ) : (
            <Svg
              className="icon"
              style="vertical-align: middle;fill: currentColor;overflow: hidden"
              width={RFPercentage(2)}
              height={RFPercentage(2)}
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg">
              <Path d="M1001.6 268.8 515.2 824 28.8 268.8Z" />
            </Svg>
          )}
        </TouchableOpacity>
        <View
          style={{
            height: this.state.layout_Height,
            overflow: 'hidden',
            paddingLeft: 20,
            paddingRight: 20,
          }}>
          {this.props.item.category_Name === 'Amenities' ? (
            this.props.item.sub_Category.map((item, key) => {
              return (
                <View
                  key={key}
                  style={{
                    marginTop: 4,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{color: '#272B2E'}}>{item.name}</Text>
                  <Text style={{color: '#5F6870'}}>
                    {item.value ? 'Yes' : 'No'}
                  </Text>
                </View>
              );
            })
          ) : this.props.item.category_Name === 'Facts & Features' ? (
            this.props.item.sub_Category.map((item, key) => {
              return (
                <View
                  key={key}
                  style={{
                    marginTop: 4,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{color: '#272B2E'}}>{item.label}</Text>
                  <Text style={{color: '#5F6870'}}>{item.value}</Text>
                </View>
              );
            })
          ) : this.props.item.category_Name === 'Facilities' ? (
            this.props.item.sub_Category.map((item, key) => {
              return (
                <View
                  key={key}
                  style={{
                    marginTop: 4,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{color: '#272B2E'}}>
                    {item.opalestate_ppt_public_facilities_key}
                  </Text>
                  <Text style={{color: '#5F6870'}}>
                    {item.opalestate_ppt_public_facilities_value}
                  </Text>
                </View>
              );
            })
          ) : (
            <View />
          )}
        </View>
      </View>
    );
  }
}
export default Accordion;
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: '#F5FCFF',
  },

  iconStyle: {
    width: 30,
    height: 30,
    justifyContent: 'flex-end',
    alignItems: 'center',
    tintColor: '#fff',
  },

  sub_Category_Text: {
    fontSize: 18,
    color: '#000',
    padding: 10,
  },

  category_Text: {
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#000',
    fontSize: RFPercentage(2.2),
    padding: 10,
  },

  Panel_Holder: {},

  category_View: {
    paddingLeft: 10,
    paddingRight: 10,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F1F4F5',
  },
});
