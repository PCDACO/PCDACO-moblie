import { StyleProp, ViewStyle, GestureResponderEvent } from 'react-native';

import SendEmail from '~/assets/svg/SendEmail.svg';
import Car from '~/assets/svg/car.svg';

export const Icon = {
  SendEmail,
  Car,
};

export type IconName = keyof typeof Icon;

interface IconProps {
  name: IconName;
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
  width?: number;
  height?: number;
  color?: string;
  [key: string]: any;
}

export const IconComponent = ({
  name,
  style,
  onPress,
  width,
  height,
  color,
  ...props
}: IconProps) => {
  const SvgIcon = Icon[name];
  return (
    <SvgIcon
      style={style}
      onPress={onPress}
      width={width}
      height={height}
      color={color}
      {...props}
    />
  );
};
