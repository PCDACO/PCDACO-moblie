import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { cn } from '~/lib/cn';
import { COLORS } from '~/theme/colors';

interface MenuButton {
  icon: keyof typeof Ionicons.glyphMap;
  label?: string;
  color?: string;
  onPress: () => void;
}

interface FloatingMenuProps {
  buttons: MenuButton[];
  className?: string;
}

const FloatingMenu: React.FC<FloatingMenuProps> = ({ buttons, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null); // Save the index of the pressed button
  const translateY = useSharedValue(100); // Initial hidden button
  const opacity = useSharedValue(0);

  const toggleMenu = () => {
    if (isOpen) {
      translateY.value = withSpring(100);
      opacity.value = withTiming(0, { duration: 200 });
    } else {
      translateY.value = withSpring(0);
      opacity.value = withTiming(1, { duration: 400 });
    }
    setIsOpen(!isOpen);
  };

  // Animation effect
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <View className={cn(className)}>
      {/* Button Menu (hidden/visible with animation, always on top of the menu button) */}
      <Animated.View style={[animatedStyle]} className="absolute bottom-2 right-0 items-end">
        {buttons.map((button, index) => {
          const isPressed = activeIndex === index; // Check if the button is pressed

          const buttonOpacity = isPressed ? 0.7 : 1; // Change opacity when pressed

          return (
            <TouchableOpacity
              key={index}
              className="mb-2 flex-row items-center gap-2 rounded-full p-3"
              style={{
                backgroundColor: button.color || COLORS.gray,
                opacity: buttonOpacity, // Apply opacity to the current button
              }}
              onPressIn={() => setActiveIndex(index)} // Set index for the pressed button
              onPressOut={() => setActiveIndex(null)} // Clear the state when the finger is removed
              onPress={button.onPress}>
              <Ionicons name={button.icon} size={20} color="white" />
              {button.label && <Text className="text-white">{button.label}</Text>}
            </TouchableOpacity>
          );
        })}
      </Animated.View>

      {/* Menu button */}
      <TouchableOpacity
        className="items-center justify-center rounded-full border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-slate-300"
        onPress={toggleMenu}>
        <Ionicons name={isOpen ? 'close' : 'options-outline'} size={20} color={COLORS.black} />
      </TouchableOpacity>
    </View>
  );
};

export default FloatingMenu;
