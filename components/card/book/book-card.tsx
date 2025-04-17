import { useRouter } from 'expo-router';
import React, { FunctionComponent } from 'react';
import { View } from 'react-native';

import BookBody from './book-body';
import BookFooter from './book-footer';
import BookHeader from './book-header';

import CardBasic from '~/components/plugins/card-basic';
import { BookResponseList } from '~/constants/models/book.model';
import { cn } from '~/lib/cn';

interface BookCardProps {
  booking: BookResponseList;
}

const BookCard: FunctionComponent<BookCardProps> = ({ booking }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: '/booking/page',
      params: { id: booking.id },
    });
  };

  let borderLColor = 'border-l-gray-500';

  if (booking.isPaid && booking.isRefund) {
    borderLColor = 'border-l-blue-500';
  } else if (booking.isPaid) {
    borderLColor = 'border-l-green-500';
  } else if (booking.isRefund) {
    borderLColor = 'border-l-red-500';
  } else {
    borderLColor = 'border-l-red-500';
  }

  return (
    <CardBasic className={cn('my-1 gap-2 border-l-4', borderLColor)} onPress={handlePress}>
      <BookHeader
        carName={booking.carName || ''}
        status={booking.status || ''}
        id={booking.id || ''}
        isPaid={booking.isPaid || false}
        isRefund={booking.isRefund || false}
        ownerName={booking.ownerName || ''}
        driverName={booking.driverName || ''}
      />
      <View className="h-0.5 w-full bg-gray-200" />

      <BookBody
        startTime={booking.startTime || ''}
        endTime={booking.endTime || ''}
        actualReturnTime={booking.actualReturnTime || ''}
      />

      <View className="h-0.5 w-full bg-gray-200" />
      <BookFooter
        totalAmount={booking.totalAmount || 0}
        totalDistance={booking.totalDistance || 0}
      />
    </CardBasic>
  );
};

export default BookCard;
