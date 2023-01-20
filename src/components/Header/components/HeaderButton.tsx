import {IconProp} from '@fortawesome/fontawesome-svg-core';
import React from 'react';
import * as S from './styled';

type HeaderButtonProps = {isEmpty?: boolean} & {
  icon?: IconProp;
  onPress: () => void;
  children?: JSX.Element;
};

export const HeaderButton = ({
  isEmpty,
  icon,
  onPress,
  children,
}: HeaderButtonProps) => {
  return (
    <S.ButtonContainer onPress={onPress} disabled={isEmpty}>
      {children ||
        (!isEmpty && <S.ButtonIcon icon={icon} color="#2f3542" size={32} />)}
    </S.ButtonContainer>
  );
};
