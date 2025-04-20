import { MaterialIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import React from 'react';
import { View, Text } from 'react-native';

interface ResolutionCardProps {
  resolvedAt: Date;
  resolutionComments: string | null;
  resolvedById: string | null;
}

const ResolutionCard: React.FC<ResolutionCardProps> = ({
  resolvedAt,
  resolutionComments,
  resolvedById,
}) => {
  return (
    <View className="mx-4 mb-6 mt-4 rounded-lg bg-white shadow-sm">
      <View className="p-4">
        <View className="mb-3 flex-row items-center">
          <MaterialIcons name="check-circle" size={20} color="#10b981" />
          <Text className="ml-2 text-lg font-bold text-gray-800">Giải quyết</Text>
        </View>

        <View className="mb-2">
          <Text className="mb-1 text-xs text-gray-500">Ngày giải quyết</Text>
          <Text className="text-gray-800">
            {format(new Date(resolvedAt), 'MMM dd, yyyy - HH:mm')}
          </Text>
        </View>

        {resolvedById && (
          <View className="mb-2">
            <Text className="mb-1 text-xs text-gray-500">Người giải quyết</Text>
            <Text className="text-gray-800">ID: {resolvedById}</Text>
          </View>
        )}

        {resolutionComments && (
          <View>
            <Text className="mb-1 text-xs text-gray-500">Nhận xét</Text>
            <Text className="text-gray-700">{resolutionComments}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ResolutionCard;
