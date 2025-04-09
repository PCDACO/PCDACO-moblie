import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { useCarForm } from '~/hooks/car/use-car-form';
import { translate } from '~/lib/translate';
import { useStepStore } from '~/store/use-step';

interface SuccessScreenProps {
  id?: string;
  form: ReturnType<typeof useCarForm>['form'];
}

export default function SuccessScreen({ id, form }: SuccessScreenProps) {
  const { setStep } = useStepStore();
  const router = useRouter();
  const handleNewCar = () => {
    setStep(1);
    form.reset();
    router.replace('/cars/edit');
  };

  const handleViewCars = () => {
    router.push('/cars');
  };

  return (
    <View className="flex-1 items-center justify-center bg-white p-6">
      <View className="mb-6 h-20 w-20 items-center justify-center rounded-full bg-green-100">
        <Feather name="check-circle" size={48} color="#16a34a" />
      </View>

      <Text className="mb-2 text-xl font-semibold">
        {id ? translate.cars.toast.update : translate.cars.toast.create}
      </Text>
      <Text className="mb-8 text-center text-gray-500">
        {id
          ? 'Xe của bạn đã được cập nhật thành công và đang chờ xét duyệt.'
          : 'Xe của bạn đã được đăng ký thành công và đang chờ xét duyệt.'}
      </Text>

      <View className="mb-6 w-full max-w-md rounded-xl bg-white p-4 shadow-sm">
        <Text className="mb-3 text-sm font-medium">Thông tin xe</Text>
        <View className="space-y-2">
          <View className="flex-row justify-between">
            <Text className="text-sm text-gray-500">Trạng thái:</Text>
            <Text className="text-sm font-medium text-amber-600">Đang xét duyệt</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-sm text-gray-500">Thời gian xét duyệt:</Text>
            <Text className="text-sm font-medium">24-48 giờ</Text>
          </View>
          {/* <View className="flex-row justify-between">
            <Text className="text-sm text-gray-500">Mã xe:</Text>
            <Text className="text-sm font-medium">
              {'CAR-' +
                Math.floor(Math.random() * 10000)
                  .toString()
                  .padStart(4, '0')}
            </Text>
          </View> */}
        </View>
      </View>

      <View className="w-full max-w-md gap-2 space-y-3">
        <TouchableOpacity
          onPress={handleViewCars}
          className="w-full items-center rounded-lg bg-primary py-4">
          <Text className="font-medium text-white">Xem danh sách xe</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNewCar}
          className="w-full items-center rounded-lg border border-gray-200 py-4">
          <Text className="font-medium text-black">Đăng ký xe khác</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
