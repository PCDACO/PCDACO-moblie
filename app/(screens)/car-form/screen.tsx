import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { FunctionComponent, useEffect } from 'react';
import { Text, View } from 'react-native';

const CarFormScreen: FunctionComponent = () => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: id ? 'Chỉnh sửa thông tin xe' : 'Tạo mới xe',
      headerTitleAlign: 'center',
      headerTitleStyle: { fontWeight: 'bold' },
      contentStyle: { backgroundColor: '#F0F0F0' },
    });
  }, [id, navigation]);

  return (
    <View>
      <Text>CarFormScreen</Text>
    </View>
  );
};

export default CarFormScreen;
