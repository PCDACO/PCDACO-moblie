// import { useLocalSearchParams } from 'expo-router';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { KeyboardAvoidingView, ScrollView, Text, View } from 'react-native';

import CharacteristicDetail from '~/components/car-detail/characteristic-detail';
import ContentDetail from '~/components/car-detail/content-detail';
import HeaderDetail from '~/components/car-detail/header-detail';
import RelatedDocument from '~/components/car-detail/related-document';
import SwiperImage from '~/components/swiper-image';
import Title from '~/components/typography/title';
import { Button } from '~/components/ui/button';

const CarDetailScreen = () => {
  const { id, name } = useLocalSearchParams();
  const router = useRouter();

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView>
        <View className="flex-1 bg-muted ">
          <SwiperImage />
          <View className="gap-2 ">
            <HeaderDetail
              name="Car Name"
              price={1000000}
              location="Sedan 2025s"
              city="Thành phố Hồ Chí Minh"
            />
            <CharacteristicDetail />

            <ContentDetail />
          </View>
        </View>
        <View className="p-4 ">
          <Title title="Giấy tờ liên quan" />
        </View>
        <RelatedDocument />
        <View className="h-20 bg-gray-50" />
      </ScrollView>
      <View className="flex-row gap-8 p-4 ">
        <Button variant="secondary" className="w-full flex-1">
          <Text className="text-lg font-semibold">Chỉnh sửa</Text>
        </Button>
        <Button
          className="w-full flex-1"
          onPress={() => {
            router.navigate(`/(cars)/request/${id}`);
            router.setParams({ id, name });
          }}>
          <Text className="text-lg font-semibold text-background">Xem các yêu cầu</Text>
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CarDetailScreen;
