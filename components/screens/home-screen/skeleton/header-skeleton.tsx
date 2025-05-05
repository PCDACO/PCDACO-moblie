import { View } from 'react-native';

import Skeleton from '~/components/nativewindui/Skeleton';

export const HeaderSkeleton = () => {
  return (
    <View className="flex-row items-center justify-between rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-slate-300">
      <View className="flex-row items-center gap-2">
        <Skeleton width={40} height={40} borderRadius={20} />
        <View>
          <Skeleton width={120} height={20} className="mb-1" />
          <Skeleton width={160} height={16} />
        </View>
      </View>
    </View>
  );
};
