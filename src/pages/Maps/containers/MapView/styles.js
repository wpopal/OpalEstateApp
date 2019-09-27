import {StyleSheet, Platform} from 'react-native';

const style = StyleSheet.create({
  container: {
    backgroundColor: 'white',
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
  marker: {
    height: 48,
    width: 48,
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
});

export default style;
