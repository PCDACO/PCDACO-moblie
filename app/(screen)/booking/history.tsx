import React, { FunctionComponent } from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';

import BookHistoryCard from '~/components/card/book-history/book-history-card';
import Loading from '~/components/plugins/loading';
import BookCategory from '~/components/screens/book-history/book-category';
import { BookingStatusEnum } from '~/constants/enums';
import { useBookingListQuery } from '~/hooks/book/use-book';

const HistoryBookingScreen: FunctionComponent = () => {
  const { data: bookingCancelled, isLoading } = useBookingListQuery({
    limit: 4,
    status: BookingStatusEnum.Rejected,
  });
  const bookingCancelledList = bookingCancelled?.value.items || [];

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Loading />
      </View>
    );
  }

  return (
    <ScrollView className=" px-4 py-2">
      <View className="flex-1 gap-4">
        <BookCategory title="Đã từ chối">
          <FlatList
            data={bookingCancelledList}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => <BookHistoryCard booking={item} />}
            ItemSeparatorComponent={() => <View className="h-2" />}
            ListEmptyComponent={() => (
              <View className="items-center justify-center rounded-lg border border-gray-200 p-4 ">
                <Text className="text-center">Không có dữ liệu</Text>
              </View>
            )}
          />
        </BookCategory>
        <BookCategory title="Đã hoàn thành">
          <FlatList
            data={bookingCancelledList}
            scrollEnabled={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <BookHistoryCard booking={item} />}
            ItemSeparatorComponent={() => <View className="h-2" />}
          />
        </BookCategory>
      </View>
    </ScrollView>
  );
};

export default HistoryBookingScreen;
