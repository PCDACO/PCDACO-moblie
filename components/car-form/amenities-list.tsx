import React, { FunctionComponent } from 'react';
import { Text, View } from 'react-native';

import ModelPicker from '../modal-picker';

import { useAmenities } from '~/hooks/amenity/use-amenity';

const AmenitiesList: FunctionComponent = () => {
  const { listAmenitiesQuery } = useAmenities({ params: { index: 1, size: 10 } });
  //   console.log('listAmenitiesQuery', listAmenitiesQuery.data);

  return (
    <View>
      <ModelPicker label="Tên xe 2" title="Đặc điểm xe" submitText="Áp dụng">
        <View>
          <Text> Amenities</Text>
        </View>
      </ModelPicker>
    </View>
  );
};

export default AmenitiesList;
