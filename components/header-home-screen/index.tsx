import React from 'react';
import { View, Text, Image } from 'react-native';

const HeaderProfile = () => {
  return (
    <View className="flex-row items-center gap-1">
      <Image
        source={require('~/assets/placeholder.png')}
        className="size-12 rounded-full border border-gray-400"
      />
      <View className="gap-1">
        <Text className="font-semibold">Trần Hoàng Trung Anh</Text>
        <Text className="text-muted-foreground">Chủ sở hữu xe</Text>
      </View>
    </View>
  );
};

export default HeaderProfile;
