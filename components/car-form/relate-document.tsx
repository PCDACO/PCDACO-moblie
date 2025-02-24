import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import DocumentPickerButton from '../document-picker';
import FieldLayout from '../layout/field-layout';

import { useCarForm } from '~/hooks/car/use-car-form';
import FilePDF from '~/lib/icons/FilePDF';
import { Plus, Trash2 } from '~/lib/icons/icon';

interface RelateDocumentProps {
  form: ReturnType<typeof useCarForm>['form'];
}

interface DocumentItemProps {
  document: string;
}

const DocumentItem: React.FC<DocumentItemProps> = ({ document }) => {
  return (
    <View className="flex-row items-center gap-4">
      <View>
        <FilePDF className="size-8 text-primary" />
        <Text className="text-lg text-primary">{document}</Text>
      </View>

      <TouchableOpacity>
        <Trash2 className="size-6 text-destructive" />
      </TouchableOpacity>
    </View>
  );
};

const RelateDocument: React.FC<RelateDocumentProps> = () => {
  return (
    <FieldLayout label="Tài liệu liên quan">
      <DocumentPickerButton
        className="bg-slate-50"
        onChange={(file) => {
          console.log('file', file.assets);
        }}
        contextInput={
          <View className="flex-row items-center gap-4">
            <Plus className="size-4 text-primary" />
            <Text className="text-xl text-primary">Tải thêm tài liệu</Text>
          </View>
        }
      />
    </FieldLayout>
  );
};

export default RelateDocument;
