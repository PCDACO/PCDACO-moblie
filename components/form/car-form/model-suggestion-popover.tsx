import React from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';

import { Loading } from '@/components/loading';

interface ModelSuggestionPopoverProps {
  suggestions: {
    id: string;
    name: string;
  }[];
  onSelect: (model: { id: string; name: string }) => void;
  visible: boolean;
  isLoading: boolean;
}

export const ModelSuggestionPopover = ({
  suggestions,
  onSelect,
  visible,
  isLoading,
}: ModelSuggestionPopoverProps) => {
  if (!visible) return null;

  return (
    <View
      className="absolute left-0 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg"
      style={{ top: '100%', zIndex: 10 }}>
      {isLoading ? (
        <View className="h-20 items-center justify-center">
          <Loading />
        </View>
      ) : (
        <FlatList
          data={suggestions}
          scrollEnabled={false}
          keyboardShouldPersistTaps="handled"
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable className="border-b border-gray-200" onPress={() => onSelect(item)}>
              <View className="px-4 py-2">
                <Text>{item.name}</Text>
              </View>
            </Pressable>
          )}
        />
      )}
    </View>
  );
};
