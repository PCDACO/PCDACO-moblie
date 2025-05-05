import { View } from 'react-native';

import Skeleton from '~/components/nativewindui/Skeleton';

export const BalanceCardSkeleton = () => {
  return (
    <View className="border-b-2 border-l-4 border-b-blue-400 border-l-blue-400 bg-white p-4">
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
