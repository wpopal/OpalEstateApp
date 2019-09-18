import {Dimensions, View} from 'react-native';

import styled from 'styled-components';

const {height: viewportHeight} = Dimensions.get('window');

export const ContentContainer = styled(View)`
  width: 100%;
  height: ${(viewportHeight / 100) * 8}px;
  justify-content: center;
  align-items: center;
  border: solid 1px #e5e5e5;
  margin-bottom: 15px;
  background-color: #fff;
  border-radius: 10px;
`;
