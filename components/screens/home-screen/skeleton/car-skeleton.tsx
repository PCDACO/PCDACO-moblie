import { View } from 'react-native';

import Skeleton from '~/components/nativewindui/Skeleton';

export const CarCardSkeleton = () => {
  return (
    <View className=" rounded-lg bg-white p-4 shadow-sm dark:bg-slate-300">
      <View className="flex-row">
        <Skeleton width={80} height={80} className="mr-4 rounded-lg" />
        <View className="flex-1">
          <Skeleton width={128} height={24} />
          <Skeleton width={192} height={16} className="mt-2" />
          <View className="mt-2 flex-row items-center">
            <Skeleton width={16} height={16} borderRadius={8} />
            <Skeleton width={128} height={16} className="ml-1" />
          </View>
          <View className="mt-1 flex-row items-center">
            <Skeleton width={16} height={16} borderRadius={8} />
            <Skeleton width={96} height={16} className="ml-1" />
          </View>
          <View className="mt-1 flex-row items-center">
            <Skeleton width={16} height={16} borderRadius={8} />
            <Skeleton width={80} height={16} className="ml-1" />
          </View>
        </View>
      </View>
    </View>
  );
};
