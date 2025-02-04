import React from 'react';
import { Text, View, FlatList } from 'react-native';

import Card from '~/components/home-screen/card';
import TransactionItem from '~/components/home-screen/transaction-list/transaction-item';
import TransactionTitle from '~/components/home-screen/transaction-list/transaction-title';
import { Button } from '~/components/ui/button';

const TransactionList = () => {
  const transactions = [
    {
      status: true,
      carName: 'Toyota Camry',
      price: 200,
      startDate: new Date('2023-01-01T00:00:00Z'),
      endDate: new Date('2023-02-01T00:00:00Z'),
    },
    {
      status: false,
      carName: 'Toyota Camry',
      price: 200,
      startDate: new Date('2023-01-01T00:00:00Z'),
      endDate: new Date('2023-02-01T00:00:00Z'),
    },
    {
      status: true,
      carName: 'Toyota Camry',
      price: 200,
      startDate: new Date('2023-01-01T00:00:00Z'),
      endDate: new Date('2023-02-01T00:00:00Z'),
    },
  ];

  // Sort transactions so that those with status false are at the top
  const sortedTransactions = transactions.sort((a, b) => {
    if (a.status === false && b.status === true) return -1;
    if (a.status === true && b.status === false) return 1;
    return 0;
  });

  return (
    <View>
      <TransactionTitle />
      <FlatList
        data={sortedTransactions}
        renderItem={({ item }) => <TransactionItem transaction={item} />}
        keyExtractor={(_, index) => index.toString()}
        ItemSeparatorComponent={() => <View className="h-2" />}
      />

      <Card className="items-center">
        <Button className="rounded-full">
          <Text className="w-fit px-9 text-background">Xem thêm</Text>
        </Button>
      </Card>
    </View>
  );
};

export default TransactionList;
