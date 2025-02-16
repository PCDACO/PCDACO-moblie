import { LucideIcon } from 'lucide-react-native';
import React, { forwardRef } from 'react';
import { PressableProps, Text, View } from 'react-native';

import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';

type ButtonIconProps = PressableProps & {
  icon?: LucideIcon;
  label?: string;
  iconSize?: number;
  iconColor?: string;
  className?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  fill?: string;
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
      ...props
    },
    ref
  ) => {
    return (
      <Button ref={ref} className={cn('flex-row ', className)} {...props} variant={variant}>
        {Icon && <Icon size={iconSize} color={iconColor} fill={fill} />}
        {label && (
          <Text
            style={{
              marginLeft: 8,
              color: 'white',
              fontSize: 16,
            }}>
            {label}
          </Text>
        )}
      </Button>
    );
  }
);

export default ButtonIcon;
