import { LucideIcon } from 'lucide-react-native';
import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  placeholder?: string;
  icon?: LucideIcon;
  required?: boolean;
}

const Input: React.FC<InputProps> = (props) => {
  const { label, placeholder, icon: Icon, required } = props;

  return (
    <View>
      <Text className="text-sm font-medium">
        {label}
        {required && <Text className="text-destructive">*</Text>}
      </Text>
      <View className="mt-1 flex-row items-center rounded-lg border border-gray-300 px-3 py-1">
        {Icon && <Icon size={18} className="text-muted-foreground" />}
        {/* <Controller /> */}
        <TextInput placeholder={placeholder} className="ml-2 flex-1 text-foreground" {...props} />
      </View>
    </View>
  );
};

export default Input;
