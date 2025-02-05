import React from 'react';
import { Image, Text, View } from 'react-native';

import Title from '../typography/title';

interface UserCardProps {
  avatar: string;
  name: string;
  title: string;
  subtitle: React.ReactNode;
}

const UserCard: React.FC<UserCardProps> = ({ avatar, name, title, subtitle }) => {
  return (
    <View className="flex-row items-center gap-4">
      <Image
        source={require('~/assets/placeholder.png')}
        className=" size-20 rounded-full border object-cover"
      />
      <View>
        <Title title={name} />
        <Text className="text-base text-muted-foreground">{title}</Text>
        {typeof subtitle === 'string' ? (
          <Text className="text-base text-muted-foreground">{subtitle}</Text>
        ) : (
          subtitle
        )}
      </View>
    </View>
  );
};

export default UserCard;
