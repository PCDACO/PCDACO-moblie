import React, { FunctionComponent } from 'react';
import { FlatList, Pressable, ScrollView, Text, View } from 'react-native';
import Box from '~/components/box';

import ButtonIcon from '~/components/icon-button/icon-button';
import Title from '~/components/typography/title';
import UserCard from '~/components/user-card';
import ContentInfoUser from '~/components/user-card/content-info-user';
import { DateFormat, formatDateToString } from '~/lib/format';
import { FlagIcon, Phone, Star, StarIcon } from '~/lib/icons/icon';

interface HistoryBookingCar {
  id: string;
  carModel: string;
  carBrand: string;
  startDate: Date;
  endDate: Date;
  rating: number;
}

const UserInfo: FunctionComponent = () => {
  const data: HistoryBookingCar[] = [
    {
      id: '1',
      carModel: 'BMW X5',
      carBrand: 'BMW',
      startDate: new Date(),
      endDate: new Date(),
      rating: 5,
    },
    {
      id: '2',
      carModel: 'BMW X5',
      carBrand: 'BMW',
      startDate: new Date(),
      endDate: new Date(),
      rating: 4.5,
    },
  ];

  const renderItemHistoryBookingCar = (item: HistoryBookingCar) => {
    return (
      <Box className="flex-row items-start justify-between gap-4 bg-background p-5">
        <View>
          <Title title={item.carModel} size="lg" className="font-medium" />
          <Title title={item.carBrand} size="md" className="mt-2 text-muted-foreground" />
          <Title
            title={`${formatDateToString(item.startDate, DateFormat.DayTime)} - ${formatDateToString(item.endDate, DateFormat.DayTime)}`}
            size="sm"
            className="text-muted-foreground"
          />
        </View>
        <View className="flex-row items-center gap-2">
          <Star fill="#FACC15" />
          <Text>{item.rating}</Text>
        </View>
      </Box>
    );
  };

  return (
    <>
      <ScrollView nestedScrollEnabled>
        <View className="gap-4">
          {/* infor */}
          <View className="gap-2 bg-background">
            <UserCard avatar="" name="John Doe" subtitle="Software Engineer" size="lg" />
            <View className="p-5">
              <ContentInfoUser
                phone="0123456789"
                email="chaunhattruong4747@gmail.com"
                address="123, Street, City, Country"
                rentalTimes={5}
              />
            </View>
          </View>

          {/* history */}
          <View className="gap-8 bg-background p-5">
            <View className="flex-row items-center justify-between ">
              <Title title="Lịch sử thuê xe" size="xl" />
              <Pressable>
                <Text className="text-xl text-primary">Xem tất cả</Text>
              </Pressable>
            </View>
            <FlatList
              data={data}
              renderItem={({ item }) => renderItemHistoryBookingCar(item)}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => <View className="h-4" />}
              scrollEnabled={false}
            />
          </View>
        </View>
      </ScrollView>
      <View className="flex-row justify-between gap-4 bg-background p-5">
        <ButtonIcon icon={Phone} label="Gọi điện" className="flex-1" iconColor="blue" />
        <ButtonIcon icon={StarIcon} label="Đánh giá" className="flex-1" iconColor="blue" />
        <ButtonIcon icon={FlagIcon} variant="destructive" iconColor="red" fill="red" />
      </View>
    </>
  );
};

export default UserInfo;
