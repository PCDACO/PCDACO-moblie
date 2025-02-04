import React from 'react';
import { Text, View } from 'react-native';

import { formatPriceToVND } from '~/lib/format';
import { CarFront, MapPin } from '~/lib/icons/icon';

interface HeaderDetailProps {
  name: string;
  price: number;
  location: string;
  city: string;
}

const HeaderDetail: React.FC<HeaderDetailProps> = ({ name, price, location, city }) => {
  return (
    <View className=" gap-8 bg-background p-4">
      <View>
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-semibold">{name}</Text>

          <View className="flex-row items-center gap-2">
            <CarFront className="text-foreground" size={20} />
            <Text className="text-muted-foreground">{location}</Text>
          </View>
        </View>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <MapPin className="text-foreground" size={20} />
            <Text className="text-muted-foreground">{city}</Text>
          </View>
          <Text className="text-2xl font-semibold text-primary">
            {formatPriceToVND(price)}/ngày
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HeaderDetail;
