import React, { FunctionComponent } from 'react';
import { View, FlatList, Text } from 'react-native';

import { DocumentItem } from '~/components/form/car-form/vehicle-registration';
import FieldLayout from '~/components/layouts/field-layout';
import { CarDetailResponse } from '~/constants/models/car.model';

interface CarVehicalRegistrationProps {
  image: CarDetailResponse['images'];
}

const CarVehicalRegistration: FunctionComponent<CarVehicalRegistrationProps> = ({ image }) => {
  const paperImage = image.filter((item) => item.type === 'Paper');

  return (
    <FieldLayout label="Giấy tờ của chiếc xe">
      <View className="gap-2 dark:border-gray-800">
        <FlatList
          data={paperImage}
          renderItem={({ item }) => <DocumentItem nameFile={item.name} paperImages={item.url} />}
          scrollEnabled={false}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View className="h-2" />}
          ListEmptyComponent={() => (
            <View className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
              <Text>Không có giấy tờ</Text>
            </View>
          )}
        />
      </View>
    </FieldLayout>
  );
};

export default CarVehicalRegistration;
