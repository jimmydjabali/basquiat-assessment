import React, {useEffect} from 'react';
import {BackHandler, StatusBar} from 'react-native';
import {Routes, Route, useNavigate, useLocation} from 'react-router-native';
import {Home, Document, Header} from './components';
import * as S from './styled';

const App = () => {
  const navigate = useNavigate();
  const {pathname} = useLocation();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigate(-1);
        return pathname !== '/';
      },
    );

    return () => backHandler.remove();
  }, [navigate, pathname]);

  return (
    <S.AppContainer>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/document/:id" element={<Document />} />
      </Routes>
    </S.AppContainer>
  );
};

export default App;
