import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  View,
  FlatList,
  Pressable,
  Image,
  ImageSourcePropType,
  Text,
} from 'react-native';

const SwiperImage = () => {
  const flatlistRef = useRef<FlatList<any>>(null);

  const screenWidth = Dimensions.get('window').width;
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const [items, setItems] = useState<
    {
      id: number;
      image: ImageSourcePropType;
    }[]
  >([]);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      //   const nextIndex = (activeIndex + 1) % items.length;
      if (items.length > 0) {
        const nextIndex = (activeIndex + 1) % items.length;
        flatlistRef.current?.scrollToIndex({ index: nextIndex });
        setActiveIndex(nextIndex);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const onViewableItemsChanged = ({ viewableItems }: any) => {
    // Update activeIndex when viewable items change
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index + 1);
    }
  };

  const slideClicked = (item: { id: number; image: ImageSourcePropType }) => {
    // Do something when a slide is clicked
    console.log('Slide clicked', item);
  };

  // Render item function for FlatList
  const renderItem = ({
    item,
    index,
  }: {
    item: { id: number; image: ImageSourcePropType };
    index: number;
  }) => {
    return (
      <Pressable key={index} onPress={() => slideClicked(item)}>
        <View className={` h-60 p-2 shadow-md `} style={{ width: screenWidth }}>
          <Image source={item.image} className="size-full rounded-xl object-cover shadow-lg" />
        </View>
      </Pressable>
    );
  };

  const renderImageSubset = () => {
    return (
      <View className="rounded-full bg-muted p-2">
        <Text>
          {activeIndex}/{items.length}
        </Text>
      </View>
    );
  };

  useEffect(() => {
    const DATA = [
      {
        id: 1,
        image: require('~/assets/placeholder.png'),
      },
      {
        id: 2,
        image: require('~/assets/placeholder.png'),
      },
      {
        id: 3,
        image: require('~/assets/placeholder.png'),
      },
      {
        id: 4,
        image: require('~/assets/placeholder.png'),
      },
    ];
    setItems(DATA);
  }, []);

  return (
    <View className="h-60">
      <FlatList
        data={items}
        ref={flatlistRef}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        renderItem={renderItem}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        onViewableItemsChanged={onViewableItemsChanged}
      />
      <View className="absolute right-5 top-4">{renderImageSubset()}</View>
    </View>
  );
};

export default SwiperImage;
