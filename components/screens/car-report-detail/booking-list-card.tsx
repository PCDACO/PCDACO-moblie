import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import React from 'react';
import { View, Text, Image } from 'react-native';

import { Booking } from '~/constants/models/car-report.model';

interface BookingsListCardProps {
  bookings: Booking[];
}

const BookingsListCard: React.FC<BookingsListCardProps> = ({ bookings }) => {
  return (
    <View className="mx-4 mb-6 mt-4 rounded-lg bg-white shadow-sm">
      <View className="p-4">
        <View className="mb-3 flex-row items-center">
          <Feather name="calendar" size={20} color="#4b5563" />
          <Text className="ml-2 text-lg font-bold text-gray-800">Đơn hàng ({bookings.length})</Text>
        </View>

        {bookings.map((booking, index) => (
          <View
            key={booking.bookingId}
            className={`rounded-lg p-3 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} mb-2`}>
            <View className="flex-row items-center">
              <View className="mr-3 h-8 w-8 overflow-hidden rounded-full">
                <Image
                  source={{ uri: booking.avatarUrl || 'https://via.placeholder.com/32' }}
                  style={{ width: 32, height: 32 }}
                />
              </View>
              <View>
                <Text className="font-medium text-gray-800">{booking.driverName}</Text>
                <Text className="text-xs text-gray-500">Tài xế</Text>
              </View>
            </View>

            <View className="mt-2 flex-row justify-between">
              <View className="flex-row items-center">
                <MaterialCommunityIcons name="clock-start" size={16} color="#6b7280" />
                <Text className="ml-1 text-xs text-gray-700">
                  {booking.startTime ? format(new Date(booking.startTime), 'MMM dd, HH:mm') : 'N/A'}
                </Text>
              </View>
              <View className="flex-row items-center">
                <MaterialCommunityIcons name="clock-end" size={16} color="#6b7280" />
                <Text className="ml-1 text-xs text-gray-700">
                  {booking.endTime ? format(new Date(booking.endTime), 'MMM dd, HH:mm') : 'N/A'}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default BookingsListCard;
