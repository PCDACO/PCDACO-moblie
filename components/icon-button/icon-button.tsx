import { LucideIcon } from 'lucide-react-native';
import React, { forwardRef } from 'react';
import { PressableProps, Text, View } from 'react-native';

import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';

type ButtonIconProps = PressableProps & {
  icon: LucideIcon;
  label?: string;
  iconSize?: number;
  iconColor?: string;
  className?: string;
};

const ButtonIcon = forwardRef<View, ButtonIconProps>(
  ({ icon: Icon, label, iconSize = 24, iconColor = 'black', className, ...props }, ref) => {
    return (
      <Button ref={ref} className={cn(className)} {...props}>
        <Icon size={iconSize} color={iconColor} />
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
