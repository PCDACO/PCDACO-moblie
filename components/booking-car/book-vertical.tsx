import { router } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

import VehicleInfo from '../car-detail/vehicle-info';
import StatusBagde from '../status-badge';
import TitleWithIcon from '../typography/title-with-icon';
import { Button } from '../ui/button';
import UserCard from '../user-card';

import {
  countDaysBetweenDates,
  DateFormat,
  formatDateToString,
  formatPriceToVND,
} from '~/lib/format';
import { Calendar, DollarSign, MapPin } from '~/lib/icons/icon';

const BookVertical = () => {
  return (
    <View className="gap-4 rounded-xl bg-background pb-4">
      <View className="flex-row items-center justify-between ">
        <UserCard avatar="" name="Châu Nhật Trường" title="1 giờ trước" size="sm" />
        <StatusBagde text="Đang chờ" option="warning" className="mr-3" />
      </View>
      <View className="px-6">
        <View>
          <Text className="text-sm text-muted-foreground">Nhận xe</Text>
          <TitleWithIcon
            title={formatDateToString(new Date(), DateFormat.DayTime)}
            icon={Calendar}
            iconSize={16}
            iconClassName="text-muted-foreground"
            titleClassName="text-muted-foreground"
          />
        </View>
        <View>
          <Text className="text-sm text-muted-foreground">Trả xe</Text>
          <TitleWithIcon
            title={formatDateToString(new Date(), DateFormat.DayTime)}
            icon={Calendar}
            iconSize={16}
            iconClassName="text-muted-foreground"
            titleClassName="text-muted-foreground"
          />
        </View>
        <View>
          <Text className="text-sm text-muted-foreground">Số tiền</Text>
          <TitleWithIcon
            title={`${formatPriceToVND(10000000)} (${countDaysBetweenDates(new Date(), new Date())} ngày)`}
            icon={DollarSign}
            iconSize={16}
            iconClassName="text-muted-foreground"
            titleClassName="text-muted-foreground"
          />
        </View>
        <View>
          <Text className="text-sm text-muted-foreground">Địa chỉ nhận xe</Text>
          <TitleWithIcon
            title="Biên Hòa, Đồng Nai"
            icon={MapPin}
            iconSize={16}
            iconClassName="text-muted-foreground"
            titleClassName="text-muted-foreground"
          />
        </View>
      </View>
      <View className="px-6">
        <VehicleInfo licenseBack="" licenseFront="" />
      </View>
      <View className="min-h-32 gap-1 px-6 py-1">
        <Text className="text-sm text-muted-foreground">Ghi chú</Text>
        <View className="h-32 rounded-xl bg-accent px-4 py-2">
          <Text>Cần đi giữ gìn</Text>
        </View>
      </View>
      <View className="justify-center px-6">
        <Button
          className="w-fit"
          onPress={() => {
            router.push({
              pathname: '/(screens)/request-car/[id]',
              params: { id: '1' },
            });
          }}>
          <Text className=" font-semibold text-background">Xem chi tiết</Text>
        </Button>
      </View>
    </View>
  );
};

export default BookVertical;
