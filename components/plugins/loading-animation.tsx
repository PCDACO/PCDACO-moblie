import LottieView from 'lottie-react-native';
import React, { useEffect } from 'react';
import { Animated } from 'react-native';

import MainScene from '~/assets/animation/animation.json';

export default function LoadingAnimation() {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
        delay: 1000,
      }),
    ]).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <LottieView source={MainScene} autoPlay loop style={{ width: 300, height: 300 }} />
    </Animated.View>
  );
}
