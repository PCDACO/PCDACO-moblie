import { debounce } from 'lodash';
import React, { memo, useCallback, useRef, useState } from 'react';
// import { ControllerRenderProps } from 'react-hook-form';
import { Dimensions, Text, View, Platform } from 'react-native';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';

// import { CarPayload } from '~/constants/models/car';
import { useModelQuery } from '~/hooks/models/use-model';
import { useCarStore } from '~/stores/use-generic';

interface IModelCarPickerProps {
  // field: ControllerRenderProps<CarPayload, 'modelId'>;
  field: any;
}

export const ModelCarPicker: React.FC<IModelCarPickerProps> = memo(({ field }) => {
  const { setData, data: cartData } = useCarStore();

  // const [selectedItem, setSelectedItem] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');
  const dropdownController = useRef<any>(null);
  const searchRef = useRef<any>(null);

  // ✅ Gọi API với react-query
  const { modelListQuery } = useModelQuery({
    params: {
      index: 1,
      size: 10,
      keyword,
    },
  });

  // ✅ Lưu dữ liệu vào store
  const handleSelectedItem = useCallback((item: string) => {
    setData({ ...cartData, modelId: item });
  }, []);

  const { data, isLoading } = modelListQuery;

  // ✅ Xử lý debounce để giảm số lần gọi API
  const handleSearch = useCallback(
    debounce((q: string) => {
      if (q.length < 1) return;
      setKeyword(q);
    }, 500),
    []
  );

  const onClearPress = useCallback(() => {
    setKeyword('');
  }, []);

  return (
    <View className="relative" style={[Platform.select({ ios: { zIndex: 1 } })]}>
      <AutocompleteDropdown
        {...field}
        initialValue={field.value}
        ref={searchRef}
        controller={(controller) => {
          dropdownController.current = controller;
        }}
        direction={Platform.select({ ios: 'down' })}
        dataSet={
          data?.value.items?.map((item) => ({
            id: item.id,
            title: item.name,
          })) || []
        }
        onChangeText={handleSearch}
        onSelectItem={(item) => {
          item && handleSelectedItem(item.id);
          field.onChange(item?.id);
        }}
        debounce={600}
        suggestionsListMaxHeight={Dimensions.get('window').height * 0.4}
        onClear={onClearPress}
        loading={isLoading}
        useFilter={false} // set false để tránh render lại 2 lần
        textInputProps={{
          placeholder: 'Chọn mẫu xe',
          autoCorrect: false,
          autoCapitalize: 'none',
          style: {
            borderRadius: 25,
            backgroundColor: '#ffffff',
            color: '#000',
            paddingLeft: 18,
            borderColor: '#f0f0f0',
          },
        }}
        rightButtonsContainerStyle={{
          right: 8,
          height: 30,
          alignSelf: 'center',
        }}
        inputContainerStyle={{
          backgroundColor: '#ffffff',
          borderRadius: 12,
        }}
        suggestionsListContainerStyle={{
          backgroundColor: '#ffffff',
        }}
        containerStyle={{ flexGrow: 1, flexShrink: 1 }}
        renderItem={(item) => <Text style={{ color: '#000', padding: 15 }}>{item.title}</Text>}
        inputHeight={50}
        closeOnBlur={false}
      />
    </View>
  );
});
