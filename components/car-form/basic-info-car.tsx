import React, { FunctionComponent } from 'react';
import { View } from 'react-native';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';

import CustomImagePicker from '../image-picker';
import FieldLayout from '../layout/field-layout';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

import { useModelQuery } from '~/hooks/models/use-model';

const BasicInfoCar: FunctionComponent = () => {
  const [value, setValue] = React.useState<string>('');
  const { modelListQuery } = useModelQuery({
    params: {
      index: 1,
      size: 100,
    },
  });

  const data = React.useMemo(() => {
    return modelListQuery.data.value.items.map((item) => ({
      id: item.id,
      title: item.name,
    }));
  }, [modelListQuery.data.value.items]);

  return (
    <View className=" gap-4">
      <FieldLayout label="Hình ảnh">
        <CustomImagePicker maxImages={6} />
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

      <View className="flex-row gap-4">
        <FieldLayout label="Biển số xe" className="flex-1">
          <Input placeholder="Nhập biển số xe" />
        </FieldLayout>
        <FieldLayout label="Số lượng ghế" className="flex-1">
          <Input placeholder="Nhập biển số xe" />
        </FieldLayout>
      </View>
      <FieldLayout label="Màu sắc">
        <Input placeholder="Chi tiết màu sắc" />
      </FieldLayout>
      <FieldLayout label="Mô tả">
        <Textarea placeholder="Nhập mô tả" numberOfLines={6} />
      </FieldLayout>
    </View>
  );
};

export default BasicInfoCar;
