import React, { FunctionComponent } from 'react';
import { View } from 'react-native';

import Title from '../typography/title';
import TitleWithIcon from '../typography/title-with-icon';
import UserCard from '../user-card';
import VehicleInfo from './vehicle-info';
import { Textarea } from '../ui/textarea';

import { Phone, Mail } from '~/lib/icons/icon';

const CommunitationUserBook: FunctionComponent = () => {
  return (
    <View className="gap-4 bg-background p-4">
      <Title title="Liên hệ người đặt" />
      <View>
        <UserCard
          name="Trần Hoàng Trung Anh"
          title="Đã thuê 25 lần"
          avatar={require('~/assets/placeholder.png')}
          subtitle="Chọn xe chuẩn, hành trình trọn vẹn"
        />
      </View>
      <TitleWithIcon title="0998 xxx xxx" icon={Phone} />
      <TitleWithIcon title="chaunhattruong4747@gmail.com" icon={Mail} />
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
