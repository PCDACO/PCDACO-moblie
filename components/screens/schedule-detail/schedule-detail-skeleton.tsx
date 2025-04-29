import React from 'react';
import { View } from 'react-native';

import Skeleton from '~/components/nativewindui/Skeleton';

const ScheduleDetailSkeleton = () => {
  return (
    <View className="gap-4 px-2 py-4">
      {/* Schedule Info Skeleton */}
      <View className="gap-2">
        <Skeleton width="100%" height={24} />
        <Skeleton width="80%" height={20} />
        <Skeleton width="60%" height={20} />
        <Skeleton width="70%" height={20} />
        <Skeleton width="50%" height={20} />
      </View>

      {/* Car Info Skeleton */}
      <View className="gap-2">
        <Skeleton width="100%" height={24} />
        <Skeleton width="90%" height={20} />
        <Skeleton width="85%" height={20} />
        <Skeleton width="75%" height={20} />
      </View>

      {/* Photos Skeleton */}
      <View className="gap-2">
        <Skeleton width="100%" height={24} />
        <View className="flex-row gap-2">
          <Skeleton width={100} height={100} borderRadius={8} />
          <Skeleton width={100} height={100} borderRadius={8} />
          <Skeleton width={100} height={100} borderRadius={8} />
        </View>
      </View>
    </View>
  );
};

export default ScheduleDetailSkeleton;
