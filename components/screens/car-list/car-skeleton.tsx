import { View } from 'react-native';

import Skeleton from '~/components/nativewindui/Skeleton';

const CarCardSkeleton = () => {
  return (
    <View className="w-full rounded-xl border border-gray-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
      <Skeleton height={160} borderRadius={8} />
      <View className="mt-4 gap-2">
        <Skeleton height={20} width="60%" />
        <Skeleton height={16} width="40%" />
        <Skeleton height={16} width="50%" />
      </View>
    </View>
  );
};

export default CarCardSkeleton;
