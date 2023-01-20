import {View, StatusBar} from 'react-native';
import styled from 'styled-components';
import {getShadow} from '../../utils';
import {Text} from '../Text';

const statusBarHeight = StatusBar.currentHeight || 0;

export const HeaderContainer = styled(View)`
  background-color: #f1f2f6;
  height: ${statusBarHeight + 70}px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: ${statusBarHeight}px;

  ${getShadow(8)};
`;

export const HeaderText = styled(Text)`
  flex: 1;
  text-align: center;
  font-size: 24px;
`;

export const LanguageFlag = styled(Text)`
  font-size: 20px;
`;
