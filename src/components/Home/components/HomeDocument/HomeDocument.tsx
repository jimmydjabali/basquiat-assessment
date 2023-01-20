import {
  formatDistanceToNow,
  intlFormat,
  isToday,
  isYesterday,
  parseISO,
} from 'date-fns';
import frLocale from 'date-fns/locale/fr';
import {useLayoutEffect, useMemo, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {Animated, Easing} from 'react-native';
import {useNavigate} from 'react-router-native';
import {DocumentType} from '../../Home';
import * as S from './styled';

type HomeDocumentProps = DocumentType;

const animationDelay = 1000;

export const HomeDocument = ({
  title,
  id,
  description,
  updatedAt,
  ...props
}: HomeDocumentProps) => {
  const navigate = useNavigate();
  const {t, i18n} = useTranslation();

  const translateY = useRef(new Animated.Value(100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const Component = Animated.createAnimatedComponent(S.DocumentContainer);

  const formattedUpdatedAt = useMemo(() => {
    const parsedDate = parseISO(updatedAt);

    if (isYesterday(parsedDate)) {
      return t('yesterday');
    }
    if (isToday(parsedDate)) {
      return formatDistanceToNow(parsedDate, {
        addSuffix: true,
        locale: i18n.language === 'fr' ? frLocale : undefined,
      });
    }
    return `${t('at')} ${intlFormat(parsedDate, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })}`;
  }, [t, updatedAt]);

  useLayoutEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: animationDelay,
        useNativeDriver: true,
        easing: Easing.out(Easing.exp),
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: animationDelay,
        useNativeDriver: true,
        easing: Easing.out(Easing.exp),
      }),
    ]).start();
  }, []);

  return (
    <Component
      style={{opacity, transform: [{translateY}]}}
      onPress={() => {
        navigate(`/document/${id}`, {
          state: {document: {title, id, description, updatedAt, ...props}},
        });
      }}>
      <S.DocumentLine>
        <S.DocumentTitle weight={600} numberOfLines={1}>
          {title}
        </S.DocumentTitle>
        <S.DocumentCreatedAt>{`${t(
          'updated',
        )} ${formattedUpdatedAt}`}</S.DocumentCreatedAt>
      </S.DocumentLine>
      <S.DocumentDescription
        {...(!description ? {italic: true, color: '#a4b0be'} : {})}>
        {description || t('noDescription')}
      </S.DocumentDescription>
    </Component>
  );
};
