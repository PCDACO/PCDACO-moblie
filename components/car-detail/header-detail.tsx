import React from 'react';
import { FlatList, Text, View } from 'react-native';

import FeatureItem from './features-item';
import Title from '../typography/title';

import { formatPriceToVND } from '~/lib/format';
import {
  CarFront,
  MapPin,
  Fuel,
  Snowflake,
  Armchair,
  Wifi,
  Briefcase,
  Cog,
  Shell,
} from '~/lib/icons/icon';

interface HeaderDetailProps {
  name: string;
  price: number;
  location: string;
  city: string;
}

const HeaderDetail: React.FC<HeaderDetailProps> = ({ name, price, location, city }) => {
  const features = [
    { icon: Fuel, text: 'Xăng' },
    { icon: Snowflake, text: 'Máy lạnh' },
    { icon: Armchair, text: '5 chỗ ngồi' },
    { icon: Wifi, text: 'Wifi' },
    { icon: Briefcase, text: 'Cốp chứa rộng' },
    { icon: Cog, text: 'Số tự động' },
    { icon: Shell, text: 'Tiêu hao: 8l/100km' },
  ];

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

      <Title title="Đặc điểm" />

      <FlatList
        data={features}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <FeatureItem icon={item.icon} text={item.text} />
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
        ItemSeparatorComponent={() => <View className="h-4" />}
        numColumns={2}
      />
    </View>
  );
};

export default HeaderDetail;
