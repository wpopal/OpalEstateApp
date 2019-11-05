import {StyleSheet, Platform, Dimensions} from 'react-native';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
const style = StyleSheet.create({
  container: {
    backgroundColor: '#cc223e',
    flex: 1,
    position: 'relative',
  },
  mapWrapper: {
    flex: 1,
    height: 400,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },

  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '50%',
    height: 48,
    width: 48,
  },
  isPanding: {
    marginTop: -60,
  },
  textSearch: {
    alignItems: 'center',
    width: '100%',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  screen: {
    backgroundColor: 'yellow',
    flexDirection: 'column',
    width: Dimensions.get('window').width,
    justifyContent: 'center',
  },
  screenA: {
    backgroundColor: '#ffffff',
  },
  screenB: {
    backgroundColor: '#ffffff',
  },

  letter: {
    color: '#000',
    fontSize: 60,
    textAlign: 'center',
  },
  scrollButton: {
    alignSelf: 'center',
    backgroundColor: 'white',
    height: 50,
    marginTop: 50,
    width: 150,
  },
  scrollButtonText: {
    padding: 20,
    textAlign: 'center',
  },
  text: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'hidden',
    height: 40,
    padding: 8,
    borderWidth: 0,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  panel: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
  panelHeader: {
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
  },

  container2: {
    flex: 1,
    backgroundColor: '#dddddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textHeader: {
    fontSize: 28,
    color: '#FFF',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -24,
    right: 18,
    width: 48,
    height: 48,
    zIndex: 1,
  },
  iconBg: {
    backgroundColor: '#2b8a3e',
    position: 'absolute',
    top: -24,
    right: 18,
    width: 48,
    height: 48,
    borderRadius: 24,
    zIndex: 1,
  },

  searchBarContainerStyle: {
    marginBottom: 10,
    flexDirection: 'row',
    height: 40,
    shadowOpacity: 1.0,
    shadowRadius: 5,
    shadowOffset: {
      width: 1,
      height: 1,
    },

    backgroundColor: 'rgba(255,255,255,1)',
    shadowColor: '#d3d3d3',
    borderRadius: 10,
    elevation: 3,
    marginLeft: 10,
    marginRight: 10,
  },
  scrollPage: {
    width: viewportWidth,
    padding: 20,
  },

  pic: {
    color: '#5F6870',
    height: 28,
    width: '100%',
  },
  viewPic: {
    backgroundColor: '#F1F4F5',
    width: (viewportWidth / 100) * 25,
    marginLeft: 10,
    marginRight: 10,
  },
  selectLabelTextStyle: {
    color: '#9a9a9a',
    textAlign: 'left',
    width: '99%',
    padding: 10,
    flexDirection: 'row',
  },

  textStyle: {
    margin: 10,
    color: '#272B2E',
  },

  pickerStyle: {
    margin: 10,
    alignItems: 'center',
    backgroundColor: '#F1F4F5',
    flexDirection: 'row',
  },
});

export default style;
