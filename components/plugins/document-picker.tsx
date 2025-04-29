import * as DocumentPicker from 'expo-document-picker';
// import * as FileSystem from 'expo-file-system';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { cn } from '~/lib/cn';

interface DocumentPickerButtonProps extends React.ComponentProps<typeof TouchableOpacity> {
  onChange?: (file: DocumentPicker.DocumentPickerAsset[]) => void;
  contextInput: React.ReactNode;
  className?: string;
  multiple?: boolean;
}

const DocumentPickerButton: React.FC<DocumentPickerButtonProps> = ({
  onChange,
  contextInput,
  className,
  multiple = true,
  ...props
}) => {
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
        multiple,
      });

      if (result.canceled) {
        return;
      }

      onChange && onChange(result.assets);
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };

  return (
    <View>
      <TouchableOpacity
        className={cn(
          'w-full items-center justify-center rounded-lg border border-dashed border-gray-400 bg-background p-6',
          className
        )}
        {...props}
        onPress={pickDocument}>
        {contextInput}
      </TouchableOpacity>
    </View>
  );
};

export default DocumentPickerButton;
