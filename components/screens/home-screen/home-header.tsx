import { FunctionComponent } from 'react';
import { View, Text } from 'react-native';

import Description from '../car-editor/description';
import Subtitle from '../car-editor/subtitle';

import { Avatar, AvatarFallback, AvatarImage } from '~/components/nativewindui/Avatar';
import { UserResponse } from '~/constants/models/user.model';

interface HomeHeaderProps {
  user?: UserResponse;
}

const HomeHeader: FunctionComponent<HomeHeaderProps> = ({ user }) => {
  return (
    <View className="flex-row items-center justify-between rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-slate-300">
      <View className="flex-row items-center gap-2">
        <Avatar alt={user?.name || ''}>
          <AvatarImage source={{ uri: user?.avatarUrl }} />
          <AvatarFallback>
            <Text>{user?.name.charAt(0) || ''}</Text>
          </AvatarFallback>
        </Avatar>
        <View>
          <Subtitle title={user?.name || ''} />
          <Description title={user?.email || ''} />
        </View>
      </View>
    </View>
  );
};

export default HomeHeader;
