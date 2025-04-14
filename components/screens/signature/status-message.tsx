import MaterialIcons from '@expo/vector-icons/build/MaterialIcons';
import type React from 'react';
import { Text, View } from 'react-native';

import Loading from '~/components/plugins/loading';

interface StatusIndicatorProps {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  successMessage?: string;
  errorMessage?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  isLoading,
  isSuccess,
  isError,
  successMessage = 'Chữ ký đã được lưu thành công',
  errorMessage = 'Đã xảy ra lỗi khi lưu chữ ký',
}) => {
  if (!isLoading && !isSuccess && !isError) return null;

  return (
    <View className="mt-4 rounded-lg p-4">
      {isLoading && (
        <View className="flex-row items-center justify-center space-x-2 rounded-lg bg-blue-50 p-3">
          <Loading />
          <Text className="font-medium text-blue-700">Đang xử lý...</Text>
        </View>
      )}

      {isSuccess && (
        <View className="flex-row items-center space-x-2 rounded-lg bg-green-50 p-3">
          <MaterialIcons name="check-circle" size={20} color="#10b981" />
          <Text className="font-medium text-green-700">{successMessage}</Text>
        </View>
      )}

      {isError && (
        <View className="flex-row items-center space-x-2 rounded-lg bg-red-50 p-3">
          <MaterialIcons name="error" size={20} color="#ef4444" />
          <Text className="font-medium text-red-700">{errorMessage}</Text>
        </View>
      )}
    </View>
  );
};
