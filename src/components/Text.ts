import {Text as RootText} from 'react-native';
import styled from 'styled-components';

type TextProps = {
  isError?: boolean;
  weight?: number;
  italic?: boolean;
  color?: string;
};

export const Text = styled(RootText)<TextProps>`
  color: ${({isError, color}) => color || (isError ? '#ff4757' : '#2f3542')};
  font-family: ${({weight = 400, italic}) =>
    `Poppins-${(() => {
      switch (weight) {
        case 100:
          return 'Thin';
        case 200:
          return 'ExtraLight';
        case 300:
          return 'Light';
        case 400:
          return !italic ? 'Regular' : '';
        case 500:
          return 'Medium';
        case 600:
          return 'SemiBold';
        case 700:
          return 'Bold';
        case 800:
          return 'ExtraBold';
        case 900:
          return 'Black';
        default:
          return undefined;
      }
    })()}${italic ? 'Italic' : ''}`};
`;
