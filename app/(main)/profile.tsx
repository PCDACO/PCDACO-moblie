import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import Skeleton from '~/components/nativewindui/Skeleton';
import LogoutButton from '~/components/screens/profile-screen/logout-button';
import ProfileHeader from '~/components/screens/profile-screen/profile-header';
import ProfileMenu from '~/components/screens/profile-screen/profile-menu';
import ProfileStats from '~/components/screens/profile-screen/profile-stats';
import { useUserQuery } from '~/hooks/user/use-user';

const ProfileScreen = () => {
  const { currentUserQuery } = useUserQuery();

  const { data, isLoading, error } = currentUserQuery;

  if (isLoading || error) {
    return (
      <SafeAreaView className="gap-4 px-2">
        <Skeleton height={250} />
        <Skeleton height={100} />
        <Skeleton height={40} />
        <Skeleton height={40} />
        <Skeleton height={40} />
        <Skeleton height={40} />
        <Skeleton height={40} />
      </SafeAreaView>
    );
  }

  return (
    <ScrollView>
      <SafeAreaView>
        <View className=" flex-row justify-between px-4 ">
          <TouchableOpacity className="p-2" onPress={() => router.back()}>
            <Feather size={20} name="arrow-left" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2">
            <Feather size={20} name="edit" />
          </TouchableOpacity>
        </View>
        <ProfileHeader
          image={data?.value.avatarUrl}
          name={data?.value.name}
          role={data?.value.role}
          user={data?.value}
        />
        <ProfileStats
          bookingsCount={data?.value.totalRented || 0}
          income={data?.value.balance || 0}
          totalCar={data?.value.totalCar || 0}
          totalRent={data?.value.totalRent || 0}
          totalRented={data?.value.totalRented || 0}
        />
        <ProfileMenu id={data?.value.id || ''} />
        <LogoutButton />
      </SafeAreaView>
    </ScrollView>
  );
};

export default ProfileScreen;
