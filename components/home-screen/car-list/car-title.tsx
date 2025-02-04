import { useNavigation, useRouter } from 'expo-router';
import React from 'react';
import { View, Text, Pressable } from 'react-native';

const CarTitle = () => {
  const navigation = useNavigation();
  const router = useRouter();
  return (
    <View className="flex-row items-center justify-between">
      <Text className="w-fit text-2xl font-semibold">Xe của tôi</Text>
      <Pressable
        className="text-foreground"
        onPress={() => {
          // router.navigate('/(main)/(cars)/index');
          // router.push('/(main)/(cars)/index');
        }}>
        <Text className="w-fit text-lg text-primary">Xem thêm</Text>
      </Pressable>
    </View>
  );
};

export default CarTitle;
