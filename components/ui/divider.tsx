import React from 'react';
import { View } from 'react-native';

const Divider = ({ orientation = 'horizontal' }: { orientation?: 'horizontal' | 'vertical' }) => {
  return orientation === 'horizontal' ? (
    <View className="my-2 border-t border-gray-300" />
  ) : (
    <View className="mx-2 h-full border-l border-gray-300" />
  );
};

export default Divider;
