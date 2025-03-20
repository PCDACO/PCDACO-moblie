import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

import Loading from '~/components/plugins/loading';
import { ModelsResponse } from '~/constants/models/model.model';

interface ModelSuggestionPopoverProps {
  isLoading: boolean;
  suggestions: ModelsResponse[];
  onSelect: (model: ModelsResponse) => void;
  visible: boolean;
}

const ModelSuggestionPopover: React.FC<ModelSuggestionPopoverProps> = ({
  isLoading,
  suggestions,
  onSelect,
  visible,
}) => {
  if (!visible || suggestions.length === 0) return null;

  const renderItem = ({ item }: { item: ModelsResponse }) => (
    <TouchableOpacity
      key={item.id}
      className="border-b border-gray-200 px-4 py-2 dark:border-gray-700"
      onPress={() => onSelect(item)}>
      <Text className="text-sm text-gray-900 dark:text-white">{item.name}</Text>
      <Text className="text-xs text-gray-500 dark:text-gray-400">{item.manufacturer.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="absolute left-0 right-0 top-full z-50 mt-1 max-h-48 rounded-lg bg-white shadow-lg dark:bg-gray-900">
      {isLoading ? (
        <View className="h-20 flex-1 items-center justify-center">
          <Loading />
        </View>
      ) : (
        <FlatList
          data={suggestions}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          className="flex-1"
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default ModelSuggestionPopover;
