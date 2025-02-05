import React from 'react';
import { ScrollView, View } from 'react-native';

import BookVertical from '~/components/booking-car/book-vertical';
import UserCard from '~/components/user-card';

const BookList = () => {
  return (
    <ScrollView>
      <View className="gap-4 px-4 py-8">
        <UserCard avatar="" name="Toyota Camry SE" title="2025 Model" size="md" />
        <BookVertical />
        <BookVertical />
      </View>
    </ScrollView>
  );
};

export default BookList;
