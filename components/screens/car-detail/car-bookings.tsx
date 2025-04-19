import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { FunctionComponent } from 'react';
import { FlatList, View } from 'react-native';

import Description from '../car-editor/description';

import { Avatar, AvatarFallback, AvatarImage } from '~/components/nativewindui/Avatar';
import { Text } from '~/components/nativewindui/Text';
import CardBasic from '~/components/plugins/card-basic';
import { Bookings } from '~/constants/models/car.model';
import { DateFormat, formatDateToString } from '~/lib/format';
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
                <Text>{item.driverName}</Text>
                <View className="flex-row items-center gap-2">
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
              </View>
            </CardBasic>
          );
        }}
      />
    </View>
  );
};

export default CarBookings;
