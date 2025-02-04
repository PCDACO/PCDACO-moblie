import React from 'react';
import { FlatList, View } from 'react-native';

import BookingItem from '~/components/booking-car/booking-item';
import OptionStatus from '~/components/booking-car/option-status';

const BookScreen = () => {
  const bookingList = [
    {
      userName: 'Nguyễn Văn A',
      location: 'Hà Nội',
      time: '1',
      carBrand: 'Honda Civic 2024',
      startDate: new Date(),
      endDate: new Date(),
      status: false,
    },

    {
      userName: 'Nguyễn Văn B',
      location: 'Hà Nội',
      time: '1',

      carBrand: 'Honda Civic 2024',
      startDate: new Date(),
      endDate: new Date(),
      status: true,
    },
  ];

  return (
    <View className="gap-3 ">
      <OptionStatus />
      <View className="gap-2 p-4">
        <FlatList
          data={bookingList}
          renderItem={({ item }) => <BookingItem booking={item} />}
          keyExtractor={(item) => item.userName}
          ItemSeparatorComponent={() => <View className="h-2" />}
        />
      </View>
    </View>
  );
};

export default BookScreen;
