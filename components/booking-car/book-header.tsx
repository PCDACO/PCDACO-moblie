import React from 'react';
import { View, Text, Image } from 'react-native';

interface BookHeaderProps {
  userName: string;
  location: string;
  time: string;
  status: boolean;
}

const BookHeader: React.FC<BookHeaderProps> = ({ userName, location, time, status }) => {
  return (
    <View className="flex-row items-center ">
      <Image
        source={{ uri: 'https://via.placeholder.com/50' }}
        className="mr-3 h-12 w-12 rounded-full"
      />
      <View className="flex-1">
        <Text className="text-base font-semibold">{userName}</Text>
        <Text className="text-xs text-muted-foreground">
          {location} - {time} giờ trước
        </Text>
      </View>
      <View
        className={`flex-row items-center ${status ? 'bg-green-200 ' : 'bg-yellow-200'} rounded-full px-4 py-2`}>
        <Text className={`text-xs font-semibold ${status ? 'text-green-500 ' : 'text-yellow-500'}`}>
          {status ? 'Đã xác nhận' : 'Chờ xác nhận'}
        </Text>
      </View>
    </View>
  );
};

export default BookHeader;
