import { useRef } from 'react';
import { Animated, PanResponder, Dimensions } from 'react-native';

interface UsePanResponderProps {
  initialPosition?: number;
  onExpand?: () => void;
  onCollapse?: () => void;
}

export const usePanResponder = ({
  initialPosition = 370,
  onExpand,
  onCollapse,
}: UsePanResponderProps = {}) => {
  const slideAnim = useRef(new Animated.Value(initialPosition)).current;
  const screenHeight = Dimensions.get('window').height;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const newPosition = initialPosition + gestureState.dy;
        if (newPosition >= 0 && newPosition <= screenHeight) {
          slideAnim.setValue(newPosition);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy < screenHeight / 3) {
          // If pulled up more than 2/3 of screen height, expand
          Animated.spring(slideAnim, {
            toValue: 100,
            useNativeDriver: true,
            tension: 65,
            friction: 10,
          }).start();
          onExpand?.();
        } else {
          // Otherwise, return to default position
          Animated.spring(slideAnim, {
            toValue: initialPosition,
            useNativeDriver: true,
            tension: 65,
            friction: 10,
          }).start();
          onCollapse?.();
        }
      },
    })
  ).current;

  return {
    slideAnim,
    panResponder,
  };
};
