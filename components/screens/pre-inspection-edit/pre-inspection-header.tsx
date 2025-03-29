import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FunctionComponent } from 'react';
import { Pressable, View } from 'react-native';

import Description from '../car-editor/description';
import HeaderTitle from '../car-editor/header-title';

import { COLORS } from '~/theme/colors';

const PreInspectionHeader: FunctionComponent = () => {
  const router = useRouter();
  return (
    <View className="relative h-20 items-center justify-center">
      <HeaderTitle title="Kiểm tra trước khi giao xe" />
      <Description title="Vui lòng chụp ảnh xe trước khi giao" className="text-center" />

      <View className="absolute left-4 top-3 rounded-full bg-black/20 p-1 dark:bg-white/20">
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.black} />
        </Pressable>
      </View>
    </View>
  );
};

export default PreInspectionHeader;
