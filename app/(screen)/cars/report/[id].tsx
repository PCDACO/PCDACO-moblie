import { Feather } from '@expo/vector-icons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useLocalSearchParams } from 'expo-router';
import React, { FunctionComponent } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import CarReportForm from '~/components/form/car-report-form';
import { Button } from '~/components/nativewindui/Button';
import { Text as TextNative } from '~/components/nativewindui/Text';
import Backdrop from '~/components/plugins/back-drop';
import ErrorScreen from '~/components/screens/report-edit/status/error-screen';
import LoadingScreen from '~/components/screens/report-edit/status/loading-screen';
import SuccessScreen from '~/components/screens/report-edit/status/success-screen';
import { CarReportTypeNumber } from '~/constants/enums';
import { useCarReportForm } from '~/hooks/car-report/use-car-report-form';
import { useBottomSheet } from '~/hooks/plugins/use-bottom-sheet';
import { COLORS } from '~/theme/colors';

const ReportScreen: FunctionComponent = () => {
  const { id } = useLocalSearchParams();
  const { form, onSubmit, isLoading, isSuccess, isError } = useCarReportForm();

  const { sheetRef, isSheetOpen, handleSnapPress, handleClosePress } = useBottomSheet();

  const reportTypes = [
    { value: CarReportTypeNumber.ChangeGPS, label: 'Thay đổi GPS' },
    { value: CarReportTypeNumber.DeactivateCar, label: 'Ngưng sử dụng' },
    { value: CarReportTypeNumber.Other, label: 'Khác' },
  ];

  React.useEffect(() => {
    if (id) {
      form.setValue('carId', id as string);
    }
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isSuccess) {
    return <SuccessScreen type="car" />;
  }

  if (isError) {
    return <ErrorScreen type="car" />;
  }

  return (
    <View className="h-full flex-1">
      <View className="mt-4 px-2">
        <CarReportForm
          form={form}
          onOpenReportTypeSheet={() => handleSnapPress(1)}
          reportTypes={reportTypes}
        />
      </View>
      <View className="absolute bottom-0 left-0 right-0 z-10 bg-white p-4 dark:bg-slate-300">
        <Button onPress={onSubmit}>
          <Feather name="check-circle" size={20} color={COLORS.white} />
          <TextNative>Gửi báo cáo</TextNative>
        </Button>
      </View>

      <BottomSheet
        ref={sheetRef}
        snapPoints={['1%', '45%']}
        enableDynamicSizing={false}
        backdropComponent={
          isSheetOpen ? (props) => <Backdrop {...props} onPress={handleClosePress} /> : null
        }>
        <BottomSheetView>
          <View className="p-4">
            <Text className="mb-4 text-lg font-bold">Chọn loại báo cáo</Text>
            {reportTypes.map((type) => (
              <TouchableOpacity
                key={type.value}
                className="border-b border-gray-200 py-3 dark:border-gray-700"
                onPress={() => {
                  form.setValue('reportType', type.value);
                  handleClosePress();
                }}>
                <Text className="text-foreground">{type.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default ReportScreen;
