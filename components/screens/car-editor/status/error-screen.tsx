import { Feather } from '@expo/vector-icons';
import { View, Text, TouchableOpacity } from 'react-native';

import { useStepStore } from '~/store/use-step';

export default function ErrorScreen() {
  const { setStep } = useStepStore();
  const handleRetry = () => {};

  const handleContactSupport = () => {
    // In a real app, this would open a support chat or email
  };

  return (
    <View className="flex-1 items-center justify-center p-6">
      <View className="mb-6 h-20 w-20 items-center justify-center rounded-full bg-red-100">
        <Feather name="alert-circle" size={48} color="#DC2626" />
      </View>

      <Text className="mb-2 text-xl font-semibold">Đăng ký không thành công</Text>
      <Text className="mb-8 text-center text-gray-500">
        Có lỗi xảy ra khi đăng ký xe. Vui lòng thử lại sau.
      </Text>

      <View className="mb-6 w-full max-w-md rounded-xl bg-white p-4 shadow-sm">
        <Text className="mb-3 text-sm font-medium">Bạn có thể thử:</Text>
        <View className="space-y-2">
          <View className="flex-row items-start gap-2">
            <Text className="text-red-500">•</Text>
            <Text className="text-sm">Kiểm tra lại kết nối mạng của bạn</Text>
          </View>
          <View className="flex-row items-start gap-2">
            <Text className="text-red-500">•</Text>
            <Text className="text-sm">Kiểm tra lại thông tin đã nhập</Text>
          </View>
          <View className="flex-row items-start gap-2">
            <Text className="text-red-500">•</Text>
            <Text className="text-sm">Thử lại sau vài phút</Text>
          </View>
        </View>
      </View>

      <View className="w-full max-w-md space-y-3">
        <TouchableOpacity
          onPress={handleRetry}
          className="w-full flex-row items-center justify-center rounded-lg bg-primary p-4">
          <Feather name="refresh-cw" size={16} color="white" className="mr-2" />
          <Text className="font-medium text-white">Thử lại</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleContactSupport}
          className="w-full rounded-lg border border-gray-200 p-4">
          <Text className="text-center font-medium text-gray-800">Liên hệ hỗ trợ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
