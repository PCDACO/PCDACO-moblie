import { Entypo, Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import CarAmenity from '~/components/form/car-form/car-amenity';
import CarBasicInfo from '~/components/form/car-form/car-basic-info';
import CarDescription from '~/components/form/car-form/car-description';
import CarImage from '~/components/form/car-form/car-image';
import CarPreview from '~/components/form/car-form/car-preview';
import CarPriceTerm from '~/components/form/car-form/car-price-term';
import VehicleRegistration from '~/components/form/car-form/vehicle-registration';
import { ProgressIndicator } from '~/components/nativewindui/ProgressIndicator';
import { Text } from '~/components/nativewindui/Text';
import HeaderTitle from '~/components/screens/car-editor/header-title';
import ErrorScreen from '~/components/screens/car-editor/status/error-screen';
import LoadingScreen from '~/components/screens/car-editor/status/loading-screen';
import SuccessScreen from '~/components/screens/car-editor/status/success-screen';
import { useCarForm } from '~/hooks/car/use-car-form';
import { cn } from '~/lib/cn';
import { useStepStore } from '~/store/use-step';

const EditCarScreen: React.FC = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { step, prevStep, nextStep } = useStepStore();
  const [progress, setProgress] = React.useState<number>(0);

  const { form, checkConditionOfEachStep, isError, isSuccess, isLoading, onSubmit } = useCarForm({
    id: id as string,
  });

  const totalStep = 7;

  React.useEffect(() => {
    setProgress((step / totalStep) * 100);
  }, [step]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <ErrorScreen />;
  }

  if (isSuccess) {
    return <SuccessScreen />;
  }

  return (
    <SafeAreaView className="relative h-full dark:bg-gray-900">
      <View className="relative">
        <TouchableOpacity onPress={() => router.back()} className="absolute left-0 top-0 p-2">
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <HeaderTitle title={id ? 'Chỉnh sửa xe' : 'Tạo xe'} />
        <ProgressIndicator value={progress} />
      </View>

      <ScrollView className="h-screen px-2">
        <View className=" rounded-lg" style={{ paddingBottom: 100 }}>
          {step === 1 && <CarImage form={form} />}
          {step === 2 && <CarBasicInfo form={form} />}
          {step === 3 && <CarAmenity form={form} />}
          {step === 4 && <CarDescription form={form} />}
          {step === 5 && <CarPriceTerm form={form} />}
          {step === 6 && <VehicleRegistration form={form} />}
          {step === 7 && <CarPreview form={form} />}
        </View>
      </ScrollView>

      <View
        className={cn(
          'absolute bottom-4 left-0 right-0 flex w-full flex-row items-center justify-between bg-white px-2 py-4 dark:bg-gray-900'
        )}>
        {step > 1 ? (
          <TouchableOpacity
            onPress={prevStep}
            className="flex-row items-center border border-input bg-white px-4 py-2"
            style={{
              borderRadius: 6,
            }}>
            <Entypo name="chevron-left" size={20} color="black" />
            <Text className="text-sm font-bold text-foreground">Quay lại</Text>
          </TouchableOpacity>
        ) : (
          <View />
        )}

        {step === totalStep && (
          <TouchableOpacity
            onPress={() => {
              onSubmit();
            }}
            className="flex-row items-center gap-2 bg-primary px-4 py-2"
            style={{
              borderRadius: 6,
            }}>
            <Text className="text-sm font-bold text-background">Hoàn tất</Text>
            <Feather name="check" size={18} color="white" />
          </TouchableOpacity>
        )}
        {step < 7 && (
          <TouchableOpacity
            onPress={() => {
              checkConditionOfEachStep(step, id as string);
            }}
            className="flex-row items-center bg-primary px-4 py-2"
            style={{
              borderRadius: 6,
            }}>
            <Text className="text-sm font-bold text-background">Tiếp theo</Text>
            <Entypo name="chevron-right" size={20} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default EditCarScreen;
