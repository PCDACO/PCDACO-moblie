import React from 'react';
import { Pressable, Text, View } from 'react-native';

import Box from '../box';

import FilePDF from '~/lib/icons/FilePDF';

const RelatedDocument = () => {
  return (
    <View>
      <Box className="flex-row items-center justify-between ">
        <View className="flex-row items-center gap-4">
          <FilePDF width={25} height={25} fill="#FF0000" />
          <Text>Đăng ký xe.pdf</Text>
        </View>
        <Pressable className="pr-10">
          <Text className="text-lg text-primary">View</Text>
        </Pressable>
      </Box>
      <Box className="flex-row items-center justify-between ">
        <View className="flex-row items-center gap-4">
          <FilePDF width={25} height={25} fill="#FF0000" />
          <Text>Đăng ký xe.pdf</Text>
        </View>
        <Pressable className="pr-10">
          <Text className="text-lg text-primary">View</Text>
        </Pressable>
      </Box>
      <Box className="flex-row items-center justify-between ">
        <View className="flex-row items-center gap-4">
          <FilePDF width={25} height={25} fill="#FF0000" />
          <Text>Đăng ký xe.pdf</Text>
        </View>
        <Pressable className="pr-10">
          <Text className="text-lg text-primary">View</Text>
        </Pressable>
      </Box>
    </View>
  );
};

export default RelatedDocument;
