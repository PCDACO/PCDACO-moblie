import { Entypo, Feather } from '@expo/vector-icons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
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
import CarSpecifications from '~/components/form/car-form/car-specifications';
import VehicleRegistration from '~/components/form/car-form/vehicle-registration';
import { ProgressIndicator } from '~/components/nativewindui/ProgressIndicator';
import { Text } from '~/components/nativewindui/Text';
import Backdrop from '~/components/plugins/back-drop';
import HeaderTitle from '~/components/screens/car-editor/header-title';
import SelectModel from '~/components/screens/car-editor/select-model';
import LoadingScreen from '~/components/screens/car-editor/status/loading-screen';
import SuccessScreen from '~/components/screens/car-editor/status/success-screen';
import { useCarDetailQuery } from '~/hooks/car/use-car';
import { useCarForm } from '~/hooks/car/use-car-form';
import { cn } from '~/lib/cn';
import { useStepStore } from '~/store/use-step';

const EditCarScreen: React.FC = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { data } = useCarDetailQuery({ id: id as string });

  const { step, prevStep } = useStepStore();
  const [progress, setProgress] = React.useState<number>(0);
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  const { form, checkConditionOfEachStep, isSuccess, isLoading, onSubmit } = useCarForm({
    id: id as string,
  });

  const totalStep = 8;

  React.useEffect(() => {
    setProgress((step / totalStep) * 100);
  }, [step]);

  const sheetRef = React.useRef<BottomSheet>(null);
  const snapPoints = React.useMemo(() => ['1%', '65%'], []);

  const handleSnapPress = React.useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
    setIsSheetOpen(index === snapPoints.length - 1);
  }, []);

  const handleSheetChange = React.useCallback((index: number) => {
    setIsSheetOpen(index === snapPoints.length - 1);
  }, []);

  const handleClosePress = React.useCallback(() => {
    sheetRef.current?.close();
    setIsSheetOpen(false);
  }, []);

  const handleShowSheetModal = (value: string) => {
    handleSnapPress(1);
  };

  React.useEffect(() => {
    if (data && data.value) {
      const carImages = data.value.images.filter((item) => item.type === 'Car');
      const paperImages = data.value.images.filter((item) => item.type === 'Paper');

      const convertCarImages = carImages.map((item) => ({
        uri: item.url,
        name: item.name,
        type: `image/${item.name.split('.').pop()}`,
      }));

      const convertPaperImages = paperImages.map((item) => ({
        uri: item.url,
        name: item.name,
        type: `image/jpeg`,
      }));

      form.setValue('carImages', convertCarImages || []);
      form.setValue('modelId', data.value.modelId || '');
      form.setValue('licensePlate', data.value.licensePlate || '');
      form.setValue('color', data.value.color || '');
      form.setValue('seat', data.value.seat || 0);
      form.setValue('description', data.value.description || '');
      form.setValue('fuelConsumption', data.value.fuelConsumption || 0);
      form.setValue('requiresCollateral', data.value.requiresCollateral || false);
      form.setValue('price', data.value.price || 0);
      form.setValue('terms', data.value.terms || '');
      form.setValue('amenityIds', (data.value.amenities.map((item) => item.id) as any) || []);
      form.setValue('pickupLatitude', data.value.pickupLocation.latitude || 0);
      form.setValue('pickupLongitude', data.value.pickupLocation.longitude || 0);
      form.setValue('pickupAddress', data.value.pickupLocation.address || '');
      form.setValue('paperImages', convertPaperImages || []);
      form.setValue('transmissionTypeId', data.value.transmissionId || '');
      form.setValue('fuelTypeId', data.value.fuelTypeId || '');
    }
  }, [data]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isSuccess) {
    return <SuccessScreen id={id as string} form={form} />;
  }

  return (
    <SafeAreaView className="relative h-full dark:bg-gray-900">
      <View className="relative gap-2">
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute bottom-1 left-2 z-10 p-2">
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <HeaderTitle title={id ? 'Chỉnh sửa hồ sơ xe' : 'Tạo hồ sơ xe'} />
        <ProgressIndicator value={progress} />
      </View>

      <ScrollView className="h-screen px-2">
        <View className=" rounded-lg" style={{ paddingBottom: 100 }}>
          {step === 1 && <CarImage form={form} />}
          {step === 2 && <CarBasicInfo form={form} onShowSheet={handleShowSheetModal} />}
          {step === 3 && <CarSpecifications form={form} />}
          {step === 4 && <CarAmenity form={form} />}
          {step === 5 && <CarDescription form={form} />}
          {step === 6 && <CarPriceTerm form={form} />}
          {step === 7 && <VehicleRegistration form={form} />}
          {step === 8 && <CarPreview form={form} />}
        </View>
      </ScrollView>

      <View
        className={cn(
          'absolute bottom-3 left-0 right-0 flex w-full flex-row items-center justify-between bg-white px-2 py-4 dark:bg-gray-900'
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
        {step < 8 && (
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

      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        backdropComponent={
          isSheetOpen ? (props) => <Backdrop {...props} onPress={handleClosePress} /> : null
        }
        onChange={handleSheetChange}>
        <BottomSheetView className="relative flex-1 bg-white dark:bg-slate-300">
          <SelectModel onClose={handleClosePress} form={form} />
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default EditCarScreen;
