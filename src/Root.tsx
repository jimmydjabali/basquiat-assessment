import {NativeRouter} from 'react-router-native';
import {GraphQLClient, ClientContext} from 'graphql-hooks';
import App from './App';

const client = new GraphQLClient({
  url: 'https://app.st-basquiat.co/graphql/',
  headers: {Authorization: 'Token basquiat-demo-2023-a'},
});

import './config/i18n';

export const Root = () => (
  <NativeRouter>
    <ClientContext.Provider value={client}>
      <App />
    </ClientContext.Provider>
  </NativeRouter>
);
