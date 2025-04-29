import React from 'react';
import { View } from 'react-native';

import CardBasic from '~/components/plugins/card-basic';
import Skeleton from '~/components/nativewindui/Skeleton';

const SchedulePhotoSkeleton = () => {
  return (
    <CardBasic className="gap-4">
      <View className="gap-2">
        <Skeleton width="50%" height={24} />
      </View>
      <View className="flex-row gap-2">
        <Skeleton width="100%" height={200} />
      </View>
      <View className="flex-row gap-2">
        <Skeleton width="100%" height={200} />
      </View>
    </CardBasic>
  );
};

export default SchedulePhotoSkeleton;
