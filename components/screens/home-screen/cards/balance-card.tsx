import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { View, Text, Pressable } from 'react-native';

import Skeleton from '~/components/nativewindui/Skeleton';
import { UserResponse } from '~/constants/models/user.model';
import { COLORS } from '~/theme/colors';

interface BalanceCardProps {
  user: UserResponse;
}

const BalanceCardSkeleton = () => {
  return (
    <View className="mb-4 rounded-lg bg-white p-4 shadow-sm dark:bg-slate-300">
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Skeleton width={120} height={24} />
          <Skeleton width={160} height={32} className="mt-2" />
        </View>
        <Skeleton width={48} height={48} borderRadius={24} />
      </View>
      <View className="mt-4 flex-row justify-between">
        <View className="items-center">
          <Skeleton width={80} height={16} />
          <Skeleton width={48} height={24} className="mt-1" />
        </View>
        <View className="items-center">
          <Skeleton width={80} height={16} />
          <Skeleton width={48} height={24} className="mt-1" />
        </View>
        <View className="items-center">
          <Skeleton width={80} height={16} />
          <Skeleton width={48} height={24} className="mt-1" />
        </View>
      </View>
    </View>
  );
};

export const BalanceCard = ({ user }: BalanceCardProps) => {
  if (!user) {
    return <BalanceCardSkeleton />;
  }

  return (
    <View className="mb-4 rounded-lg bg-white p-4 shadow-sm dark:bg-slate-300">
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-base font-bold text-gray-900 dark:text-gray-100">
            Số dư tài khoản
          </Text>
          <Text className="mt-1 text-2xl font-bold text-primary">
            {user.balance?.toLocaleString('vi-VN')} VND
          </Text>
        </View>
        <Pressable
          className="bg-primary/10 h-12 w-12 items-center justify-center rounded-full"
          onPress={() => router.push('/(second)/bank-account')}>
          <Ionicons name="wallet-outline" size={24} color={COLORS.light.primary} />
        </Pressable>
      </View>
      <View className="mt-4 flex-row justify-between">
        <View className="items-center">
          <Text className="text-sm text-gray-500 dark:text-gray-400">Tổng xe</Text>
          <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {user.totalCar || 0}
          </Text>
        </View>
        <View className="items-center">
          <Text className="text-sm text-gray-500 dark:text-gray-400">Đã cho thuê</Text>
          <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {user.totalRented || 0}
          </Text>
        </View>
        <View className="items-center">
          <Text className="text-sm text-gray-500 dark:text-gray-400">Đang thuê</Text>
          <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {user.totalRent || 0}
          </Text>
        </View>
      </View>
    </View>
  );
};
