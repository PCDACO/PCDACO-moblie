import { Feather, Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import * as React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ReportCard from '~/components/card/report/report-card';
import Backdrop from '~/components/plugins/back-drop';
import Loading from '~/components/plugins/loading';
import { SearchInput } from '~/components/plugins/search-input';
import ReportParams from '~/components/screens/report-list/report-params';
import { ReportParams as ReportParamsType } from '~/constants/models/report.model';
import { useReportQuery } from '~/hooks/report/use-report';
import { useReportParamsStore } from '~/store/use-params';
import { useSearchStore } from '~/store/use-search';
import { COLORS } from '~/theme/colors';

const BookReportsScreen = () => {
  const { searchKeyword } = useSearchStore();
  const { params } = useReportParamsStore();
  const [paramsReport, setParamsReport] = React.useState<Partial<ReportParamsType>>(params);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const {
    data: reports,
    isLoading,
    refetch,
  } = useReportQuery({
    params: paramsReport,
  });

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  };

  React.useEffect(() => {
    if (searchKeyword || params) {
      setParamsReport({
        keyword: searchKeyword,
        type: params?.type,
        status: params?.status,
      });
    }
  }, [searchKeyword, params]);

  const reportList = reports?.value.items || [];

  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  const sheetRef = React.useRef<BottomSheet>(null);
  const snapPoints = React.useMemo(() => ['1%', '60%'], []);

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
            data={reportList}
            renderItem={({ item }) => <ReportCard report={item} />}
            keyExtractor={(item) => item.id}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingTop: 16,
            }}
            ListEmptyComponent={
              <View className="h-96 flex-1 items-center justify-center gap-2">
                <Feather name="file-text" size={40} color={COLORS.gray} />
                <Text className="text-lg font-bold text-muted">
                  Không có báo cáo đơn đặt xe nào
                </Text>
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
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        backdropComponent={
          isSheetOpen ? (props) => <Backdrop {...props} onPress={handleClosePress} /> : null
        }
        onChange={handleSheetChange}>
        <BottomSheetView className="relative flex-1 bg-white dark:bg-slate-300">
          <ReportParams close={handleClosePress} />
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default BookReportsScreen;
