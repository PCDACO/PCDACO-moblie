'use client';

import React, { forwardRef } from 'react';
import { TextInput, View, type TextInputProps, Animated } from 'react-native';

import { Text } from '~/components/nativewindui/Text';
import { cn } from '~/lib/cn';

interface InputProps extends TextInputProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
  touched?: boolean;
}

export const Input = forwardRef<TextInput, InputProps>(
  ({ leftIcon, rightIcon, error, touched, className, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const animatedBorderColor = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
      Animated.timing(animatedBorderColor, {
        toValue: isFocused ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }, [isFocused]);

    const borderColor = animatedBorderColor.interpolate({
      inputRange: [0, 1],
      outputRange: ['#e5e7eb', '#3b82f6'], // gray-200 to blue-500
    });

    const hasError = !!error && touched;

    return (
      <View className="w-full">
        <Animated.View
          className={cn(
            'flex-row items-center rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-800',
            hasError ? 'border border-red-500' : 'border',
            className
          )}
          style={{
            borderColor: hasError ? '#ef4444' : borderColor,
          }}>
          {leftIcon && <View className="mr-2">{leftIcon}</View>}
          <TextInput
            ref={ref}
            className="flex-1 text-base text-gray-900 dark:text-white"
            placeholderTextColor="#9ca3af" // gray-400
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          {rightIcon && <View className="ml-2">{rightIcon}</View>}
        </Animated.View>
        {hasError && <Text className="mt-1 text-xs text-red-500">{error}</Text>}
      </View>
    );
  }
);
