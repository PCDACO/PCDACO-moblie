import { FunctionComponent } from 'react';
import { Pressable, Text, View } from 'react-native';

import Subtitle from '../car-editor/subtitle';

interface BookCategoryProps {
  title: string;
  onPress?: () => void;
  children?: React.ReactNode;
}

const BookCategory: FunctionComponent<BookCategoryProps> = ({ title, onPress, children }) => {
  return (
    <View className="gap-4">
      <View className="flex-row items-center justify-between ">
        <Subtitle title={title} />
        <Pressable onPress={onPress}>
          <Text className="text-base text-primary underline">Xem thêm</Text>
        </Pressable>
      </View>
      <View>{children}</View>
    </View>
  );
};

export default BookCategory;
