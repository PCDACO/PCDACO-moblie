import { Feather } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import LicensesImageForm from '~/components/form/auth-form/register/licenses-image-form';
import LicensesUserForm from '~/components/form/auth-form/register/licenses-user-form';
import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
import Header from '~/components/plugins/header';
import LicenseFormSkeleton from '~/components/screens/license/license-sekeleton';
import { useLicensesListQuery } from '~/hooks/license/use-license';
import { useLicenseForm } from '~/hooks/license/use-license-form';

const LicenseEdit = () => {
  const { data, isLoading: isLoadingList } = useLicensesListQuery();
  const [isEdit, setIsEdit] = React.useState(false);

  const { form, onSubmit, isLoading } = useLicenseForm({
    id: data?.value?.userId,
  });

  React.useEffect(() => {
    form.reset();
    if (data && data.value) {
      form.setValue('licenseNumber', data.value.licenseNumber || '');
      form.setValue('expirationDate', new Date(data.value.expirationDate) || undefined);
      form.setValue('licenseImageFront', undefined);
      form.setValue('licenseImageBack', undefined);
    }
  }, [data]);

  if (isLoadingList) {
    return (
      <SafeAreaView className="h-full flex-1 bg-slate-50 dark:bg-slate-800">
        <Header title="Đang tải bằng lái..." />
        <LicenseFormSkeleton />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <View className="relative h-screen bg-slate-50 dark:bg-slate-800">
        <Header title={data?.value?.userId ? 'Chỉnh sửa bằng lái xe' : 'Thêm bằng lái xe'}>
          {data?.value?.userId && (
            <Feather
              name="edit"
              size={24}
              color={isEdit ? 'blue' : 'gray'}
              onPress={() => setIsEdit(!isEdit)}
            />
          )}
        </Header>
        <ScrollView className="h-screen ">
          {/* form */}
          <View
            className="w-full gap-6 p-2"
            style={{
              paddingBottom: 50,
            }}>
            <LicensesUserForm form={form} id={data?.value?.userId} isEdit={isEdit} />
            <LicensesImageForm form={form} id={data?.value?.userId} isEdit={isEdit} />
          </View>
        </ScrollView>
        {(isEdit || !data?.value?.userId) && (
          <View className="absolute bottom-2 left-8 right-8">
            <Button onPress={onSubmit} disabled={isLoading}>
              <Text>{isLoading ? 'Đang xử lý...' : 'Xác nhận'}</Text>
            </Button>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default LicenseEdit;
