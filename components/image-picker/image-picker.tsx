import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';

interface ImagePickerProps {
  onChange?: (file: string[]) => void;
  contextInput: React.ReactNode;
}

const ImagePickerButton: React.FC<ImagePickerProps> = ({ onChange, contextInput }) => {
  const pickImages = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Quyền truy cập bị từ chối', 'Bạn cần cấp quyền để chọn ảnh.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      //   selectionLimit: maxImages - imageUris.length,
      quality: 1,
    });

    if (!result.canceled) {
      const newUris = result.assets.map((asset) => asset.uri);
      onChange?.(newUris);
    }
  };

  return (
    <View>
      <TouchableOpacity
        className="w-full items-center justify-center rounded-lg border border-dashed border-gray-400 bg-background p-6"
        onPress={pickImages}>
        {contextInput}
      </TouchableOpacity>
    </View>
  );
};

export default ImagePickerButton;
