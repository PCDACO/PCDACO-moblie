import React from 'react';
import { Image, Text, View } from 'react-native';

import Title from '../typography/title';

interface VehicleInfoProps {
  licenseFront: string;
  licenseBack: string;
}

const VehicleInfo: React.FC<VehicleInfoProps> = ({ licenseFront, licenseBack }) => {
  return (
    <View>
      <Title title="Giấy phép lái xe" />
      <View className="flex-row gap-2">
        <View className="flex-1">
          <Text className="text-xl text-muted-foreground">Mặt trước</Text>
          <Image
            source={require('~/assets/placeholder.png')}
            className="h-36 w-full rounded-xl object-cover"
          />
        </View>
        <View className="flex-1">
          <Text className="text-xl text-muted-foreground">Mặt sau</Text>
          <Image
            source={require('~/assets/placeholder.png')}
            className="h-36 w-full rounded-xl object-cover"
          />
        </View>
      </View>
    </View>
  );
};

export default VehicleInfo;
