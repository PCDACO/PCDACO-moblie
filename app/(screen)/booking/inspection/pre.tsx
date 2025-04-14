import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { FunctionComponent } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import PreForm from '~/components/form/inspection-form/pre/pre-form';
import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
import Loading from '~/components/plugins/loading';
import PreInspectionHeader from '~/components/screens/pre-inspection-edit/pre-inspection-header';
import { usePreInspectionForm } from '~/hooks/book/use-pre-inspection-form';
import { COLORS } from '~/theme/colors';

const PreInspection: FunctionComponent = () => {
  const { bookId } = useLocalSearchParams();
  const { form, onSubmit, isLoading } = usePreInspectionForm({ id: bookId as string });

  return (
    <SafeAreaView className="relative flex-1 bg-blue-50 dark:bg-blue-950">
      <PreInspectionHeader />

      <View className="flex-1 px-4">
        <ScrollView showsVerticalScrollIndicator={false}>
          <PreForm form={form} />
        </ScrollView>
      </View>

      <View className="absolute bottom-0 left-0 right-0 bg-white p-4 dark:bg-blue-950">
        <Button
          size="lg"
          className="flex-row items-center justify-center gap-2"
          onPress={onSubmit}
          disabled={isLoading}>
          {isLoading ? (
            <>
              <Loading size="small" />
              <Text>Đang gửi...</Text>
            </>
          ) : (
            <>
              <Feather name="check" color={COLORS.white} size={20} />
              <Text>Gửi kiểm tra trước</Text>
            </>
          )}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default PreInspection;
