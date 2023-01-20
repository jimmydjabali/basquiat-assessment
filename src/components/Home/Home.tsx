import {useQuery} from 'graphql-hooks';
import {useCallback, useLayoutEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  FlatListProps,
  ListRenderItem,
} from 'react-native';
import {Text} from '../Text';
import {HomeDocument} from './components';
import {documentHeight} from './components/HomeDocument/styled';
import * as S from './styled';

const FIND_DEMO_DOCUMENTS_QUERY = `query FindDemoDocumentsQuery($offset: Int) {
  findDemoDocuments(offset: $offset) {
    elements {
      title
      id
      description
      updatedAt
      createdAt
    }
    pageInfo {
      limit
      currentOffset
      hasNextPage
      hasPreviousPage
      nextOffset
      previousOffset
    }
    count
  }
}`;

export type DocumentType = {
  title: string;
  id: string;
  description: string;
  updatedAt: string;
  createdAt: string;
};

type FindDemoDocumentsQueryType = {
  findDemoDocuments: {
    pageInfo: {
      limit: number;
      currentOffset: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      nextOffset: number | null;
      previousOffset: number | null;
    };
    elements: DocumentType[];
    count: number;
  };
};

export const Home = () => {
  const {t} = useTranslation();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [queryOffset, setQueryOffset] = useState(0);
  const [documentsList, setDocumentsList] = useState<DocumentType[]>([]);

  const {loading, error, data} = useQuery<FindDemoDocumentsQueryType>(
    FIND_DEMO_DOCUMENTS_QUERY,
    {
      variables: {
        offset: queryOffset,
      },
    },
  );

  useLayoutEffect(() => {
    if (!loading) {
      setIsInitialLoading(false);
      setDocumentsList([
        ...documentsList,
        ...(data?.findDemoDocuments.elements || []),
      ]);
    }
  }, [loading]);

  const renderItem = useCallback<ListRenderItem<DocumentType>>(
    element => <HomeDocument {...element.item} />,
    [],
  );

  const getItemLayout = useCallback<
    NonNullable<FlatListProps<DocumentType>['getItemLayout']>
  >(
    (_, index) => ({
      length: documentHeight,
      offset: (documentHeight + 16) * index,
      index,
    }),
    [],
  );

  const onEndReached = useCallback(() => {
    if (data?.findDemoDocuments.pageInfo.hasNextPage) {
      setQueryOffset(data.findDemoDocuments.pageInfo.nextOffset || 0);
    }
  }, [
    data?.findDemoDocuments.pageInfo.hasNextPage,
    data?.findDemoDocuments.pageInfo.nextOffset,
  ]);

  return (
    <S.HomeContainer>
      {isInitialLoading ? (
        <ActivityIndicator size="large" />
      ) : error ? (
        <Text isError>{t('errorFetchingFromServer')}</Text>
      ) : (
        <FlatList
          ListHeaderComponent={<S.ListHeaderFooterComponent />}
          initialNumToRender={1}
          maxToRenderPerBatch={1}
          windowSize={1}
          onEndReachedThreshold={1.5}
          updateCellsBatchingPeriod={100}
          getItemLayout={getItemLayout}
          onEndReached={onEndReached}
          refreshing={loading}
          data={documentsList}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          ListFooterComponent={<S.ListHeaderFooterComponent />}
        />
      )}
    </S.HomeContainer>
  );
};
