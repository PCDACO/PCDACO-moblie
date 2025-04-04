import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';

import { cn } from '~/lib/cn';

interface ImagePickerProps extends React.ComponentProps<typeof TouchableOpacity> {
  onChange?: (file: ImagePicker.ImagePickerAsset[]) => void;
  contextInput: React.ReactNode;
  className?: string;
  multiple?: boolean;
  maxImages?: number;
}

const ImagePickerButton: React.FC<ImagePickerProps> = ({
  onChange,
  contextInput,
  className,
  multiple = false,
  maxImages = 1,
  ...props
}) => {
  const pickImages = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Quyền truy cập bị từ chối', 'Bạn cần cấp quyền để chọn ảnh.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: multiple,
      selectionLimit: maxImages,
      quality: 1,
    });

    if (!result.canceled) {
      onChange?.(result.assets);
    }
  };

  return (
    <View>
      <TouchableOpacity
        className={cn(
          'items-center justify-center rounded-lg border border-dashed border-gray-400 bg-white p-6 dark:bg-gray-900',
          className
        )}
        {...props}
        onPress={pickImages}>
        {contextInput}
      </TouchableOpacity>
    </View>
  );
};

export default ImagePickerButton;
