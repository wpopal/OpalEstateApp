import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

const ChonseSelect = ({
  data,
  initValue,
  onPress,
  colorActive = '#fff',
  color = '#333',
  borderColor = '#cdcdcd',
  style,
  textStyle,
  label = '',
  marginLeft = 0,
  height,
  labelStyle,
}) => {
  const size = Object.keys(data).length;
  return (
    <View style={{marginLeft: marginLeft}}>
      {label != '' && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <View style={[styles.wrapRow, style]}>
        {data.map((item, key) => {
          if (key == 0) {
            return (
              <TouchableOpacity
                key={key}
                activeOpacity={0.9}
                onPress={() => onPress(item)}
                style={[
                  item.value == initValue
                    ? styles.wrapStartActive
                    : styles.wrapStart,
                  {
                    borderColor: borderColor,
                    height: height,
                  },
                ]}>
                <Text
                  style={[
                    styles.text,
                    {color: item.value == initValue ? colorActive : color},
                    textStyle,
                  ]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          } else if (key == size - 1) {
            return (
              <TouchableOpacity
                key={key}
                activeOpacity={0.9}
                onPress={() => onPress(item)}
                style={[
                  item.value == initValue
                    ? styles.wrapEndActive
                    : styles.wrapEnd,
                  {
                    borderColor: borderColor,
                    height: height,
                  },
                ]}>
                <Text
                  style={[
                    styles.text,
                    {color: item.value == initValue ? colorActive : color},
                    textStyle,
                  ]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          } else {
            return (
              <TouchableOpacity
                key={key}
                activeOpacity={0.9}
                onPress={() => onPress(item)}
                style={[
                  item.value == initValue ? styles.wrapActive : styles.wrap,
                  {
                    borderColor: borderColor,
                    height: height,
                  },
                ]}>
                <Text
                  style={[
                    styles.text,
                    {color: item.value == initValue ? colorActive : color},
                    textStyle,
                  ]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          }
        })}
      </View>
    </View>
  );
};

export default ChonseSelect;

const styles = StyleSheet.create({
  wrapRow: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  label: {
    marginBottom: 5,
  },
  wrapStart: {
    borderWidth: 1,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderColor: '#EEEEEE',
    paddingVertical: 5,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
  },
  wrapStartActive: {
    borderWidth: 1,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderColor: '#EEEEEE',
    paddingVertical: 5,
    backgroundColor: '#6923E7',
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
  },
  wrap: {
    width: '30%',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    paddingVertical: 5,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapActive: {
    width: '30%',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    backgroundColor: '#6923E7',
    paddingVertical: 5,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapEnd: {
    width: '30%',
    borderWidth: 1,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderColor: '#EEEEEE',
    paddingVertical: 5,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapEndActive: {
    width: '30%',
    borderWidth: 1,
    backgroundColor: '#6923E7',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderColor: '#EEEEEE',
    paddingVertical: 5,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 13,
    color: '#EEEEEE',
  },
});
