import { Feather, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { FunctionComponent } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

import DocumentPickerButton from '~/components/plugins/document-picker';
import Description from '~/components/screens/car-editor/description';
import Subtitle from '~/components/screens/car-editor/subtitle';
import { useCarForm } from '~/hooks/car/use-car-form';
import { convertAssertToFile } from '~/lib/convert';
import { COLORS } from '~/theme/colors';

interface VehicleRegistrationProps {
  form: ReturnType<typeof useCarForm>['form'];
}

export interface DocumentItemProps {
  nameFile: string;
  paperImages: string;
}

export const DocumentItem = ({ nameFile, paperImages }: DocumentItemProps) => {
  const router = useRouter();

  return (
    <View className="flex-row items-center justify-between gap-2 rounded-lg border border-primary p-4">
      <View className="flex-1 flex-row items-center gap-2">
        <FontAwesome name="file-pdf-o" size={20} color={COLORS.light.primary} />
        <Text numberOfLines={1} ellipsizeMode="tail" className="flex-1">
          {nameFile}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => router.push(`/cars/pdf?url=${paperImages}&name=${nameFile}`)}>
        <Feather name="eye" size={20} color={COLORS.light.primary} />
      </TouchableOpacity>
    </View>
  );
};

const VehicleRegistration: FunctionComponent<VehicleRegistrationProps> = ({ form }) => {
  const [documentSelected, setDocumentSelected] = React.useState<DocumentItemProps[]>([]);

  React.useEffect(() => {
    if (form.watch('paperImages')) {
      setDocumentSelected(
        form.watch('paperImages').map((item) => ({ nameFile: item.name, paperImages: item.uri }))
      );
    }
  }, [form.watch('paperImages')]);

  return (
    <View className="gap-6 bg-white px-2 pt-4 dark:bg-gray-900">
      <Subtitle title="Thêm hình ảnh giấy tờ xe" />
      <Description
        title="Hãy chụp ảnh giấy tờ xe của bạn để xác minh thông tin."
        className="text-sm"
      />

      <View className="gap-4">
        {documentSelected.length > 0 && (
          <TouchableOpacity
            className="flex-row items-center justify-center gap-2 rounded-lg border border-red-500 p-2"
            onPress={() => {
              setDocumentSelected([]);
              form.setValue('paperImages', []);
            }}>
            <Feather name="trash-2" size={20} color="red" />
            <Text className="text-red-500">Dọn dẹp giấy tờ xe</Text>
          </TouchableOpacity>
        )}
        <FlatList
          data={documentSelected}
          renderItem={({ item }) => (
            <DocumentItem nameFile={item.nameFile} paperImages={item.paperImages} />
          )}
          keyExtractor={(item) => item.nameFile}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View className="h-2" />}
        />
        {documentSelected.length === 0 && (
          <DocumentPickerButton
            onChange={(files) => {
              const pdfFiles = files.filter((file) => convertAssertToFile(file));

              setDocumentSelected(
                files.map((file) => ({ nameFile: file.name, paperImages: file.uri }))
              );
              if (pdfFiles.length > 0) {
                form.setValue('paperImages', pdfFiles);
              }
            }}
            contextInput={
              <View className=" items-center gap-2 py-4">
                <Feather name="camera" size={20} color="black" />
                <View className="items-center ">
                  <Subtitle title="Chọn giấy tờ xe" />
                  <Description
                    className="text-sm"
                    title="tối thiểu 1 giấy tờ xe (chỉ nhận file.pdf)"
                  />
                </View>
              </View>
            }
          />
        )}
        {form.formState.errors.paperImages && (
          <Text className="text-red-500">{form.formState.errors.paperImages.message}</Text>
        )}
      </View>

      <View className="gap-4">
        <Subtitle title="Giấy tờ cần thiết" />
        <View className="gap-2">
          <View className="flex-row items-center gap-2">
            <Feather name="check-circle" size={24} color="green" />
            <Description title="Giấy đăng ký xe (bắt buộc)" className="text-sm" />
          </View>
          <View className="flex-row items-center gap-2">
            <Feather name="check-circle" size={24} color="green" />
            <Description title="Giấy đăng kiểm xe (bắt buộc)" className="text-sm" />
          </View>
          <View className="flex-row items-center gap-2">
            <Feather name="check-circle" size={24} color="green" />
            <Description title="Bảo hiểm xe (bắt buộc)" className="text-sm" />
          </View>
        </View>
      </View>

      <View>
        <Subtitle title="Lưu ý" />
        <Description
          title="Khi bạn thay đổi giấy tờ xe, hệ thống sẽ xóa hết giấy tờ cũ và chỉ lưu giấy tờ mới"
          className="text-sm"
        />
      </View>
    </View>
  );
};

export default VehicleRegistration;
