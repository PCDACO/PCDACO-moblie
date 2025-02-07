import { LucideIcon } from 'lucide-react-native';
import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { View, TextInput, Text, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  control: Control<any>;
  name: string;
  icon: LucideIcon;
  placeholder?: string;
  error?: string;
  label?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  control,
  name,
  icon: Icon,
  placeholder,
  error,
  ...rest
}) => {
  return (
    <View>
      {label && <Text className="text-sm font-medium">{label}</Text>}
      <View className="mt-1 flex-row items-center rounded-lg border border-muted-foreground px-3 py-2">
        <Icon size={18} className="text-muted-foreground" />
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder={placeholder}
              className="ml-2 flex-1 text-foreground"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              {...rest}
            />
          )}
        />
      </View>
      {error && <Text className="text-xs text-destructive">{error}</Text>}
    </View>
  );
};

export default Input;
