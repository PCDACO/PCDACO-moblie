import React from 'react';
import { View } from 'react-native';

import CardBasic from '~/components/plugins/card-basic';
import Skeleton from '~/components/nativewindui/Skeleton';

const ScheduleCarInfoSkeleton = () => {
  return (
    <CardBasic className="gap-4">
      <View className="gap-2">
        <Skeleton width="70%" height={24} />
        <Skeleton width="50%" height={20} />
      </View>
      <View className="flex-row gap-4">
        <View className="flex-1 gap-2">
          <Skeleton width="100%" height={20} />
          <Skeleton width="80%" height={20} />
        </View>
        <View className="flex-1 gap-2">
          <Skeleton width="100%" height={20} />
          <Skeleton width="80%" height={20} />
        </View>
      </View>
      <View className="gap-2">
        <Skeleton width="100%" height={100} />
      </View>
    </CardBasic>
  );
};

export default ScheduleCarInfoSkeleton;
