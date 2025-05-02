import React, { type FunctionComponent } from 'react';
import { View, Platform, Animated, Pressable } from 'react-native';

import { cn } from '~/lib/cn';

interface CardBasicProps {
  className?: string;
  children: React.ReactNode;
  onPress?: () => void;
  elevation?: number;
  disabled?: boolean;
}

const CardBasic: FunctionComponent<CardBasicProps> = ({
  className,
  children,
  onPress,
  elevation = 3,
  disabled = false,
}) => {
  // Animation for press feedback
  const animatedValue = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (onPress && !disabled) {
      Animated.spring(animatedValue, {
        toValue: 0.98,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }).start();
    }
  };

  const handlePressOut = () => {
    if (onPress && !disabled) {
      Animated.spring(animatedValue, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }).start();
    }
  };

  // Platform specific shadow styles
  const shadowStyle = Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: elevation },
      shadowOpacity: 0.1,
      shadowRadius: elevation * 1.5,
    },
    android: {
      elevation,
    },
    default: {},
  });

  const CardContainer = onPress ? Pressable : View;

  return (
    <CardContainer
      accessible={!!onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityState={{ disabled }}
      onPress={disabled ? undefined : onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={({ pressed }) => [{ opacity: pressed && onPress && !disabled ? 0.9 : 1 }]}>
      <Animated.View
        className={cn(
          'rounded-lg bg-white p-4 dark:bg-gray-800', // darker background in dark mode
          disabled && 'opacity-60',
          className
        )}
        style={[
          shadowStyle,
          {
            transform: [{ scale: animatedValue }],
          },
        ]}>
        {children}
      </Animated.View>
    </CardContainer>
  );
};

export default CardBasic;
