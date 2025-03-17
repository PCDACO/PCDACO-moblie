import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useStepStore } from '~/store/use-step';

const CarsScreen = () => {
  const router = useRouter();
  const { resetStep } = useStepStore();

  return (
    <SafeAreaView className="relative h-full">
      <View className="relative h-full ">
        <Text>CarsScreen</Text>
      </View>

      <TouchableOpacity
        className="absolute bottom-4 right-4 size-10 items-center justify-center rounded-full bg-blue-500"
        onPress={() => {
          resetStep();
          router.push({
            pathname: '/cars/edit',
          });
        }}>
        <Feather name="plus" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CarsScreen;
