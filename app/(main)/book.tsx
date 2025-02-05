import React, { useState } from 'react';
import { FlatList, View } from 'react-native';

import BookingItem from '~/components/booking-car/booking-item';
import OptionStatus from '~/components/booking-car/option-status';
import ButtonIcon from '~/components/icon-button/icon-button';
import { Columns3, LayoutList } from '~/lib/icons/icon';

const BookScreen = () => {
  const [activeLayout, setActiveLayout] = useState<'row' | 'column'>('column');
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
        <View className="w-96 flex-row items-center justify-end gap-2">
          <ButtonIcon variant="outline" icon={Columns3} iconColor="black" iconSize={16} />
          <ButtonIcon icon={LayoutList} iconColor="white" />
        </View>
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
