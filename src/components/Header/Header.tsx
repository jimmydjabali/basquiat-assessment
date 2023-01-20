import * as S from './styled';
import {HeaderButton} from './components';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {useLocation, useNavigate} from 'react-router-native';
import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';

const languagesSupported = [
  {code: 'fr', flag: '🇫🇷'},
  {code: 'en', flag: '🇬🇧'},
];

export const Header = () => {
  const navigate = useNavigate();
  const {t, i18n} = useTranslation();
  const {pathname, state} = useLocation();

  const routeName = useMemo(() => {
    if (pathname === '/') {
      return t('home');
    }
    return state?.document?.title || '';
  }, [t, pathname, state?.document]);

  return (
    <S.HeaderContainer>
      <HeaderButton
        isEmpty={pathname === '/'}
        onPress={() => {
          navigate(-1);
        }}
        icon={faArrowLeft}
      />
      <S.HeaderText weight={600}>{routeName}</S.HeaderText>
      <HeaderButton
        onPress={() => {
          const newLanguageIndex =
            languagesSupported.findIndex(
              value => value.code === i18n.language,
            ) + 1;

          i18n.changeLanguage(
            languagesSupported[
              languagesSupported[newLanguageIndex] ? newLanguageIndex : 0
            ].code,
          );
        }}>
        <S.LanguageFlag>
          {languagesSupported.find(value => value.code === i18n.language)?.flag}
        </S.LanguageFlag>
      </HeaderButton>
    </S.HeaderContainer>
  );
};
