import React from 'react';

import BookContent from '~/components/booking-car/book-content';
import BookFooter from '~/components/booking-car/book-footer';
import BookHeader from '~/components/booking-car/book-header';
import Card from '~/components/home-screen/card';

interface BookingItemProps {
  booking: {
    userName: string;
    location: string;
    time: string;
    carBrand: string;
    startDate: Date;
    endDate: Date;
    status: boolean;
  };
}

const BookingItem: React.FC<BookingItemProps> = ({
  booking: { userName, location, time, carBrand, startDate, endDate, status },
}) => {
  return (
    <Card className="gap-6">
      <BookHeader userName={userName} location={location} time={time} status={status} />
      <BookContent carName={carBrand} startDate={startDate} endDate={endDate} />
      <BookFooter />
    </Card>
  );
};

export default BookingItem;
