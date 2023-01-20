import {faCheck, faPen, faUserEdit} from '@fortawesome/free-solid-svg-icons';
import {useMutation} from 'graphql-hooks';
import {useCallback, useMemo, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, TextInput, TextInputProps} from 'react-native';
import * as S from './styled';

type DocumentFieldProps = {
  label: string;
  value: string;
  disabled: boolean;
  onEditing: (isEditing: boolean) => void;
  isEditable: boolean;
  documentId: string;
  onUpdateDocument: (updatedState: object) => void;
};

export const DocumentField = ({
  label,
  value,
  disabled,
  onEditing,
  isEditable,
  documentId,
  onUpdateDocument,
  ...props
}: DocumentFieldProps) => {
  const {t} = useTranslation();
  const [initialValue, setInitialValue] = useState(value);
  const [isEditMode, setIsEditMode] = useState(false);
  const [fieldValue, setFieldValue] = useState(value);

  const [isSuccessUpdated, setIsSuccessUpdated] = useState(false);

  const UPDATE_DEMO_DOCUMENT_MUTATION = useMemo(
    () => `
    mutation UpdateDemoDocumentMutation($value: String!) {
      updateDemoDocument(id: "${documentId}", changes: {${label}: $value}) {
        ${label}
      }
    }`,
    [documentId, label],
  );

  const [updateDemoDocumentMutation] = useMutation(
    UPDATE_DEMO_DOCUMENT_MUTATION,
  );

  const [isLoading, setIsLoading] = useState(false);

  const isThisFieldDisabled = useMemo(
    () => !isEditMode && disabled,
    [isEditMode, disabled],
  );

  const onChangeText = useCallback<NonNullable<TextInputProps['onChangeText']>>(
    newValue => {
      setFieldValue(newValue);
    },
    [],
  );

  const onSubmit = useCallback(async () => {
    setIsEditMode(false);
    onEditing(false);

    if (initialValue !== fieldValue) {
      setIsLoading(true);
      const {error} = await updateDemoDocumentMutation({
        variables: {value: fieldValue},
      });

      if (!error) {
        onUpdateDocument({[label]: fieldValue});
        setInitialValue(fieldValue);
        setIsSuccessUpdated(true);
        setTimeout(() => {
          setIsSuccessUpdated(false);
        }, 2500);
      }

      setIsLoading(false);
    }
  }, [initialValue, fieldValue]);

  const inputRef = useRef<TextInput>(null);

  return (
    <S.FieldContainer {...props}>
      <S.FieldLine>
        <S.FieldLabel weight={600}>{t(label)}</S.FieldLabel>
        {isEditable && (
          <S.PressableEdit
            disabled={isThisFieldDisabled || isSuccessUpdated}
            onPress={() => {
              setIsEditMode(!isEditMode);
              onEditing(!isEditMode);

              if (!isEditMode) {
                setTimeout(() => {
                  inputRef.current?.focus();
                }, 0);
              } else {
                onSubmit();
              }
            }}>
            {isLoading ? (
              <ActivityIndicator size="small" />
            ) : (
              <S.EditIcon
                icon={isEditMode || isSuccessUpdated ? faCheck : faPen}
                color={
                  isSuccessUpdated
                    ? '#2ed573'
                    : isThisFieldDisabled
                    ? '#ced6e0'
                    : '#2f3542'
                }
                size={24}
              />
            )}
          </S.PressableEdit>
        )}
        {isSuccessUpdated && (
          <S.SuccessText weight={500}>{t('updated')}</S.SuccessText>
        )}
      </S.FieldLine>
      {isEditMode || isLoading ? (
        <S.FieldInput
          ref={inputRef}
          value={fieldValue}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
          onBlur={onSubmit}
          editable={!isLoading}
        />
      ) : (
        <S.FieldValue {...(!value ? {italic: true, color: '#a4b0be'} : {})}>
          {value || t('empty')}
        </S.FieldValue>
      )}
    </S.FieldContainer>
  );
};
