import { useLocalSearchParams } from 'expo-router';
import React, { FunctionComponent } from 'react';
import { View } from 'react-native';

import Loading from '~/components/plugins/loading';
import TabView, { Tab } from '~/components/plugins/tab-view';
import PostInspection from '~/components/screens/inspection-view/post-inspection';
import PreInspection from '~/components/screens/inspection-view/pre-inspection';
import { useBookingDetailQuery } from '~/hooks/book/use-book';
const ViewInspectionScreen: FunctionComponent = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: bookingDetail, isLoading, refetch } = useBookingDetailQuery(id as string);

  const tab: Tab[] = [
    {
      title: 'Trước khi đi',
      key: 'pre',
      content: <PreInspection />,
    },
    {
      title: 'Sau khi đi',
      key: 'post',
      content: <PostInspection />,
    },
  ];
  if (isLoading) {
    return (
      <View className="h-full flex-1 items-center justify-center">
        <Loading />
      </View>
    );
  }

  return (
    <View className="flex-1">
      <TabView tabs={tab} />
    </View>
  );
};

export default ViewInspectionScreen;
