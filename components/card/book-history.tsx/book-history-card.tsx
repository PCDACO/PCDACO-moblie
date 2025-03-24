import { FontAwesome6 } from '@expo/vector-icons';
import { FunctionComponent } from 'react';
import { View } from 'react-native';

import CardBasic from '~/components/plugins/card-basic';
import Description from '~/components/screens/car-editor/description';
import Subtitle from '~/components/screens/car-editor/subtitle';
import { BookingStatusEnum } from '~/constants/enums';
import { BookResponseList } from '~/constants/models/book.model';
import { cn } from '~/lib/cn';

interface BookHistoryCardProps {
  booking: BookResponseList;
}

const BookHistoryCard: FunctionComponent<BookHistoryCardProps> = ({ booking }) => {
  let borderLColor = '';
  let borderLSize = '';

  switch (booking.status) {
    case BookingStatusEnum.Approved:
      borderLColor = 'border-l-green-500';
      borderLSize = 'border-l-4';
      break;
    case BookingStatusEnum.Rejected:
      borderLColor = 'border-l-red-500';
      borderLSize = 'border-l-4';
      break;
    case BookingStatusEnum.Pending:
      borderLColor = 'border-l-yellow-500';
      borderLSize = 'border-l-4';
      break;
    case BookingStatusEnum.Expired:
      borderLColor = 'border-l-gray-500';
      borderLSize = 'border-l-4';
      break;
    default:
      borderLColor = 'border-l-gray-500';
      borderLSize = 'border-l-4';
      break;
  }

  return (
    <CardBasic className={cn('flex-row items-center justify-between', borderLColor, borderLSize)}>
      <View>
        <Subtitle title={`${booking.carName}`} />
        <Description title={`${booking.driverName}`} />
      </View>
      <View>
        {booking.isPaid ? (
          <FontAwesome6 name="circle-check" size={24} color="green" />
        ) : (
          <FontAwesome6 name="circle-xmark" size={24} color="red" />
        )}
      </View>
    </CardBasic>
  );
};

export default BookHistoryCard;
