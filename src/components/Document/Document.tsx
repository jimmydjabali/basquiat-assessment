import {intlFormat, parseISO} from 'date-fns';
import {useCallback, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useLocation, useNavigate} from 'react-router-native';
import {DocumentField} from './components';
import * as S from './styled';

export type DocumentType = {
  title: string;
  id: string;
  description: string;
  updatedAt: string;
  createdAt: string;
};

export const Document = () => {
  const {i18n} = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const [isEditingField, setIsEditingField] = useState(false);

  const document = useMemo(
    () => location.state.document,
    [location.state.document],
  );

  const onUpdateDocument = useCallback(
    (updatedState: object) => {
      navigate(`/document/${document?.id}`, {
        replace: true,
        state: {document: {...document, ...updatedState}},
      });
    },
    [document?.id],
  );

  return (
    <S.DocumentContainer>
      {document &&
        Object.keys(document)
          .filter(key => key !== 'id')
          .map((key, index) => {
            const isDate = key === 'createdAt' || key === 'updatedAt';
            const value = document[key as keyof DocumentType];

            return (
              <DocumentField
                key={index}
                label={key}
                documentId={document.id}
                isEditable={!isDate}
                onUpdateDocument={onUpdateDocument}
                value={
                  isDate
                    ? intlFormat(
                        parseISO(value),
                        {
                          year: 'numeric',
                          month: 'long',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                        },
                        {
                          locale: i18n.language,
                        },
                      )
                    : value
                }
                disabled={isEditingField}
                onEditing={(isEditing: boolean) => {
                  setIsEditingField(isEditing);
                }}
                {...(index === 0 ? {style: {marginTop: 0}} : {})}
              />
            );
          })}
    </S.DocumentContainer>
  );
};
