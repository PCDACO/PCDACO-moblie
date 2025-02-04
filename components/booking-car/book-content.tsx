import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { View, Text } from 'react-native';

import { DateFormat, formatDateToString } from '~/lib/format';

interface BookContentProps {
  carName: string;
  startDate: Date;
  endDate: Date;
}

const BookContent: React.FC<BookContentProps> = ({ carName, startDate, endDate }) => {
  return (
    <View className="">
      <View className="mb-2 flex-row items-center">
        <FontAwesome5 name="car" size={16} color="#6b7280" />
        <Text className="ml-2 text-sm text-muted-foreground">{carName}</Text>
      </View>
      <View className="flex-row items-center">
        <FontAwesome5 name="calendar-alt" size={16} color="#6b7280" />
        <Text className="ml-2 text-sm text-muted-foreground">
          Từ {formatDateToString(startDate, DateFormat.DayTime)} - Đến{' '}
          {formatDateToString(endDate, DateFormat.DayTime)}
        </Text>
      </View>
    </View>
  );
};

export default BookContent;
