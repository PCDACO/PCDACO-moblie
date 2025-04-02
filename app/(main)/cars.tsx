import { Feather, FontAwesome5, Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Backdrop from '~/components/plugins/back-drop';
import Loading from '~/components/plugins/loading';
import { SearchInput } from '~/components/plugins/search-input';
import CarCard from '~/components/screens/car-list/car-card';
import CarParams from '~/components/screens/car-list/car-params';
import { useCarQuery } from '~/hooks/car/use-car';
import { useStepStore } from '~/store/use-step';
import { COLORS } from '~/theme/colors';

const CarsScreen = () => {
  const router = useRouter();
  const { resetStep } = useStepStore();
  const { data: cars, isLoading } = useCarQuery({
    params: {
      limit: 10,
    },
  });

  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  const sheetRef = React.useRef<BottomSheet>(null);
  const snapPoints = React.useMemo(() => ['1%', '45%'], []);

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

  return (
    <SafeAreaView className="relative h-full flex-1">
      <View className="flex-row items-center gap-2 px-4">
        <SearchInput className="flex-1" />
      </View>
      <View className="flex-1">
        {isLoading && (
          <View className="flex-1 items-center justify-center">
            <Loading />
          </View>
        )}

        {!isLoading && (
          <FlatList
            data={cars?.value.items}
            renderItem={({ item }) => <CarCard car={item} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingTop: 16,
            }}
            ListEmptyComponent={
              <View className="h-screen flex-1 items-center justify-center gap-2">
                <FontAwesome5 name="car-side" size={40} color={COLORS.gray} />
                <Text className="text-lg font-bold text-muted">Không có xe nào</Text>
              </View>
            }
            ItemSeparatorComponent={() => <View className="h-2" />}
          />
        )}
      </View>

      <TouchableOpacity
        className="absolute bottom-16 right-4 items-center justify-center rounded-full border border-gray-200 bg-white dark:border-gray-700 dark:bg-slate-300"
        style={{
          padding: 10,
        }}
        onPress={() => {
          handleSnapPress(1);
        }}>
        <Ionicons name="options-outline" size={20} color={COLORS.black} />
      </TouchableOpacity>

      <TouchableOpacity
        className="absolute bottom-4 right-4 size-10 items-center justify-center rounded-full bg-blue-500"
        onPress={() => {
          resetStep();
          router.push({
            pathname: '/cars/edit',
          });
        }}>
        <Feather name="plus" size={24} color="white" />
      </TouchableOpacity>

      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        backdropComponent={
          isSheetOpen ? (props) => <Backdrop {...props} onPress={handleClosePress} /> : null
        }
        onChange={handleSheetChange}>
        <BottomSheetView className="relative flex-1 bg-white dark:bg-slate-300">
          <CarParams close={handleClosePress} />
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default CarsScreen;
