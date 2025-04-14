import { View } from 'react-native';

import Skeleton from '~/components/nativewindui/Skeleton';

const BookingListSkeleton = () => {
  return (
    <View className="space-y-4 px-4">
      {[...Array(5)].map((_, index) => (
        <View
          key={index}
          className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-slate-300">
          <Skeleton className="mb-2 h-4 w-1/2" />
          <Skeleton className="mb-2 h-4 w-full" />
          <Skeleton className="h-4 w-1/3" />
        </View>
      ))}
    </View>
  );
};

export default BookingListSkeleton;
