import { LucideIcon } from 'lucide-react-native';
import { Text, View } from 'react-native';

const FeatureItem = ({ icon: Icon, text }: { icon: LucideIcon; text: string }) => {
  return (
    <View className=" flex-row items-center gap-4">
      <Icon className="text-primary" size={20} />
      <Text className="text-base text-gray-800">{text}</Text>
    </View>
  );
};

export default FeatureItem;
