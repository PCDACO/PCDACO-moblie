import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { FunctionComponent, useEffect } from 'react';
import { Text, View } from 'react-native';

import BasicInfoCar from '~/components/car-form/basic-info-car';
import SecondInfoCar from '~/components/car-form/second-info-car';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';

const CarFormScreen: FunctionComponent = () => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const [activeTabs, setActiveTabs] = React.useState<string>('general');

  useEffect(() => {
    navigation.setOptions({
      headerTitle: id ? 'Chỉnh sửa thông tin xe' : 'Tạo mới xe',
      headerTitleAlign: 'center',
      headerTitleStyle: { fontWeight: 'bold' },
      contentStyle: { backgroundColor: '#F0F0F0' },
    });
  }, [id, navigation]);

  return (
    <View className=" py-2">
      <Tabs
        value={activeTabs}
        onValueChange={(value) => setActiveTabs(value)}
        className="mx-auto w-full flex-col gap-2">
        <TabsList className="w-full flex-row">
          <TabsTrigger value="general" className="flex-1">
            <Text>Tổng quan</Text>
          </TabsTrigger>
          <TabsTrigger value="info" className="flex-1">
            <Text>Chi tiết</Text>
          </TabsTrigger>
          <TabsTrigger value="license" className="flex-1">
            <Text>Giấy tờ</Text>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="size-full bg-background px-4 py-4">
          <BasicInfoCar />
        </TabsContent>
        <TabsContent value="info" className="size-full bg-background px-4 py-4">
          <SecondInfoCar />
        </TabsContent>
        <TabsContent value="license" className="size-full bg-background px-4 py-4">
          <Text>giấy tờ Content</Text>
        </TabsContent>
      </Tabs>
    </View>
  );
};

export default CarFormScreen;
