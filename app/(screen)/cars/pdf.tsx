import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import Pdf from 'react-native-pdf';

const PdfScreen = () => {
  const { url, name } = useLocalSearchParams();

  const router = useRouter();

  return (
    <View className=" flex-1">
      <View className="bg-primary/45 h-16 flex-row items-end justify-between gap-2 px-4 py-4">
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <View className="w-40">
          <Text className="text-foreground" numberOfLines={1} ellipsizeMode="tail">
            {name}
          </Text>
        </View>
        <View />
      </View>
      <View className="flex-1">
        <Pdf
          source={{ uri: url as string, cache: true }}
          trustAllCerts={false}
          style={{
            flex: 1,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
          }}
        />
      </View>
    </View>
  );
};

export default PdfScreen;
