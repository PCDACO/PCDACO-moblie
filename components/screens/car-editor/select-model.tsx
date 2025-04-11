import { Feather } from '@expo/vector-icons';
import React, { FunctionComponent } from 'react';
import { FlatList, Pressable, Text, TouchableOpacity, View } from 'react-native';

import { Input } from '~/components/layouts/input-with-icon';
import Loading from '~/components/plugins/loading';
import { useCarForm } from '~/hooks/car/use-car-form';
import { useModelQuery } from '~/hooks/models/use-model';
import useDebounce from '~/hooks/plugins/use-debounce';
import { cn } from '~/lib/cn';

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
    <View className="relative flex-1 gap-2 p-4">
      <Input
        placeholder="Tìm kiếm mẫu xe"
        value={searchModel}
        onChangeText={setSearchModel}
        leftIcon={<Feather name="search" size={20} color="gray" />}
      />

      {isLoadingModel ? (
        <Loading />
      ) : (
        <View className="rounded-lg border border-gray-300 ">
          <FlatList
            data={modelData?.value.items}
            renderItem={({ item }) => (
              <Pressable
                className={cn(
                  'flex-row items-center gap-2 p-2',
                  selectedModel === item.id && 'bg-primary'
                )}
                onPress={() => {
                  setSelectedModel(item.id);
                  setSearchModel(item.name);
                }}>
                <Text
                  className={cn(selectedModel === item.id ? 'text-background' : 'text-foreground')}>
                  {item.name}
                </Text>
                <Text
                  className={cn(selectedModel === item.id ? 'text-background' : 'text-gray-500')}>
                  -
                </Text>
                <Text
                  className={cn(selectedModel === item.id ? 'text-background' : 'text-gray-500')}>
                  {item.manufacturer.name}
                </Text>
              </Pressable>
            )}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View className="h-0.5 bg-gray-300" />}
          />
        </View>
      )}

      <View className="absolute bottom-2 left-0 right-0 z-10 p-4 dark:bg-slate-900">
        <TouchableOpacity
          className="flex-row items-center justify-center gap-2 rounded-lg bg-primary p-2"
          onPress={() => {
            form.setValue('modelId', selectedModel);
            onClose();
          }}>
          <Feather name="check" size={20} color="white" />
          <Text className="text-background">Chọn mẫu xe</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SelectModel;
