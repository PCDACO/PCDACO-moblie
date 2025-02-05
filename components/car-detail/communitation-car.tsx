import React, { FunctionComponent } from 'react';
import { Text, View } from 'react-native';

import Title from '../typography/title';
import TitleWithIcon from '../typography/title-with-icon';

import { countDaysBetweenDates, DateFormat, formatDateToString } from '~/lib/format';
import { Calendar, Clock, MapPin, MessageCircle } from '~/lib/icons/icon';

const CommunitationCar: FunctionComponent = () => {
  return (
    <View className="gap-6 bg-background p-4">
      <Title title="Thông tin đặt xe" />
      <View className="gap-2">
        <View className="w-full flex-row justify-between gap-4">
          <TitleWithIcon title="Ngày bắt đầu" icon={Calendar} iconColor="blue" />
          <Text className="text-lg text-muted-foreground">
            {formatDateToString(new Date(), DateFormat.DayTime)}
          </Text>
        </View>
        <View className="w-full flex-row justify-between gap-4">
          <TitleWithIcon title="Ngày kết thúc" icon={Calendar} iconColor="blue" />
          <Text className="text-lg text-muted-foreground">
            {formatDateToString(new Date(), DateFormat.DayTime)}
          </Text>
        </View>
        <View className="w-full flex-row justify-between gap-4">
          <TitleWithIcon title="Thời gian sử dụng" icon={Clock} iconColor="blue" />
          <Text className="text-lg text-muted-foreground">
            {countDaysBetweenDates(new Date(), new Date())} ngày
          </Text>
        </View>
        <View className="w-full gap-1">
          <TitleWithIcon title="Ngày bắt đầu" icon={MapPin} iconColor="blue" weight="bold" />
          <Text className="pl-8 text-lg text-muted-foreground">
            123 Đường Nguyễn Văn Linh, Quận 7, TP.HCM
          </Text>
        </View>
        <View className="w-full  gap-1">
          <TitleWithIcon title="Ghi chú" icon={MessageCircle} iconColor="blue" weight="bold" />
          <Text className="pl-8 text-lg text-muted-foreground">
            Cần xe để đi du lịch gia đình, mong xe sạch sẽ và được giao đúng giờ.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CommunitationCar;
