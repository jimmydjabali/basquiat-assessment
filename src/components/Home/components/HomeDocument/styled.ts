import {View, Pressable} from 'react-native';
import styled from 'styled-components';
import {getShadow} from '../../../../utils';
import {Text} from '../../../Text';

const containerPadding = 16;
export const documentHeight = 120;

export const DocumentContainer = styled(Pressable)`
  height: ${documentHeight}px;
  display: flex;
  position: relative;

  background-color: #f1f2f6;
  border-radius: 16px;
  margin: 8px 16px;
  padding: ${containerPadding}px;

  border-bottom-color: #dfe4ea;
  border-bottom-width: 2px;
`;

export const DocumentLine = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

export const DocumentTitle = styled(Text)`
  font-size: 18px;
  line-height: 22px;
  flex: 1;
`;

export const DocumentDescription = styled(Text)`
  margin-top: 8px;
`;

export const DocumentCreatedAt = styled(Text)`
  font-size: 11px;
  color: #a4b0be;
`;
