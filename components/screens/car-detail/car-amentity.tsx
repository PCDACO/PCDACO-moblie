import React, { FunctionComponent } from 'react';
import { FlatList, View } from 'react-native';

import { AmenityItem } from '~/components/form/car-form/car-preview';
import FieldLayout from '~/components/layouts/field-layout';
import { Amenity } from '~/constants/models/car.model';

interface CarAmentityProps {
  amenity: Amenity[];
}

const CarAmentity: FunctionComponent<CarAmentityProps> = ({ amenity }) => {
  return (
    <FieldLayout label="Tiện nghi của chiếc xe" className="bg-white dark:bg-gray-900">
      <FlatList
        data={amenity}
        renderItem={({ item }) => (
          <AmenityItem
            amenity={{
              id: item.id,
              name: item.name,
              description: item.description,
              iconUrl: item.icon,
              createdAt: new Date(),
            }}
          />
        )}
        scrollEnabled={false}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 8 }}
        ItemSeparatorComponent={() => <View className="h-2" />}
      />
    </FieldLayout>
  );
};

export default CarAmentity;
