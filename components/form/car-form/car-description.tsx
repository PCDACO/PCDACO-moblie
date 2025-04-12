import { Entypo } from '@expo/vector-icons';
import { FunctionComponent } from 'react';
import { Controller } from 'react-hook-form';
import { View, TextInput, Text } from 'react-native';

import CardBasic from '~/components/plugins/card-basic';
import Description from '~/components/screens/car-editor/description';
import Subtitle from '~/components/screens/car-editor/subtitle';
import { useCarForm } from '~/hooks/car/use-car-form';

interface CarDescriptionProps {
  form: ReturnType<typeof useCarForm>['form'];
}

const CarDescription: FunctionComponent<CarDescriptionProps> = ({ form }) => {
  return (
    <View className=" px-2 py-4 ">
      <CardBasic className="gap-4">
        <Subtitle title="Mô tả xe" />
        <Description
          title="Mô tả chi tiết về xe của bạn để người thuê hiểu rõ hơn về xe."
          className="text-sm"
        />
        <View>
          <Controller
            control={form.control}
            name="description"
            render={({ field: { value, onChange } }) => (
              <TextInput
                value={value || form.watch('description')}
                onChangeText={onChange}
                placeholder="Mô tả chi tiết về xe của bạn ..."
                className="rounded-lg border border-gray-200 placeholder:p-4 placeholder:text-base dark:border-gray-800"
                multiline
                numberOfLines={10}
                textAlignVertical="top"
              />
            )}
          />
          {form.formState.errors.description && (
            <Text className="text-red-500">{form.formState.errors.description.message}</Text>
          )}
        </View>

        <View className="gap-4">
          <Subtitle title="Gợi ý mô tả" />
          <View className="gap-2">
            <View className="flex-row items-center gap-2">
              <Entypo name="dot-single" />
              <Description
                title="Tình trạng xe (mới, đã qua sử dụng, năm sản xuất)"
                className="text-sm"
              />
            </View>
            <View className="flex-row items-center gap-2">
              <Entypo name="dot-single" />
              <Description title="Đặc điểm nổi bật của xe" className="text-sm" />
            </View>
            <View className="flex-row items-center gap-2">
              <Entypo name="dot-single" />
              <Description title="Lịch sử bảo dưỡng, sửa chữa" className="text-sm" />
            </View>
            <View className="flex-row items-center gap-2">
              <Entypo name="dot-single" />
              <Description title="Trải nghiệm lái xe" className="text-sm" />
            </View>
          </View>
        </View>
      </CardBasic>
    </View>
  );
};

export default CarDescription;
