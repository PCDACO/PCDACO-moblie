import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';

import Skeleton from '~/components/nativewindui/Skeleton';
import { BookingStatusEnum } from '~/constants/enums';
import { BookResponseList } from '~/constants/models/book.model';
import { translate } from '~/lib/translate';
import { COLORS } from '~/theme/colors';

interface BookingCardProps {
  booking: BookResponseList;
}

const BookingCardSkeleton = () => {
  return (
    <View className="rounded-lg bg-white p-4 shadow-sm dark:bg-slate-300">
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Skeleton width={128} height={24} />
          <Skeleton width={192} height={16} className="mt-2" />
        </View>
        <Skeleton width={80} height={24} />
      </View>
      <View className="mt-2 flex-row items-center">
        <Skeleton width={16} height={16} borderRadius={8} />
        <Skeleton width={128} height={16} className="ml-1" />
      </View>
      <View className="mt-2 flex-row items-center">
        <Skeleton width={16} height={16} borderRadius={8} />
        <Skeleton width={96} height={16} className="ml-1" />
      </View>
    </View>
  );
};

export { BookingCardSkeleton };

export const BookingCard = ({ booking }: BookingCardProps) => {
  const router = useRouter();

  if (!booking) {
    return <BookingCardSkeleton />;
  }

  const getStatusColor = (status: BookingStatusEnum) => {
    switch (status) {
      case BookingStatusEnum.Pending:
        return { bg: 'bg-yellow-100', text: 'text-yellow-800' };
      case BookingStatusEnum.Approved:
        return { bg: 'bg-green-100', text: 'text-green-800' };
      case BookingStatusEnum.Rejected:
        return { bg: 'bg-red-100', text: 'text-red-800' };
      case BookingStatusEnum.ReadyForPickup:
        return { bg: 'bg-blue-100', text: 'text-blue-800' };
      case BookingStatusEnum.Ongoing:
        return { bg: 'bg-purple-100', text: 'text-purple-800' };
      case BookingStatusEnum.Completed:
        return { bg: 'bg-green-100', text: 'text-green-800' };
      case BookingStatusEnum.Cancelled:
        return { bg: 'bg-red-100', text: 'text-red-800' };
      case BookingStatusEnum.Expired:
        return { bg: 'bg-gray-100', text: 'text-gray-800' };
      case BookingStatusEnum.Done:
        return { bg: 'bg-blue-100', text: 'text-blue-800' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-800' };
    }
  };

  const statusColors = getStatusColor(booking.status);

  return (
    <TouchableOpacity
      className="mb-4 rounded-lg bg-white p-4 shadow-sm dark:bg-slate-300"
      onPress={() =>
        router.push({
          pathname: '/booking/page',
          params: { id: booking.id },
        })
      }>
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-base font-bold text-gray-900 dark:text-gray-100">
            {booking.carName || 'Chưa có tên xe'}
          </Text>
          <Text className="text-sm text-gray-500 dark:text-gray-400">
            {booking.startTime && booking.endTime
              ? `${new Date(booking.startTime).toLocaleDateString('vi-VN')} - ${new Date(
                  booking.endTime
                ).toLocaleDateString('vi-VN')}`
              : 'Chưa có thời gian'}
          </Text>
        </View>
        <View className={`rounded-full px-3 py-1 ${statusColors.bg}`}>
          <Text className={`text-xs font-medium ${statusColors.text}`}>
            {translate.booking.status[booking.status] || booking.status}
          </Text>
        </View>
      </View>
      <View className="mt-2 flex-row items-center">
        <Ionicons name="person-outline" size={16} color={COLORS.gray} />
        <Text className="ml-1 text-sm text-gray-500 dark:text-gray-400">
          {booking.driverName || 'Chưa có tên tài xế'}
        </Text>
      </View>
      {booking.totalAmount > 0 && (
        <View className="mt-2 flex-row items-center">
          <Ionicons name="cash-outline" size={16} color={COLORS.gray} />
          <Text className="ml-1 text-sm font-medium text-gray-900 dark:text-gray-100">
            {booking.totalAmount.toLocaleString('vi-VN')} VND
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
