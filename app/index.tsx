import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Link, Redirect, router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import { Easing, useSharedValue, withTiming } from 'react-native-reanimated';

import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
import Subtitle from '~/components/screens/car-editor/subtitle';
import { useBottomSheet } from '~/hooks/plugins/use-bottom-sheet';
import { useAuthStore } from '~/store/auth-store';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const CAR_WIDTH = 400;
const CAR_HEIGHT = CAR_WIDTH * 0.5;

const HEADER_WIDTH = 600;
const HEADER_HEIGHT = 400;

const driverCar = require('~/assets/image/drive-car.png');
const header = require('~/assets/image/header.png');

export default function App() {
  const translateX = useRef(new Animated.Value(-CAR_WIDTH)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const fadeOutOpacity = useRef(new Animated.Value(1)).current;
  const [animationFinished, setAnimationFinished] = React.useState(false);

  const animatedIndex = useSharedValue(0);
  const { isAuthenticated } = useAuthStore();

  const snapPoints = React.useMemo(() => ['1%', '45%'], []);

  const { sheetRef, handleSnapPress, handleSheetChange } = useBottomSheet({ snapPoints });
  const moveUp = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const centerX = (screenWidth - CAR_WIDTH) / 2;

    Animated.sequence([
      Animated.timing(translateX, {
        toValue: centerX,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.delay(1000),
      Animated.timing(translateX, {
        toValue: screenWidth,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        if (isAuthenticated) {
          Animated.timing(fadeOutOpacity, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }).start(() => {
            setAnimationFinished(true);
          });
        } else {
          handleSnapPress(1);
          Animated.timing(moveUp, {
            toValue: -150,
            duration: 800,
            useNativeDriver: true,
          }).start(() => {
            setAnimationFinished(true);
          });
          animatedIndex.value = withTiming(1, { duration: 5000, easing: Easing.out(Easing.exp) });
        }
      }, 1000);
    });
  }, [isAuthenticated]);

  if (animationFinished && isAuthenticated) {
    return <Redirect href="/(main)" />;
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeOutOpacity }]}>
      <Animated.Image
        source={driverCar}
        style={[styles.car, { transform: [{ translateX }] }]}
        resizeMode="contain"
      />
      <Animated.Image
        source={header}
        resizeMode="contain"
        style={[styles.header, { opacity: textOpacity, transform: [{ translateY: moveUp }] }]}
      />
      <Animated.Text
        style={[styles.text, { opacity: textOpacity, transform: [{ translateY: moveUp }] }]}>
        FREEDRIVER
      </Animated.Text>
      <BottomSheet
        ref={sheetRef}
        animatedIndex={animatedIndex}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        onChange={handleSheetChange}
        handleComponent={null}
        enablePanDownToClose={false}
        enableOverDrag={false}
        enableHandlePanningGesture={false}>
        <BottomSheetView className="flex-1">
          <View
            className="flex-1 justify-evenly gap-2 bg-blue-400 px-4"
            style={{
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
            }}>
            <View className="items-center">
              <Subtitle className="text-3xl" title="Chào mừng đã quay trở lại" />
            </View>
            <View className=" gap-2">
              <Button
                className="bg-foreground"
                onPress={() => {
                  router.push({
                    pathname: '/(auth)/login',
                  });
                }}>
                <Text className="text-background">Đăng nhập</Text>
              </Button>
              <Button
                className="bg-background"
                variant="secondary"
                onPress={() => {
                  router.push({
                    pathname: '/(auth)/register',
                  });
                }}>
                <Text className="text-foreground">Đăng kí</Text>
              </Button>
            </View>
            <View className="flex-row items-center justify-center">
              <View className="w-80">
                <Text className="text-center text-foreground">
                  Để đảm bảo quyền lợi của bạn, xin vui lòng xem kỹ{' '}
                  <Link
                    className="font-semibold text-background underline"
                    href="/(screen)/privacy">
                    chính sách của chúng tôi
                  </Link>
                </Text>
              </View>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  car: {
    width: CAR_WIDTH,
    height: CAR_HEIGHT,
    position: 'absolute',
    top: screenHeight / 2 - CAR_HEIGHT / 2 - 30,
  },
  header: {
    width: HEADER_WIDTH,
    height: HEADER_HEIGHT,
    position: 'absolute',
    top: screenHeight / 2 - 260,
  },
  text: {
    position: 'absolute',
    top: screenHeight / 2 + 90,
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 5,
    color: '#000',
    textAlign: 'center',
  },
});
