import { useRouter } from 'expo-router';
import React, { FunctionComponent } from 'react';
import { View } from 'react-native';

import Title from '../typography/title';
import UserCard from '../user-card';
import VehicleInfo from './vehicle-info';
import { Textarea } from '../ui/textarea';
import ContentInfoUser from '../user-card/content-info-user';

const CommunitationUserBook: FunctionComponent = () => {
  const router = useRouter();
  return (
    <View className="gap-4 bg-background p-4">
      <Title title="Liên hệ người đặt" />
      <View>
        <UserCard
          name="Trần Hoàng Trung Anh"
          title="Đã thuê 25 lần"
          avatar={require('~/assets/placeholder.png')}
          subtitle="Chọn xe chuẩn, hành trình trọn vẹn"
          onPress={() => router.navigate('/(user)/user-info')}
        />
      </View>
      <ContentInfoUser phone="0123456789" email="chaunhattruong4747@gmail.com" />
      <VehicleInfo
        licenseBack={require('~/assets/placeholder.png')}
        licenseFront={require('~/assets/placeholder.png')}
      />

      <Title title="Ghi chú" className="text-sm text-muted-foreground" />
      <Textarea placeholder="Nhập tin nhắn" className="bg-muted" />
    </View>
  );
};

export default CommunitationUserBook;
