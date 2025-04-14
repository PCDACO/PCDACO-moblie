import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { FunctionComponent } from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import PostForm from '~/components/form/inspection-form/post/post-form';
import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
import Loading from '~/components/plugins/loading';
import PostInspectionHeader from '~/components/screens/post-inspection-edit/post-inspection-header';
import { usePostInspectionForm } from '~/hooks/book/use-post-inspection-form';
import { COLORS } from '~/theme/colors';

const PostInspection: FunctionComponent = () => {
  const { bookId } = useLocalSearchParams();
  const { form, onSubmit, isLoading } = usePostInspectionForm(bookId as string);

  return (
    <SafeAreaView className="relative flex-1 bg-blue-50 dark:bg-blue-950">
      <PostInspectionHeader />

      <View className="flex-1 px-4">
        <ScrollView showsVerticalScrollIndicator={false}>
          <PostForm form={form} />
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

export default PostInspection;
