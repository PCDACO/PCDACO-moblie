import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { FunctionComponent, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';

import BasicInfoCar from '~/components/car-form/basic-info-car';
import RelateDocument from '~/components/car-form/relate-document';
import SecondInfoCar from '~/components/car-form/second-info-car';
import { Button } from '~/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { useCarForm } from '~/hooks/car/use-car-form';

const CarFormScreen: FunctionComponent = () => {
  const { id } = useLocalSearchParams();
  const { onSubmit, isLoading, form } = useCarForm();
  const navigation = useNavigation();
  const [activeTabs, setActiveTabs] = React.useState<string>('general');

  useEffect(() => {
    navigation.setOptions({
      headerTitle: id ? 'Chỉnh sửa thông tin xe' : 'Tạo mới xe',
      headerTitleAlign: 'center',
      headerTitleStyle: { fontWeight: 'bold' },
    });
  }, [id, navigation]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1">
      <Tabs value={activeTabs} onValueChange={setActiveTabs} className="flex-1">
        {/* Tabs List cố định */}
        <View className="shadow-md">
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
        </View>

        {/* Nội dung có thể cuộn */}
        <ScrollView className="flex-1 bg-muted px-4 py-4">
          <TabsContent value="general">
            <BasicInfoCar form={form} />
          </TabsContent>
          <TabsContent value="info">
            <SecondInfoCar form={form} />
          </TabsContent>
          <TabsContent value="license">
            <RelateDocument form={form} />
          </TabsContent>
        </ScrollView>
      </Tabs>
      <View className="bg-background p-4">
        <Button onPress={onSubmit} disabled={isLoading}>
          <Text className="text-background">{isLoading ? 'Đang lưu...' : 'Lưu'}</Text>
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CarFormScreen;
