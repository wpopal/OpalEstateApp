// @flow

import React from 'react';
import { TextInput, View } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components';

import { ContentContainer } from './Common';

const InputWrapper = styled(View)`
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 15px;
`;

const InputIcon = styled(Icon).attrs(({ iconName }) => ({
  name: iconName,
  size: 22,
}))`
  color: #000;
`;

const CustomInput = styled(TextInput).attrs(({ placeholder, type, theme }) => ({
  placeholderTextColor: '#000',
  selectionColor: '#000',
  underlineColorAndroid: 'transparent',
  secureTextEntry: type === 'password',
  autoCapitalize: 'none',
  textContentType: type,
  autoCorrect: false,
  placeholder,
}))`
  width: 90%;
  height: 100%;
  font-family: CircularStd-Book;
  color: #000;
`;

type InputProps = {
  placeholder: string,
  iconName: string,
  type: string,
};

const Input = ({ placeholder, iconName, type }: InputProps): Object => (
  <ContentContainer
    color={'#fff'}
  >
    <InputWrapper>
      <InputIcon
        iconName={iconName}
      />
      <CustomInput
        placeholder={placeholder}
        type={type}
      />
    </InputWrapper>
  </ContentContainer>
);

export default Input;
