import { Entypo } from '@expo/vector-icons';
import React, { FunctionComponent } from 'react';
import { Controller } from 'react-hook-form';
import { Text, View, TextInput } from 'react-native';

import FieldLayout from '~/components/layouts/field-layout';
import { Input } from '~/components/layouts/input-with-icon';
import CardBasic from '~/components/plugins/card-basic';
// import { Switch } from '~/components/nativewindui/Switch';
import Description from '~/components/screens/car-editor/description';
import Subtitle from '~/components/screens/car-editor/subtitle';
import { useCarForm } from '~/hooks/car/use-car-form';
import { formatNumber } from '~/lib/utils';

interface CarPriceTermProps {
  form: ReturnType<typeof useCarForm>['form'];
}

const CarPriceTerm: FunctionComponent<CarPriceTermProps> = ({ form }) => {
  React.useEffect(() => {
    form.setValue('requiresCollateral', true);
  }, []);

  return (
    <View className="  px-2 py-4 ">
      <CardBasic className="gap-4">
        <Subtitle title="Giá thuê" />
        <FieldLayout label="Giá thuê mỗi ngày (VNĐ)">
          <Controller
            control={form.control}
            name="price"
            render={({ field: { value, onChange } }) => (
              <Input
                value={
                  value
                    ? formatNumber(value)
                    : form.watch('price')
                      ? formatNumber(form.watch('price'))
                      : ''
                }
                onChangeText={(text) => {
                  const numericValue = text.replace(/\D/g, '');
                  onChange(Number(numericValue));
                }}
                placeholder="Nhập giá thuê"
                keyboardType="numeric"
              />
            )}
          />
          {form.formState.errors.price && (
            <Text className="text-red-500">{form.formState.errors.price.message}</Text>
          )}
        </FieldLayout>

        {/* <View className="flex-row items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-800">
        <View>
          <Text className="text-lg font-bold">Yêu cầu thế chấp</Text>
          <Description className="text-sm" title="Người thuê cần đặt cọc khi thuê xe" />
        </View>
        <View>
          <Controller
            control={form.control}
            name="requiresCollateral"
            render={({ field: { value, onChange } }) => (
              <Switch
                checked={value || form.watch('requiresCollateral')}
                onCheckedChange={onChange}
              />
            )}
          />
        </View>
      </View> */}
        <Subtitle title="Điều khoản" />
        <Description
          className="text-sm"
          title="Thiết lập các điều khoản và quy định khi cho thuê xe của bạn."
        />
        <Controller
          control={form.control}
          name="terms"
          render={({ field: { value, onChange } }) => (
            <TextInput
              value={value || form.watch('terms')}
              onChangeText={onChange}
              placeholder="Nhập điều khoản và quy định cho thuê xe của bạn ..."
              className="rounded-lg border border-gray-200 placeholder:p-4 placeholder:text-base dark:border-gray-800"
              multiline
              numberOfLines={10}
              textAlignVertical="top"
            />
          )}
        />
        {form.formState.errors.terms && (
          <Text className="text-red-500">{form.formState.errors.terms.message}</Text>
        )}

        <Subtitle title="Gợi ý điều khoản" />
        <View className="gap-1">
          <View className="flex-row items-center gap-1">
            <Entypo name="dot-single" />
            <Description
              title="Quy định về thời gian và địa điểm giao nhận xe"
              className="text-sm"
            />
          </View>
          <View className="flex-row items-center gap-1">
            <Entypo name="dot-single" />
            <Description title="Quy định về giới hạn số km mỗi ngày" className="text-sm" />
          </View>
          <View className="flex-row items-center gap-1">
            <Entypo name="dot-single" />
            <Description title="Quy định về việc trả xe muộn" className="text-sm" />
          </View>
          <View className="flex-row items-center gap-1">
            <Entypo name="dot-single" />
            <Description title="Quy định về việc hủy đặt xe" className="text-sm" />
          </View>
        </View>
      </CardBasic>
    </View>
  );
};

export default CarPriceTerm;
