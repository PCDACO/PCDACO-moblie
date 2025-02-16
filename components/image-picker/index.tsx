import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';

import { Camera } from '~/lib/icons/icon';

interface ImagePickerProps {
  onImagePicked?: (imageUri: string) => void;
}

const CustomImagePicker: React.FC<ImagePickerProps> = ({ onImagePicked }) => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      onImagePicked?.(result.assets[0].uri);
    }
  };

  return (
    <View className="items-center">
      <TouchableOpacity
        className="w-full items-center justify-center rounded-lg border border-dashed border-muted-foreground bg-background/60 p-10 "
        onPress={pickImage}>
        <Camera className="text-muted-foreground" size={40} />
        <Text className="text-lg font-medium text-muted-foreground">Hình nền </Text>
      </TouchableOpacity>

      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          className="mt-4 h-40 w-40 rounded-lg"
          resizeMode="cover"
        />
      )}
    </View>
  );
};

export default CustomImagePicker;
