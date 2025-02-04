import React, { FunctionComponent } from 'react';
import { FlatList, View } from 'react-native';

import FeatureItem from './features-item';
import Title from '../typography/title';

import { Fuel, Snowflake, Armchair, Wifi, Briefcase, Cog, Shell } from '~/lib/icons/icon';

const CharacteristicDetail: FunctionComponent = () => {
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
    <View className="gap-4 bg-background p-4">
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

export default CharacteristicDetail;
