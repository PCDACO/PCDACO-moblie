import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { FunctionComponent } from 'react';
import { Controller } from 'react-hook-form';
import { View, Text, TouchableOpacity, Pressable, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import FieldLayout from '~/components/layouts/field-layout';
import { Input } from '~/components/layouts/input-with-icon';

import Subtitle from '~/components/screens/car-editor/subtitle';
import { useCarForm } from '~/hooks/car/use-car-form';
import { useModelQuery } from '~/hooks/models/use-model';
import useDebounce from '~/hooks/plugins/use-debounce';
import { useLocationStore } from '~/store/use-location';
import { COLORS } from '~/theme/colors';

interface CarBasicInfoProps {
  form: ReturnType<typeof useCarForm>['form'];
  onShowSuggestions: (value: string) => void;
}

const CarBasicInfo: FunctionComponent<CarBasicInfoProps> = ({ form }) => {
  const router = useRouter();
  const selectedLocation = useLocationStore((state) => state.selectedLocation);

  const [searchModel, setSearchModel] = React.useState<string>('');
  const searchModelDebounce = useDebounce(searchModel, 500);
  const [showSuggestions, setShowSuggestions] = React.useState(false);

  // fetch data
  const { data: modelData, isLoading: isLoadingModel } = useModelQuery({
    params: { index: 1, size: 600, keyword: searchModelDebounce || undefined },
  });

  // React.useEffect(() => {
  //   const modelId = form.getValues('modelId');

  //   if ((modelId && modelData?.value) || !searchModel) {
  //     const selectedModel = modelData?.value.items.find((item) => {
  //       return item.id === modelId;
  //     });

  //     if (selectedModel && !searchModel) {
  //       setSearchModel(selectedModel.name);
  //       setShowSuggestions(false);
  //     }
  //   }
  // }, [form.getValues('modelId'), modelData?.value]);

  React.useEffect(() => {
    if (selectedLocation) {
      form.setValue('pickupAddress', selectedLocation.address);
      form.setValue('pickupLatitude', selectedLocation.latitude);
      form.setValue('pickupLongitude', selectedLocation.longitude);
    }
  }, [selectedLocation, form.watch('modelId'), modelData?.value]);

  const handlePickupAddressPress = () => {
    router.push('/map');
  };

  return (
    <View className="gap-4 bg-white px-2 py-4 dark:bg-gray-900">
      {/* form car basic info */}
      <Subtitle title="Thông tin xe" />
      <View className="gap-4">
        <FieldLayout label="Mẫu xe" className="relative">
          <TouchableOpacity className="flex-row items-center justify-between rounded-md border border-gray-300 px-2 py-3">
            <Text className="text-sm font-medium">Mẫu xe</Text>
            <FontAwesome5 name="chevron-down" size={14} color={COLORS.gray} />
          </TouchableOpacity>
          {/* <Input
            placeholder="Nhập mẫu xe"
            value={searchModel}
            className="text-sm"
            onChangeText={(text) => {
              setSearchModel(text);
              setShowSuggestions(!!text);
            }}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 300)}
          />
          {showSuggestions && (
            <View
              className="w-full rounded-lg border border-gray-200 bg-white shadow-lg"
              style={{ top: '0%', zIndex: 100 }}>
              {isLoadingModel ? (
                <View className="h-20 items-center justify-center">
                  <Loading />
                </View>
              ) : (
                <View>
                  <FlatList
                    data={modelData?.value.items || []}
                    scrollEnabled={false}
                    keyboardShouldPersistTaps="handled"
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                      return (
                        <TouchableOpacity
                          className="border-b border-gray-200 bg-red-200 active:bg-gray-100"
                          onPress={() => {
                            console.log('Pressable clicked');
                            form.setValue('modelId', item.id);

                            setSearchModel(item.name);
                            setShowSuggestions(false);
                          }}
                          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                          <View className="px-4 py-2">
                            <Text>{item.name}</Text>
                          </View>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              )}
            </View>
          )} */}

          {form.formState.errors.modelId && (
            <Text className="text-red-500">{form.formState.errors.modelId.message}</Text>
          )}
        </FieldLayout>
        <FieldLayout label="Vị trí để xe">
          <Controller
            control={form.control}
            name="pickupAddress"
            render={({ field }) => (
              <TouchableOpacity onPress={handlePickupAddressPress}>
                <Input
                  {...field}
                  placeholder="Nhập vị trí để xe"
                  value={field.value || form.watch('pickupAddress')}
                  editable={false}
                  pointerEvents="none"
                />
              </TouchableOpacity>
            )}
          />
          {form.formState.errors.pickupAddress && (
            <Text className="text-xs text-destructive">
              {form.formState.errors.pickupAddress.message}
            </Text>
          )}
          {form.formState.errors.pickupLatitude && (
            <Text className="text-xs text-destructive">
              {form.formState.errors.pickupLatitude.message}
            </Text>
          )}
          {form.formState.errors.pickupLongitude && (
            <Text className="text-xs text-destructive">
              {form.formState.errors.pickupLongitude.message}
            </Text>
          )}
        </FieldLayout>
        <FieldLayout label="Biển số xe">
          <Controller
            control={form.control}
            name="licensePlate"
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Nhập biển số xe"
                value={field.value || form.watch('licensePlate')}
                onChangeText={field.onChange}
              />
            )}
          />
          {form.formState.errors.licensePlate && (
            <Text className="text-xs text-destructive">
              {form.formState.errors.licensePlate.message}
            </Text>
          )}
        </FieldLayout>
        <FieldLayout label="Màu sắc">
          <Controller
            control={form.control}
            name="color"
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Nhập màu sắc"
                onChangeText={field.onChange}
                value={field.value || form.watch('color')}
              />
            )}
          />
          {form.formState.errors.color && (
            <Text className="text-xs text-destructive">{form.formState.errors.color.message}</Text>
          )}
        </FieldLayout>
      </View>
    </View>
  );
};

export default CarBasicInfo;
