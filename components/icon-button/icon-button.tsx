import { LucideIcon } from 'lucide-react-native';
import React, { forwardRef } from 'react';
import { PressableProps, Text, View, StyleProp, ViewStyle } from 'react-native';

import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';

type ButtonIconProps = PressableProps & {
  icon?: LucideIcon;
  label?: string | React.ReactNode;
  iconSize?: number;
  iconColor?: string;
  className?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  fill?: string;
  style?: StyleProp<ViewStyle>;
};

const ButtonIcon = forwardRef<View, ButtonIconProps>(
  (
    {
      icon: Icon,
      variant = 'default',
      label,
      iconSize = 24,
      iconColor = 'black',
      className,
      fill = 'white',
      style,
      ...props
    },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        className={cn('flex-row gap-2', className)}
        {...props}
        variant={variant}
        style={style}>
        {Icon && <Icon size={iconSize} color={iconColor} fill={fill} />}
        {label && typeof label === 'string' && (
          <Text className="ml-2 text-background">{label}</Text>
        )}
        {label && typeof label !== 'string' && label}
      </Button>
    );
  }
);

export default ButtonIcon;
