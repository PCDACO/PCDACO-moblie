import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { FunctionComponent } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

import { BookingCard } from '../cards/booking-card';

import { BookResponseList } from '~/constants/models/book.model';
import { COLORS } from '~/theme/colors';

interface BookSectionProps {
  recentBookings?: BookResponseList[];
}

const BookSection: FunctionComponent<BookSectionProps> = ({ recentBookings }) => {
  return (
    <View className="">
      <View className="flex-row items-center justify-between">
        <Text className="text-lg font-bold text-gray-900 dark:text-gray-100">
          Đơn đặt xe gần đây
        </Text>
        <TouchableOpacity
          onPress={() => router.push('/bookings' as any)}
          className="flex-row items-center">
          <Text className="mr-1 text-sm text-gray-500 dark:text-gray-400">Xem tất cả</Text>
          <Ionicons name="chevron-forward" size={16} color={COLORS.gray} />
        </TouchableOpacity>
      </View>
      {recentBookings!.length > 0 ? (
        recentBookings!.map((booking) => <BookingCard key={booking.id} booking={booking} />)
      ) : (
        <View className="items-center justify-center rounded-lg bg-white p-8 dark:bg-slate-300">
          <Ionicons name="calendar-outline" size={32} color={COLORS.gray} />
          <Text className="mt-2 text-center text-gray-500 dark:text-gray-400">
            Chưa có đơn đặt xe nào
          </Text>
        </View>
      )}
    </View>
  );
};

export default BookSection;
