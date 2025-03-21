import * as React from 'react';
import { View } from 'react-native';

import { MapComponent } from '~/components/plugins/map-view';
import { SearchInput } from '~/components/plugins/search-input';

const HomeScreen = () => {
  return (
    <View className="relative flex-1">
      <View className="absolute left-0 right-0 top-4 z-20 px-4">
        <SearchInput />
      </View>
      <MapComponent />
    </View>
  );
};

export default HomeScreen;
