import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, SafeAreaView } from 'react-native';

import { CarAvailabilityForm } from '~/components/form/car-form/avaibility-form';
import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
import Loading from '~/components/plugins/loading';
import { useCarUnavailableQuery } from '~/hooks/car/use-car';
import { useCarAvalibilityForm } from '~/hooks/car/use-car-avalibility';

const CarAvailabilityScreen = () => {
  const { id } = useLocalSearchParams();

  const { data, isLoading } = useCarUnavailableQuery({
    id: id as string,
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const { form, onSubmit, isLoading: isLoadingForm } = useCarAvalibilityForm(id as string);

  React.useEffect(() => {
    if (data?.value && data.value.length > 0) {
      form.setValue('dates', [
        new Date(data.value[0].date).toISOString(),
        ...data.value.slice(1).map((item) => new Date(item.date).toISOString()),
      ]);
    }
  }, [data]);

  if (isLoading) {
    return (
      <View className="h-full flex-1 items-center justify-center">
        <Loading />
      </View>
    );
  }

  return (
    <SafeAreaView className="relative h-full px-4 dark:bg-gray-900">
      <View className="mt-4">
        <CarAvailabilityForm form={form} />
      </View>

      <View className="absolute bottom-8 left-0 right-0 px-4">
        <Button onPress={onSubmit} disabled={isLoadingForm}>
          {isLoadingForm ? (
            <>
              <Loading size="small" />
              <Text>Đang lưu thay đổi</Text>
            </>
          ) : (
            <Text>Lưu thay đổi</Text>
          )}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default CarAvailabilityScreen;
