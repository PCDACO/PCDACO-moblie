import React, { useState } from 'react';
import { GestureResponderEvent, Image, Pressable, Text, View } from 'react-native';

import Title from '../typography/title';

interface UserCardProps {
  avatar: string;
  name: string;
  title?: string;
  subtitle?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  onPress?: (e: GestureResponderEvent) => void;
}

const UserCard: React.FC<UserCardProps> = ({
  avatar,
  name,
  title,
  subtitle,
  size = 'sm',
  onPress,
}) => {
  const sizeMap = (size: 'sm' | 'lg' | 'md') => {
    switch (size) {
      case 'sm':
        return 'w-12 h-12';
      case 'md':
        return 'w-16 h-16';
      case 'lg':
        return 'w-20 h-20';
    }
  };

  const sizeName = (size: 'sm' | 'lg' | 'md') => {
    switch (size) {
      case 'sm':
        return 'text-sm';
      case 'md':
        return 'text-base';
      case 'lg':
        return 'text-lg';
    }
  };

  const sizeTitle = (size: 'sm' | 'lg' | 'md') => {
    switch (size) {
      case 'sm':
        return 'text-base';
      case 'md':
        return 'text-lg';
      case 'lg':
        return 'text-xl';
    }
  };

  return (
    <Pressable onPress={onPress}>
      <View className="flex-row items-center gap-4 rounded-2xl bg-background px-6 py-4">
        <Image
          source={require('~/assets/placeholder.png')}
          className={`rounded-full border object-cover ${sizeMap(size)}`}
        />
        <View>
          <Title className={sizeName(size)} title={name} />
          {title && <Text className={`${sizeTitle(size)} text-muted-foreground`}>{title}</Text>}
          {subtitle &&
            (typeof subtitle === 'string' ? (
              <Text className="text-base text-muted-foreground">{subtitle}</Text>
            ) : (
              subtitle
            ))}
        </View>
      </View>
    </Pressable>
  );
};

export default UserCard;
