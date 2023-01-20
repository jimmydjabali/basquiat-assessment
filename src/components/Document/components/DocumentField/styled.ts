import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Pressable, View, TextInput} from 'react-native';
import styled from 'styled-components';
import {Text} from '../../../Text';

export const FieldContainer = styled(View)<{isFirst?: boolean}>`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 24px;
`;

export const FieldLine = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const PressableEdit = styled(Pressable)`
  margin-left: 8px;
`;

export const EditIcon = styled(FontAwesomeIcon)``;

export const FieldLabel = styled(Text)`
  font-size: 14px;
  line-height: 20px;
  background: #2f3542;
  border-radius: 8px;
  padding: 4px 8px;
  color: white;
`;

export const FieldValue = styled(Text)<{}>`
  margin-top: 8px;
  padding: 0px 8px;
  padding-top: 17.4px;
  padding-bottom: 10.6px;
  font-size: 16px;
  border: 2px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FieldInput = styled(TextInput)`
  padding: 0px 8px;
  padding-top: 14.6px;
  padding-bottom: 12.4px;
  margin-top: 8px;
  font-size: 16px;
  font-family: Poppins-Regular;

  border-radius: 8px;
  border: 2px solid #2f3542;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SuccessText = styled(Text)`
  margin-left: 4px;
  color: #2ed573;
  align-self: flex-end;
`;
