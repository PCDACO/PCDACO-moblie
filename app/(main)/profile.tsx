import { LogOut } from 'lucide-react-native';
import React from 'react';
import { View, Text } from 'react-native';

import BaseInfoUser from '~/components/personal-profile/base-info-user';
import MenuList from '~/components/personal-profile/menu-list';
import StatsCard from '~/components/personal-profile/stats-card';
import { Button } from '~/components/ui/button';

const ProfileScreen = () => {
  return (
    <View className="gap-4 ">
      <BaseInfoUser />
      <StatsCard />
      <MenuList />
      <View className="px-4">
        <Button className="w-full flex-row items-center justify-center rounded-lg bg-primary px-4 py-3">
          <LogOut color="white" size={20} />
          <Text className="ml-2 text-base text-white">Chỉnh sửa thông tin cá nhân</Text>
        </Button>
      </View>
    </View>
  );
};

export default ProfileScreen;
