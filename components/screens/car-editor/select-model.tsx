import { Feather } from '@expo/vector-icons';
import React, { FunctionComponent } from 'react';
import { FlatList, Pressable, Text, TouchableOpacity, View } from 'react-native';

import { Input } from '~/components/layouts/input-with-icon';
import Loading from '~/components/plugins/loading';
import { useCarForm } from '~/hooks/car/use-car-form';
import { useModelQuery } from '~/hooks/models/use-model';
import useDebounce from '~/hooks/plugins/use-debounce';

interface SelectModelProps {
  onClose: () => void;
  form: ReturnType<typeof useCarForm>['form'];
}

const SelectModel: FunctionComponent<SelectModelProps> = ({ onClose, form }) => {
  const [searchModel, setSearchModel] = React.useState<string>('');
  const [selectedModel, setSelectedModel] = React.useState<string>('');
  const searchModelDebounce = useDebounce(searchModel, 500);

  const { data: modelData, isLoading: isLoadingModel } = useModelQuery({
    params: { index: 1, size: 10, keyword: searchModelDebounce },
  });

  return (
    <View className="p-4">
      <Input
        placeholder="Tìm kiếm mẫu xe"
        value={searchModel}
        onChangeText={setSearchModel}
        leftIcon={<Feather name="search" size={20} color="gray" />}
      />

      {isLoadingModel ? (
        <Loading />
      ) : (
        <View className="rounded-lg border border-gray-300">
          <FlatList
            data={modelData?.value.items}
            renderItem={({ item }) => (
              <Pressable
                className={`p-2 ${selectedModel === item.id ? 'bg-primary' : ''}`}
                onPress={() => {
                  setSelectedModel(item.id);
                  setSearchModel(item.name);
                }}>
                <Text className="text-foreground">{item.name}</Text>
              </Pressable>
            )}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View className="h-0.5 bg-gray-300" />}
          />
        </View>
      )}

      <TouchableOpacity
        className="rounded-lg bg-primary p-2"
        onPress={() => {
          form.setValue('modelId', selectedModel);
          onClose();
        }}>
        <Text className="text-background">Chọn mẫu xe</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectModel;
