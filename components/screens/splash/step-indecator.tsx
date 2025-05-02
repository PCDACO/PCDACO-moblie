import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';

import { Text } from '~/components/nativewindui/Text';
import { cn } from '~/lib/cn';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
  descriptions?: string[];
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
  labels,
  descriptions = [],
}) => {
  return (
    <View className="w-full">
      {/* Step circles with connecting lines */}
      <View className="flex-row items-center justify-between px-4">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <React.Fragment key={index}>
            <View
              className={cn(
                'items-center justify-center rounded-full',
                index + 1 < currentStep
                  ? 'bg-green-100'
                  : index + 1 === currentStep
                    ? 'bg-blue-100'
                    : 'bg-gray-100',
                'h-10 w-10'
              )}>
              {index + 1 < currentStep ? (
                <MaterialCommunityIcons name="check" size={24} color="green" />
              ) : (
                <Text
                  className={cn(
                    'text-center font-medium',
                    index + 1 === currentStep ? 'text-blue-600' : 'text-gray-500'
                  )}>
                  {index + 1}
                </Text>
              )}
            </View>

            {/* Connecting line between circles */}
            {index < totalSteps - 1 && (
              <View
                className={cn(
                  'mx-1 h-1 flex-1',
                  index + 1 < currentStep ? 'bg-green-400' : 'bg-gray-200'
                )}
              />
            )}
          </React.Fragment>
        ))}
      </View>

      {/* Current step label and description */}
      <View className="mt-4 items-center">
        <Text className="text-center text-lg font-medium">{labels[currentStep - 1]}</Text>
        {descriptions[currentStep - 1] && (
          <Text className="mt-1 text-center text-sm text-gray-500">
            {descriptions[currentStep - 1]}
          </Text>
        )}
      </View>
    </View>
  );
};

export default StepIndicator;
