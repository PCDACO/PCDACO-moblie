import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { FunctionComponent } from 'react';
import { View, Pressable } from 'react-native';

interface CarHeaderProps {
  onEdit?: () => void;
}
const CarHeader: FunctionComponent<CarHeaderProps> = ({ onEdit }) => {
  return (
    <View className="absolute left-0 right-0 top-0 z-10 flex h-16 flex-row items-center justify-between p-4 dark:bg-black/0 ">
      <Pressable
        onPress={() => router.push('/(main)/cars')}
        className="size-10 items-center justify-center rounded-full bg-black/20 dark:bg-white/20">
        <Feather name="arrow-left" size={20} color="white" />
      </Pressable>
      <Pressable
        className="size-10 items-center justify-center rounded-full bg-black/20 dark:bg-white/20"
        onPress={onEdit}>
        <Feather name="more-vertical" size={20} color="white" />
      </Pressable>
    </View>
  );
};

export default CarHeader;
