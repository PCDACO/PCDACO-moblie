import { LogOut } from 'lucide-react-native';
import React from 'react';
import { View, Text } from 'react-native';

import BaseInfoUser from '~/components/personal-profile/base-info-user';
import MenuList from '~/components/personal-profile/menu-list';
import StatsCard from '~/components/personal-profile/stats-card';
import { Button } from '~/components/ui/button';
import { useAuthStore } from '~/stores/use-auth-store';

const ProfileScreen = () => {
  const { logout } = useAuthStore();
  return (
    <View className="gap-4 ">
      <BaseInfoUser />
      <StatsCard />
      <MenuList />
      <View className="px-4">
        <Button
          className="w-full flex-row items-center justify-center rounded-lg border border-destructive bg-background px-4 py-3"
          onPress={async () => {
            await logout();
          }}>
          <LogOut color="red" size={20} />
          <Text className="ml-2 text-base text-destructive">Đăng xuất</Text>
        </Button>
      </View>
    </View>
  );
};

export default ProfileScreen;
