import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import { Edit } from '~/lib/icons/icon';

const BaseInfoUser = () => {
  return (
    <View className="items-start rounded-xl bg-white p-4 shadow-md">
      {/* Thông tin người dùng */}
      <View className="mb-4 flex-row items-center">
        <Image
          source={{ uri: 'https://via.placeholder.com/80' }}
          className="mr-3 size-20 rounded-full"
        />
        <View>
          <Text className="text-2xl font-bold text-black">Trần Hoàng Trung Anh</Text>
          <Text className="mt-1 text-sm text-gray-500">Chủ sở hữu xe</Text>
          <Text className="mt-1 text-sm italic text-gray-500">
            "Chọn xe chuẩn, hành trình trọn vẹn"
          </Text>
        </View>
      </View>

      {/* Nút chỉnh sửa */}
      <TouchableOpacity className="w-full flex-row items-center justify-center rounded-lg bg-primary px-4 py-3 ">
        <Edit color="white" size={20} />
        <Text className="ml-2 text-base text-white">Chỉnh sửa thông tin cá nhân</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BaseInfoUser;
