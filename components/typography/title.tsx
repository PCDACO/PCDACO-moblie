import React from 'react';
import { Text, View } from 'react-native';

interface TitleProps {
  title: string;
}

const Title: React.FC<TitleProps> = ({ title }) => {
  return (
    <View>
      <Text className="text-xl font-semibold">{title}</Text>
    </View>
  );
};

export default Title;
