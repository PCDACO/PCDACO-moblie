import { View } from 'react-native';

import Skeleton from '~/components/nativewindui/Skeleton';

export const ReportCardSkeleton = () => {
  return (
    <View className=" rounded-lg bg-white p-4 shadow-sm dark:bg-slate-300">
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Skeleton width={128} height={24} />
          <Skeleton width={192} height={16} className="mt-2" />
        </View>
        <Skeleton width={80} height={24} />
      </View>
      <Skeleton width="100%" height={16} className="mt-2" />
      <Skeleton width="75%" height={16} className="mt-2" />
      <View className="mt-2 flex-row items-center">
        <Skeleton width={16} height={16} borderRadius={8} />
        <Skeleton width={96} height={16} className="ml-1" />
      </View>
    </View>
  );
};
