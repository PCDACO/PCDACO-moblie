import { View } from 'react-native';

import Loading from '~/components/plugins/loading';
import HomeHeader from '~/components/screens/home-screen/home-header';
import { HomeScreen } from '~/components/screens/home-screen/home-screen';
import { UserResponse } from '~/constants/models/user.model';
import { useUserQuery } from '~/hooks/user/use-user';

const HomeScreenWrapper = () => {
  const { currentUserQuery } = useUserQuery();

  const { data: user, isLoading } = currentUserQuery;

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Loading />
      </View>
    );
  }

  return (
    <View className="h-full flex-1">
      <HomeHeader
        user={
          (user?.value as UserResponse) || {
            id: '',
            name: '',
            email: '',
            avatarUrl: '',
          }
        }
      />
      <HomeScreen user={user?.value as UserResponse} />
    </View>
  );
};

export default HomeScreenWrapper;
