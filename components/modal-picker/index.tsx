import { LucideIcon } from 'lucide-react-native';
import React from 'react';
import { Modal, StyleProp, Text, View, ViewStyle } from 'react-native';

import ButtonIcon from '../icon-button/icon-button';
import { Button } from '../ui/button';

import { CircleX } from '~/lib/icons/icon';
import { cn } from '~/lib/utils';

interface ModelPickerProps {
  label?: string | React.ReactNode;
  icon?: LucideIcon;
  children?: React.ReactNode;
  title?: string;
  fill?: string;
  onPress?: () => void;
  submitText?: string;
  className?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  style?: StyleProp<ViewStyle>;
}

interface HeaderModelProps {
  title?: string;
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderModel: React.FC<HeaderModelProps> = ({ title, setClose }) => {
  return (
    <View className="relative flex-row items-center justify-center border-b border-border bg-background p-4">
      <Text className=" text-2xl font-semibold text-foreground">{title}</Text>
      <CircleX
        className="absolute right-4 top-4 text-muted-foreground"
        onPress={() => setClose(false)}
      />
    </View>
  );
};

const ModelPicker: React.FC<ModelPickerProps> = ({
  label,
  icon,
  children,
  title,
  onPress,
  submitText,
  className,
  fill,
  style,
  variant = 'default',
}) => {
  const [isModelPickerVisible, setIsModelPickerVisible] = React.useState(false);
  return (
    <View className={cn(className)}>
      <ButtonIcon
        icon={icon}
        label={label}
        variant={variant}
        style={style}
        fill={fill}
        onPress={() => {
          setIsModelPickerVisible(true);
        }}
      />
      <Modal
        className="relative"
        visible={isModelPickerVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => {
          setIsModelPickerVisible(false);
        }}>
        <HeaderModel title={title} setClose={setIsModelPickerVisible} />
        <View className="px-8 py-4">{children}</View>
        <View className="absolute bottom-0 w-full p-4 ">
          <Button
            onPress={() => {
              onPress && onPress();
              setIsModelPickerVisible(false);
            }}>
            <Text className="text-background">{submitText}</Text>
          </Button>
        </View>
      </Modal>
    </View>
  );
};

export default ModelPicker;
