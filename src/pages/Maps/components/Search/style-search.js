import {StyleSheet, Dimensions, Platform} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

const IS_IOS = Platform.OS === 'ios';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 13,
    backgroundColor: '#fff',
    marginLeft: 15,
    marginRight: 15,
  },
  pickerStyle: {
    alignItems: 'center',
    backgroundColor: '#F1F4F5',
    flexDirection: 'row',
  },
  dropDownImageStyle: {
    width: RFPercentage(3.5),
    height: RFPercentage(3),
    marginLeft: 10,
    alignSelf: 'center',
  },
  placeHolderTextStyle: {
    color: '#AEB3BA',
    padding: 12,
    textAlign: 'left',
    width: '85%',
    flexDirection: 'row',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    padding: 5,
  },
  selectLabelTextStyle: {
    color: '#AEB3BA',
    textAlign: 'left',
    width: '85%',
    flexDirection: 'row',
  },
  buttonContainer: {
    padding: 15,
  },
  buttonInner: {
    marginBottom: 15,
  },
  labelText: {
    color: '#333',
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 15,
  },
  item: {
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#FFF',
  },
  label: {
    color: '#333',
  },
  itemSelected: {
    backgroundColor: '#333',
  },
  labelSelected: {
    color: '#FFF',
  },
  header: {
    height: (viewportHeight / 100) * 8,
    width: viewportWidth,
    backgroundColor: '#7159c1',
  },
  logos: {
    color: '#fff',
    fontSize: RFPercentage(3),
  },
  body: {
    flex: 1,
    backgroundColor: '#fff',
    width: viewportWidth,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  fileName: {
    fontWeight: 'bold',
    marginTop: 5,
  },
  instructions: {
    color: '#DDD',
    fontSize: 14,
    marginTop: 20,
    textAlign: 'center',
  },
  logo: {
    height: Dimensions.get('window').height * 0.11,
    marginVertical: Dimensions.get('window').height * 0.11,
    width: Dimensions.get('window').height * 0.11 * (1950 / 662),
  },
  welcome: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  listing: {
    width: (viewportWidth / 100) * 90,
    height: (viewportHeight / 100) * 28,
    marginBottom: 100,
  },
  statust: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: '3%',
  },

  sliders: {
    margin: 20,
    width: 280,
  },
  text: {
    alignSelf: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 30,
  },
  sliderOne: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
