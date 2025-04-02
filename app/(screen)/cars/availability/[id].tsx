import { useLocalSearchParams } from 'expo-router';
import { View, SafeAreaView } from 'react-native';

import { CarAvailabilityForm } from '~/components/form/car-form/avaibility-form';
import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
import Loading from '~/components/plugins/loading';
import { useCarAvalibilityForm } from '~/hooks/car/use-car-avalibility';

const CarAvailabilityScreen = () => {
  const { id } = useLocalSearchParams();
  const { form, onSubmit, isLoading } = useCarAvalibilityForm(id as string);

  return (
    <SafeAreaView className="relative h-full px-4 dark:bg-gray-900">
      <View className="mt-4">
        <CarAvailabilityForm form={form} />
      </View>

      <View className="absolute bottom-8 left-0 right-0 px-4">
        <Button onPress={onSubmit} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loading />
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
