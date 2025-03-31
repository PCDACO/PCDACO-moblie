import { FunctionComponent } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Pressable,
} from 'react-native';

interface AddressSuggestionsProps {
  suggestions: {
    address: string;
    latitude: number;
    longitude: number;
  }[];
  onSelect: (location: { latitude: number; longitude: number; address: string }) => void;
  visible: boolean;
  isLoading?: boolean;
}

export const AddressSuggestions: FunctionComponent<AddressSuggestionsProps> = ({
  suggestions,
  onSelect,
  visible,
  isLoading,
}) => {
  if (!visible) return null;

  return (
    <Pressable
      className="absolute left-0 right-0 top-[60px] z-[100] rounded-lg bg-white shadow-lg"
      onPress={() => {}} // Prevent touch events from reaching the map
    >
      <ScrollView
        className="max-h-[200px]"
        nestedScrollEnabled
        scrollEventThrottle={16}
        pointerEvents="box-none">
        {isLoading ? (
          <View className="p-4">
            <ActivityIndicator size="small" color="#0000ff" />
          </View>
        ) : suggestions.length > 0 ? (
          suggestions.map((suggestion, index) => (
            <TouchableOpacity
              key={index}
              className="border-b border-gray-200 p-4 active:bg-gray-100"
              onPress={() => onSelect(suggestion)}
              activeOpacity={0.7}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Text className="text-base">{suggestion.address}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <View className="p-4">
            <Text className="text-gray-500">Không tìm thấy địa chỉ</Text>
          </View>
        )}
      </ScrollView>
    </Pressable>
  );
};
