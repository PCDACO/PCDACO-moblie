import React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';

import CardTransaction from '~/components/card/transaction/card-transaction';
import { useInfiniteTransactions } from '~/hooks/transaction/use-transaction';

const Transaction = () => {
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteTransactions({});

  const transactions = data?.pages.flatMap((page) => page.value?.items || []) || [];

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="flex-1">
      <FlatList
        data={transactions}
        renderItem={({ item }) => <CardTransaction data={item} />}
        keyExtractor={(item) => item.id}
        onEndReached={loadMore}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => {
          if (isFetchingNextPage) {
            return (
              <View className="py-4">
                <ActivityIndicator size="small" />
              </View>
            );
          }
          return null;
        }}
        contentContainerStyle={{ padding: 16 }}
        ItemSeparatorComponent={() => <View className="h-4" />}
      />
    </View>
  );
};

export default Transaction;
