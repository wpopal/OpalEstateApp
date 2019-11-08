import {StyleSheet, Dimensions, Platform} from 'react-native';

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
export const itemWidth = slideWidth + itemHorizontalMargin;

const entryBorderRadius = 8;

export default StyleSheet.create({
  slideInnerContainer: {
    backgroundColor: '#ccc',
    width: '100%',
    height: '100%',
  },
  slideInnerContainer3: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.55,
    shadowRadius: 30,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    elevation: 10,
  },
  slideInnerContainer2: {
    backgroundColor: '#cc1c0a',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: viewportHeight - 20,
    height: slideHeight + 20,
  },
  shadow: {
    position: 'absolute',
    top: 0,
    bottom: 18,
  },
  imageContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageContainerEven: {
    backgroundColor: '#000',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  // image's border radius is buggy on iOS; let's hack it!
  radiusMask: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: entryBorderRadius,
    backgroundColor: 'white',
  },
  radiusMaskEven: {
    backgroundColor: '#000',
  },
  textContainer: {
    justifyContent: 'center',
    paddingTop: 20 - entryBorderRadius,
    paddingBottom: 20,
    paddingHorizontal: 16,
    width: '70%',
  },
  textContainerEven: {
    backgroundColor: '#000',
  },
  title: {
    color: '#000',
    fontFamily: 'Roboto-Bold',
    fontSize: 15,
  },
  titleEven: {
    color: 'white',
  },
  subtitle: {
    marginTop: 6,
    fontFamily: 'Roboto-Medium',
    color: 'gray',
    fontSize: 12,
  },
  subtitleEven: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
});
