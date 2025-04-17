import { useLocalSearchParams } from 'expo-router';
import React, { FunctionComponent } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

import Loading from '~/components/plugins/loading';
import { useCarContactQuery } from '~/hooks/car/use-car';

const Contract: FunctionComponent = () => {
  const { id } = useLocalSearchParams();
  const { data: contract, isLoading } = useCarContactQuery({ id: id as string });

  if (isLoading || !contract) {
    return (
      <View className="h-full flex-1 items-center justify-center">
        <Loading />
      </View>
    );
  }

  return <WebView source={{ html: contract }} />;
};

export default Contract;
