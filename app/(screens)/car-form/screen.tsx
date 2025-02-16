import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { FunctionComponent, useEffect } from 'react';
import { View } from 'react-native';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';

import CustomImagePicker from '~/components/image-picker';
import FieldLayout from '~/components/layout/field-layout';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { useModelQuery } from '~/hooks/models/use-model';

const CarFormScreen: FunctionComponent = () => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const [value, setValue] = React.useState<string>('');
  const { modelListQuery } = useModelQuery({
    params: {
      index: 1,
      size: 100,
    },
  });
  // const { listAmenitiesQuery } = useAmenities({
  //   params: {
  //     index: 1,
  //     size: 100,
  //   },
  // });

  const data = React.useMemo(() => {
    return modelListQuery.data.value.items.map((item) => ({
      id: item.id,
      title: item.name,
    }));
  }, [modelListQuery.data.value.items]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: id ? 'Chỉnh sửa thông tin xe' : 'Tạo mới xe',
      headerTitleAlign: 'center',
      headerTitleStyle: { fontWeight: 'bold' },
      contentStyle: { backgroundColor: '#F0F0F0' },
    });
  }, [id, navigation]);

  return (
    <View className="px-4 py-8">
      <FieldLayout label="Hình ảnh">
        <CustomImagePicker />
      </FieldLayout>
      <FieldLayout label="Tên xe">
        <AutocompleteDropdown
          containerStyle={{ width: '100%' }}
          clearOnFocus={false}
          closeOnBlur
          closeOnSubmit={false}
          initialValue={{ id: '2' }}
          onChangeText={(text) => {
            setValue(text);
          }}
          // onSelectItem={(select) => {
          //   setValue(select?.id || null);
          // }}a
          dataSet={data}
        />
      </FieldLayout>

      <FieldLayout label="Biển số xe">
        <Input placeholder="Nhập biển số xe" />
      </FieldLayout>
      <FieldLayout label="Màu sắc">
        <Input placeholder="Chi tiết màu sắc" />
      </FieldLayout>
      <FieldLayout label="Mô tả">
        <Textarea placeholder="Nhập mô tả" numberOfLines={6} />
      </FieldLayout>
    </View>
  );
};

export default CarFormScreen;
