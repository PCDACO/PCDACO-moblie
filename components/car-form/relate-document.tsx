import * as DocumentPicker from 'expo-document-picker';
import React from 'react';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';

import DocumentPickerButton from '../document-picker';
import FieldLayout from '../layout/field-layout';

import { useCarForm } from '~/hooks/car/use-car-form';
import FilePDF from '~/lib/icons/FilePDF';
import { CircleX, EyeIcon, Plus, Trash2 } from '~/lib/icons/icon';

interface RelateDocumentProps {
  form: ReturnType<typeof useCarForm>['form'];
}

interface DocumentItemProps {
  document: File;
}

const RelateDocument: React.FC<RelateDocumentProps> = ({ form }) => {
  const [documents, setDocuments] = React.useState<File[]>(form.watch('paperImages'));
  const [showDocumentModal, setShowDocumentModal] = React.useState<File>();

  console.log('documents', form.watch('paperImages'));

  React.useEffect(() => {
    const paperImagesSelected = form.watch('paperImages');
    if (paperImagesSelected) {
      setDocuments(paperImagesSelected);
    }
  }, [form]);

  const handleAddFile = React.useCallback(
    (file: DocumentPicker.DocumentPickerAsset[]) => {
      // Convert DocumentPickerAsset to File
      const newFile = file.map((file) => {
        return {
          uri: file.uri,
          name: file.name || 'file.pdf',
          type: file.mimeType || 'application/pdf',
        } as unknown as File;
      });

      console.log('newFile', newFile);

      setDocuments(newFile);

      // const updatedDocuments = [
      //   ...documents.filter((document) => !newFile.some((file) => file.name === document.name)),
      //   ...newFile,
      // ];

      // if (updatedDocuments.length > 0) {
      form.setValue('paperImages', newFile as [File, ...File[]]);
      // }
    },
    [documents]
  );

  const handleViewFile = async (file: File) => {
    setShowDocumentModal(file);
  };

  const handleCloseModal = () => {};

  const DocumentItem: React.FC<DocumentItemProps> = ({ document }) => {
    // console.log('document', document);

    const handleRemoveFile = () => {
      setDocuments(documents.filter((doc) => doc.name !== document.name));
      form.setValue(
        'paperImages',
        documents.filter((doc) => doc.name !== document.name) as [File, ...File[]]
      );
    };

    return (
      <View className="flex-row items-center justify-between gap-4 rounded-lg border border-input bg-background px-6 py-4">
        <View className="flex-1 flex-row items-center gap-2">
          <FilePDF width={24} height={24} fill="blue" />
          <Text className="flex-1 text-lg text-primary" numberOfLines={1} ellipsizeMode="tail">
            {document.name}
          </Text>
        </View>
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => handleViewFile(document)}>
            <EyeIcon className="size-6 text-primary" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRemoveFile}>
            <Trash2 className="size-6 text-destructive" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <FieldLayout label="Tài liệu liên quan">
      <DocumentPickerButton
        className="mt-4 bg-slate-50"
        onChange={(file) => handleAddFile(file)}
        contextInput={
          <View className="flex-row items-center gap-4">
            <Plus className="size-4 text-primary" />
            <Text className="text-xl text-primary">Tải thêm tài liệu</Text>
          </View>
        }
      />
      {form.formState.errors.paperImages && (
        <Text className="text-xs text-destructive">
          {form.formState.errors.paperImages.message}
        </Text>
      )}

      {/* Render list file */}

      <FlatList
        className="mt-4 "
        data={documents}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <DocumentItem document={item} />}
        ItemSeparatorComponent={() => <View className="h-2" />}
        scrollEnabled={false}
      />

      <Modal visible={!!showDocumentModal} transparent animationType="slide">
        <View className="flex-1 items-center justify-center bg-black/60">
          <View className="h-[80%] w-[90%] rounded-lg bg-white p-4">
            <TouchableOpacity onPress={handleCloseModal} className="absolute right-4 top-4 z-10">
              <CircleX className="text-destructive" />
            </TouchableOpacity>
            {/* {selectedFile && <WebView source={{ uri: selectedFile }} />} */}
          </View>
        </View>
      </Modal>
    </FieldLayout>
  );
};

export default RelateDocument;
