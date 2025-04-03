import { Feather, Ionicons } from '@expo/vector-icons';
import React, { FunctionComponent } from 'react';
import { View } from 'react-native';

import BookBadgeStatus from '~/components/screens/book-list/book-badge-status';
import Description from '~/components/screens/car-editor/description';
import HeaderTitle from '~/components/screens/car-editor/header-title';
import Subtitle from '~/components/screens/car-editor/subtitle';
import { BookResponseList } from '~/constants/models/book.model';
import { cn } from '~/lib/cn';
import { COLORS } from '~/theme/colors';

interface BookHeaderProps {
  carName: BookResponseList['carName'];
  status: BookResponseList['status'];
  id: BookResponseList['id'];
  isPaid: BookResponseList['isPaid'];
  isRefund: BookResponseList['isRefund'];
  ownerName: BookResponseList['ownerName'];
  driverName: BookResponseList['driverName'];
}

const BookHeader: FunctionComponent<BookHeaderProps> = ({
  carName,
  status,
  id,
  isPaid,
  isRefund,
  ownerName,
  driverName,
}) => {
  let title = '';
  let textColor = '';

  if (isPaid && isRefund) {
    title = 'hoàn tiền';
    textColor = 'text-blue-400';
  } else if (isPaid) {
    title = 'đã thanh toán';
    textColor = 'text-green-400';
  } else {
    title = 'chưa thanh toán';
    textColor = 'text-red-400';
  }
  return (
    <View className="gap-2">
      <View className="flex-row items-center justify-between">
        <HeaderTitle title={carName} />
        <BookBadgeStatus status={status} />
      </View>
      <View className="flex-row items-center justify-start gap-2">
        <Ionicons name="car-outline" size={24} color={COLORS.black} />
        <Description title={`ID: ${id.slice(0, 8).toUpperCase()}`} />
        <Subtitle title="-" />
        <Subtitle className={cn(textColor)} title={title} />
      </View>
      <View className="flex-row items-center justify-between">
        {/* <View className="flex-1 flex-row items-center gap-2">
          <Feather name="user" size={24} color={COLORS.gray} />
          <View>
            <Description title="Chủ xe" className="text-sm" />
            <Description className="text-sm font-semibold text-foreground" title={ownerName} />
          </View>
        </View> */}
        <View className="flex-1 flex-row items-center gap-2">
          <Feather name="user" size={24} color={COLORS.gray} />
          <View>
            <Description title="Tài xế" className="text-sm" />
            <Description className="text-sm font-semibold text-foreground" title={driverName} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default BookHeader;
