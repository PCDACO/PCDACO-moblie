import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

const OptionStatus = () => {
  const [chooseOption, setChooseOption] = useState<string>('Tất cả');

  const options = ['Tất cả', 'Đang chờ', 'Đã xác nhận', 'Đã hủy', 'Đã hoàn thành'];

  return (
    <View className="py-4">
      <FlatList
        data={options}
        horizontal
        keyExtractor={(_, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            className={`rounded-full px-4 py-2 ${item.includes(chooseOption) ? 'bg-primary' : 'bg-transparent'} ml-3 border border-border`}
            onPress={() => setChooseOption(item)}>
            <Text
              className={`text-sm font-semibold ${item.includes(chooseOption) ? 'text-background' : 'text-muted-foreground'}`}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default OptionStatus;
