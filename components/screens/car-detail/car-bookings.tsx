import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { FunctionComponent } from 'react';
import { FlatList, View } from 'react-native';

import BookBadgeStatus from '../book-list/book-badge-status';
import Description from '../car-editor/description';

import { Avatar, AvatarFallback, AvatarImage } from '~/components/nativewindui/Avatar';
import { Text } from '~/components/nativewindui/Text';
import CardBasic from '~/components/plugins/card-basic';
import { Bookings } from '~/constants/models/car.model';
import { DateFormat, formatDateToString, formatPhoneNumber } from '~/lib/format';
import { COLORS } from '~/theme/colors';

interface CarBookingsProps {
  bookings: Bookings[];
}

const CarBookings: FunctionComponent<CarBookingsProps> = ({ bookings }) => {
  return (
    <View>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.bookingId}
        ItemSeparatorComponent={() => <View className="h-2" />}
        ListEmptyComponent={() => (
          <View className="h-40 flex-1 items-center justify-center gap-2">
            <Feather name="calendar" size={40} color={COLORS.light.grey5} />
            <Text className="text-sm text-gray-500">Không có đơn đặt xe</Text>
          </View>
        )}
        renderItem={({ item }) => {
          return (
            <CardBasic
              className="flex-row items-start gap-2"
              onPress={() => {
                router.push({
                  pathname: '/(screen)/booking/page',
                  params: { id: item.bookingId },
                });
              }}>
              <Avatar alt={item.driverName}>
                <AvatarFallback>
                  <Text>{item.driverName.charAt(0)}</Text>
                </AvatarFallback>
                <AvatarImage source={{ uri: item.avatarUrl }} />
              </Avatar>
              <View>
                <View className="flex-row items-center justify-between gap-2">
                  <Text>{item.driverName}</Text>
                  <BookBadgeStatus status={item.status} />
                </View>
                <View className="mt-1 flex-row items-center gap-2">
                  <Feather name="calendar" size={16} color={COLORS.light.grey5} />
                  <Description
                    className="text-sm"
                    title={formatDateToString(new Date(item.startTime), DateFormat.DayTime)}
                  />
                  <Text className="text-sm"> - </Text>
                  <Description
                    className="text-sm"
                    title={formatDateToString(new Date(item.endTime), DateFormat.DayTime)}
                  />
                </View>
                <View className="mt-0.5 flex-row items-center gap-2">
                  <Feather name="phone" size={16} color={COLORS.light.grey5} />
                  <Description
                    className="text-sm"
                    title={formatPhoneNumber(item.driverPhone || '') || 'xxxx.xxx.123'}
                  />
                </View>
              </View>
            </CardBasic>
          );
        }}
      />
    </View>
  );
};

export default CarBookings;
