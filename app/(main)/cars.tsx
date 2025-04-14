import { FontAwesome5 } from '@expo/vector-icons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Backdrop from '~/components/plugins/back-drop';
import FloatingMenu from '~/components/plugins/floating-menu';
import { SearchInput } from '~/components/plugins/search-input';
import CarCard from '~/components/screens/car-list/car-card';
import CarParams from '~/components/screens/car-list/car-params';
import CarCardSkeleton from '~/components/screens/car-list/car-skeleton';
import { useCarMutation, useCarQuery } from '~/hooks/car/use-car';
import { useCarParamsStore } from '~/store/use-params';
import { useSearchStore } from '~/store/use-search';
import { useStepStore } from '~/store/use-step';
import { COLORS } from '~/theme/colors';

const CarsScreen = () => {
  const router = useRouter();
  const { resetStep } = useStepStore();
  const { params } = useCarParamsStore();
  const { searchKeyword } = useSearchStore();
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const {
    data: cars,
    isLoading,
    refetch,
  } = useCarQuery({
    params: {
      ...params,
      keyword: searchKeyword,
    },
  });

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  };

  const { deleteMutation } = useCarMutation();

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

  const handleAskDelete = (id: string) => {
    Alert.alert('Xác nhận xóa', 'Bạn có chắc chắn muốn xóa xe này?', [
      {
        text: 'Hủy',
        style: 'cancel',
      },
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: () => {
          deleteMutation.mutate(id);
        },
      },
    ]);
  };

  return (
    <SafeAreaView className="relative h-full flex-1">
      <View className="flex-row items-center gap-2 px-4">
        <SearchInput className="flex-1" />
      </View>
      <View className="flex-1">
        {isLoading && (
          <FlatList
            data={[1, 2, 3, 4]}
            keyExtractor={(item) => item.toString()}
            renderItem={() => <CarCardSkeleton />}
            contentContainerStyle={{ padding: 16 }}
            ItemSeparatorComponent={() => <View className="h-2" />}
          />
        )}

        {!isLoading && (
          <FlatList
            data={cars?.value.items}
            renderItem={({ item }) => <CarCard car={item} onDelete={handleAskDelete} />}
            keyExtractor={(item) => item.id}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
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
      <FloatingMenu
        className="absolute bottom-4 right-4"
        buttons={[
          {
            icon: 'filter-outline',
            label: 'Bộ lọc',
            color: COLORS.gray,
            onPress: () => handleSnapPress(1),
          },
          {
            icon: 'add',
            label: 'Thêm xe',
            color: COLORS.light.primary,
            onPress: () => {
              resetStep();
              router.push({
                pathname: '/cars/edit',
              });
            },
          },
        ]}
      />

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
