import { FunctionComponent } from 'react';
import { Text, View } from 'react-native';

interface HeaderTitleProps {
  title: string;
}

const HeaderTitle: FunctionComponent<HeaderTitleProps> = ({ title }) => {
  return (
    <View className="px-4 py-2">
      <Text className="text-center text-2xl font-bold">{title}</Text>
    </View>
  );
};

export default HeaderTitle;
