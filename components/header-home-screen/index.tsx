import React from 'react';
import { View, Text, Image } from 'react-native';

const HeaderProfile = () => {
  return (
    <View className="flex-row items-center gap-1">
      <Image source={{ uri: 'https://via.placeholder.com/80' }} className="size-12 rounded-full" />
      <View className="gap-1">
        <Text className="font-semibold">Trần Hoàng Trung Anh</Text>
        <Text className="text-muted-foreground">Chủ sở hữu xe</Text>
      </View>
    </View>
  );
};

export default HeaderProfile;
