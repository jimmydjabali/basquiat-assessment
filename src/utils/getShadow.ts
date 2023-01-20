import {Platform} from 'react-native';

export const getShadow = (index: number) => {
  const shadowOffsetHeight = 0.6 * index;
  const shadowRadius = 0.54 * index;
  const shadowOpacity = 0.0015 * index + 0.18;
  return `
        z-index: ${index};
        ${(() => {
          switch (true) {
            case Platform.OS === 'android':
              return `
                elevation: ${index};
              `;
            case Platform.OS === 'ios':
              return `
                shadow-offset: 0px ${shadowOffsetHeight}px;
                shadow-radius: ${shadowRadius}px;
                shadow-color: rgb(0, 0, 0);
                shadow-opacity: ${shadowOpacity};
              `;
            default:
              return '';
          }
        })()}
      `;
};
