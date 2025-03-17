import { Feather } from '@expo/vector-icons';
import React, { FunctionComponent } from 'react';
import { Text, View } from 'react-native';

import DocumentPickerButton from '~/components/plugins/document-picker';
import Description from '~/components/screens/car-editor/description';
import Subtitle from '~/components/screens/car-editor/subtitle';
import { useCarForm } from '~/hooks/car/use-car-form';
import { convertAssertToFile } from '~/lib/convert';

interface VehicleRegistrationProps {
  form: ReturnType<typeof useCarForm>['form'];
}

const VehicleRegistration: FunctionComponent<VehicleRegistrationProps> = ({ form }) => {
  const [paperImages, setPaperImages] = React.useState<string[]>();

  return (
    <View className="gap-6">
      <Subtitle title="Thêm hình ảnh giấy tờ xe" />
      <Description
        title="Hãy chụp ảnh giấy tờ xe của bạn để xác minh thông tin."
        className="text-sm"
      />

      <View>
        <DocumentPickerButton
          onChange={(files) => {
            // const pdfFiles = files.filter((file) => convertAssertToFile(file));
            setPaperImages(files.map((file) => file.uri));
          }}
          contextInput={
            <View className=" items-center gap-2 py-4">
              <Feather name="camera" size={24} color="black" />
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
