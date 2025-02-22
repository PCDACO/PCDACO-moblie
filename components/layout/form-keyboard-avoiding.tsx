import { KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { cn } from '~/lib/utils';

interface FormKeyboardAvoidingProps {
  children: React.ReactNode;
  className?: string;
}

export const FormKeyboardAvoiding: React.FC<FormKeyboardAvoidingProps> = ({
  children,
  className,
}) => {
  return (
    <SafeAreaView className={cn('', className)}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
        <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
