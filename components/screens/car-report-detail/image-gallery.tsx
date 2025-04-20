import React from 'react';
import { FlatList, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface ImageGalleryProps {
  images: string[];
  imageWidth: number; // Percentage of screen width (0.0-1.0)
  imageHeight: number; // Fixed height in pixels
  keyPrefix: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  imageWidth,
  imageHeight,
  keyPrefix,
}) => {
  return (
    <FlatList
      horizontal
      data={images}
      keyExtractor={(item, index) => `${keyPrefix}-${index}`}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <Image
          source={{ uri: item }}
          style={{
            width: width * imageWidth,
            height: imageHeight,
            marginRight: 10,
            borderRadius: 8,
          }}
          resizeMode="cover"
        />
      )}
    />
  );
};

export default ImageGallery;
