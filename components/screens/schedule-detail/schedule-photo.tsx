import { Feather } from '@expo/vector-icons';
import React, { FunctionComponent } from 'react';
import { FlatList, Image, Text, View } from 'react-native';

import FieldLayout from '~/components/layouts/field-layout';
import CardBasic from '~/components/plugins/card-basic';
import { Photo } from '~/constants/models/schedule.model';
import { translate } from '~/lib/translate';

interface SchedulePhotoProps {
  photo?: Photo[];
}

const SchedulePhoto: FunctionComponent<SchedulePhotoProps> = ({ photo }) => {
  if (!photo) {
    return (
      <CardBasic>
        <View className="flex-row items-center justify-center gap-2">
          <Feather name="image" size={24} color="gray" />
          <Text className="text-center text-sm text-gray-500">Không có hình ảnh</Text>
        </View>
      </CardBasic>
    );
  }

  return (
    <CardBasic>
      <FlatList
        data={photo}
        renderItem={({ item }) => <SchedulePhotoItem photo={item} />}
        keyExtractor={(item) => item.id}
        className="gap-2"
        scrollEnabled={false}
        contentContainerStyle={{ gap: 10 }}
        ItemSeparatorComponent={() => <View className="h-2" />}
      />
    </CardBasic>
  );
};

export default SchedulePhoto;

interface SchedulePhotoItemProps {
  photo: Photo;
}

const SchedulePhotoItem: FunctionComponent<SchedulePhotoItemProps> = ({ photo }) => {
  return (
    <FieldLayout
      label={translate.schedule.photo[photo.type as keyof typeof translate.schedule.photo]}>
      <Image source={{ uri: photo.url }} className="h-40 w-full rounded-md" />
    </FieldLayout>
  );
};
