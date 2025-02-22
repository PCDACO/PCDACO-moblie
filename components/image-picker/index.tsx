import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, FlatList, Alert } from 'react-native';

import { CircleX, Camera } from '~/lib/icons/icon';

interface ImagePickerProps {
  onImagesPicked?: (imageUris: string[]) => void;
  maxImages?: number;
}

const CustomImagePicker: React.FC<ImagePickerProps> = ({ onImagesPicked, maxImages = 5 }) => {
  const [imageUris, setImageUris] = useState<string[]>([]);

  const pickImages = async () => {
    if (imageUris.length >= maxImages) return;

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Quyền truy cập bị từ chối', 'Bạn cần cấp quyền để chọn ảnh.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: maxImages - imageUris.length,
      quality: 1,
    });

    if (!result.canceled) {
      const newUris = result.assets.map((asset) => asset.uri);
      const updatedUris = [...imageUris, ...newUris].slice(0, maxImages);
      setImageUris(updatedUris);
      onImagesPicked?.(updatedUris);
    }
  };

  const removeImage = (uri: string) => {
    const updatedUris = imageUris.filter((imageUri) => imageUri !== uri);
    setImageUris(updatedUris);
    onImagesPicked?.(updatedUris);
  };

  return (
    <View className="items-center gap-4">
      {/* Danh sách ảnh */}
      <FlatList
        data={imageUris}
        numColumns={3}
        keyExtractor={(_, index) => index.toString()}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View className="relative m-2">
            <Image source={{ uri: item }} className="size-28 rounded-lg" resizeMode="cover" />
            <TouchableOpacity
              className="absolute right-2 top-2 rounded-full  p-1"
              onPress={() => removeImage(item)}>
              <CircleX className="rounded-full bg-background text-destructive" size={18} />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Ẩn nút chọn ảnh khi đủ giới hạn */}
      {imageUris.length < maxImages && (
        <TouchableOpacity
          className="w-full items-center justify-center rounded-lg border border-dashed border-gray-400 bg-background p-6"
          onPress={pickImages}>
          <Camera className="text-muted-foreground" size={40} />

          <Text className="text-xl font-medium text-muted-foreground">Chọn hình ảnh</Text>
          {/* Hiển thị số ảnh đã chọn */}
          <Text className="text-sm text-muted-foreground">{`Đã chọn ${imageUris.length}/${maxImages} ảnh`}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomImagePicker;
