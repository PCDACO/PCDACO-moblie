import * as Slot from '@rn-primitives/slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import {
  Platform,
  Pressable,
  PressableProps,
  View,
  ViewStyle,
  ActivityIndicator,
  AccessibilityState,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { TextClassContext } from '~/components/nativewindui/Text';
import { cn } from '~/lib/cn';
import { useColorScheme } from '~/lib/useColorScheme';
import { COLORS } from '~/theme/colors';

// Enhanced button variants with better feedback states
const buttonVariants = cva('flex-row items-center justify-center gap-2', {
  variants: {
    variant: {
      primary: 'ios:active:opacity-80 bg-primary',
      secondary: 'ios:border-primary ios:active:bg-primary/5 border border-foreground/40',
      tonal:
        'ios:bg-primary/10 dark:ios:bg-primary/10 ios:active:bg-primary/15 bg-primary/15 dark:bg-primary/30',
      plain: 'ios:active:opacity-70',
      outline: 'ios:border-primary ios:active:bg-primary/5 border border-foreground/40',
      link: 'underline',
      default: '',
      // New success and danger variants
      success: 'bg-green-600 ios:active:opacity-80',
      danger: 'bg-red-600 ios:active:opacity-80',
    },
    size: {
      none: '',
      sm: 'py-1 px-2.5 rounded-full',
      md: 'ios:rounded-lg py-2 ios:py-1.5 ios:px-3.5 px-5 rounded-full',
      lg: 'py-2.5 px-5 ios:py-2 rounded-xl gap-2',
      icon: 'ios:rounded-lg h-10 w-10 rounded-full',
      // New full width option
      full: 'py-2.5 px-5 ios:py-2 rounded-xl gap-2 w-full',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

const androidRootVariants = cva('overflow-hidden', {
  variants: {
    size: {
      none: '',
      icon: 'rounded-full',
      sm: 'rounded-full',
      md: 'rounded-full',
      lg: 'rounded-xl',
      full: 'rounded-xl w-full',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

// Enhanced text variants with better contrast
const buttonTextVariants = cva('font-medium', {
  variants: {
    variant: {
      primary: 'text-white',
      secondary: 'ios:text-primary text-foreground',
      tonal: 'ios:text-primary text-foreground',
      plain: 'text-foreground',
      outline: 'ios:text-primary text-foreground',
      link: 'text-primary',
      default: 'text-foreground',
      success: 'text-white',
      danger: 'text-white',
    },
    size: {
      none: '',
      icon: '',
      sm: 'text-[15px] leading-5',
      md: 'text-[17px] leading-7',
      lg: 'text-[17px] leading-7',
      full: 'text-[17px] leading-7',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

function convertToRGBA(rgb: string, opacity: number): string {
  const rgbValues = rgb.match(/\d+/g);
  if (!rgbValues || rgbValues.length !== 3) {
    throw new Error('Invalid RGB color format');
  }
  const red = parseInt(rgbValues[0], 10);
  const green = parseInt(rgbValues[1], 10);
  const blue = parseInt(rgbValues[2], 10);
  if (opacity < 0 || opacity > 1) {
    throw new Error('Opacity must be a number between 0 and 1');
  }
  return `rgba(${red},${green},${blue},${opacity})`;
}

// Enhanced ripple effects for better feedback
const ANDROID_RIPPLE = {
  dark: {
    primary: { color: convertToRGBA(COLORS.dark.grey3, 0.4), borderless: false },
    secondary: { color: convertToRGBA(COLORS.dark.grey5, 0.8), borderless: false },
    plain: { color: convertToRGBA(COLORS.dark.grey5, 0.8), borderless: false },
    tonal: { color: convertToRGBA(COLORS.dark.grey5, 0.8), borderless: false },
    outline: { color: convertToRGBA(COLORS.dark.grey5, 0.8), borderless: false },
    link: { color: convertToRGBA(COLORS.dark.grey5, 0.8), borderless: false },
    default: { color: convertToRGBA(COLORS.dark.grey5, 0.8), borderless: false },
    success: { color: convertToRGBA(COLORS.dark.grey3, 0.4), borderless: false },
    danger: { color: convertToRGBA(COLORS.dark.grey3, 0.4), borderless: false },
  },
  light: {
    primary: { color: convertToRGBA(COLORS.light.grey4, 0.4), borderless: false },
    secondary: { color: convertToRGBA(COLORS.light.grey5, 0.4), borderless: false },
    plain: { color: convertToRGBA(COLORS.light.grey5, 0.4), borderless: false },
    tonal: { color: convertToRGBA(COLORS.light.grey6, 0.4), borderless: false },
    outline: { color: convertToRGBA(COLORS.light.grey5, 0.4), borderless: false },
    link: { color: convertToRGBA(COLORS.light.grey5, 0.4), borderless: false },
    default: { color: convertToRGBA(COLORS.light.grey5, 0.4), borderless: false },
    success: { color: convertToRGBA(COLORS.light.grey4, 0.4), borderless: false },
    danger: { color: convertToRGBA(COLORS.light.grey4, 0.4), borderless: false },
  },
};

// Add as class when possible: https://github.com/marklawlor/nativewind/issues/522
const BORDER_CURVE: ViewStyle = {
  borderCurve: 'continuous',
};

type ButtonVariantProps = Omit<VariantProps<typeof buttonVariants>, 'variant'> & {
  variant?: Exclude<VariantProps<typeof buttonVariants>['variant'], null>;
};

type AndroidOnlyButtonProps = {
  /**
   * ANDROID ONLY: The class name of root responsible for hiding the ripple overflow.
   */
  androidRootClassName?: string;
};

// Enhanced props with loading state and icon positioning
type ButtonProps = PressableProps &
  ButtonVariantProps &
  AndroidOnlyButtonProps & {
    /**
     * Shows a loading spinner inside the button
     */
    isLoading?: boolean;
    /**
     * The color of the loading spinner (defaults to appropriate color for variant)
     */
    loadingColor?: string;
    /**
     * Text to show next to the loading spinner
     */
    loadingText?: React.ReactNode;
    /**
     * Position of the icon relative to text (left or right)
     */
    iconPosition?: 'left' | 'right';
    /**
     * Icon to display in the button
     */
    icon?: React.ReactNode;
    /**
     * Adds a subtle scale animation on press
     */
    withAnimation?: boolean;
  };

const Root = Platform.OS === 'android' ? View : Slot.Pressable;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Button = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size,
      style = BORDER_CURVE,
      androidRootClassName,
      isLoading = false,
      loadingColor,
      loadingText,
      iconPosition = 'left',
      icon,
      withAnimation = false,
      children,
      accessibilityLabel,
      accessibilityHint,
      ...props
    },
    ref
  ) => {
    const { colorScheme } = useColorScheme();
    const scale = useSharedValue(1);

    // Determine loading spinner color based on variant
    const getLoadingColor = () => {
      if (loadingColor) return loadingColor;

      const isLightText = ['primary', 'success', 'danger'].includes(variant);
      return isLightText ? 'white' : COLORS[colorScheme].primary;
    };

    // Handle press animations
    const handlePressIn = () => {
      if (withAnimation && !props.disabled && !isLoading) {
        scale.value = withSpring(0.97, { damping: 10, stiffness: 400 });
      }
    };

    const handlePressOut = () => {
      if (withAnimation && !props.disabled && !isLoading) {
        scale.value = withSpring(1, { damping: 10, stiffness: 400 });
      }
    };

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: scale.value }],
      };
    });

    // Enhanced accessibility state
    const accessibilityState: AccessibilityState = {
      disabled: props.disabled || isLoading,
      busy: isLoading,
      ...props.accessibilityState,
    };

    // Determine content based on loading state and children
    const renderContent = () => {
      if (isLoading) {
        return (
          <>
            <ActivityIndicator size="small" color={getLoadingColor()} className="mr-2" />
            {loadingText}
          </>
        );
      }

      if (icon && children) {
        return (
          <View className="flex-row items-center">
            {iconPosition === 'left' && <View className="mr-2">{icon}</View>}
            {typeof children === 'function'
              ? children({ pressed: false, hovered: false })
              : children}
            {iconPosition === 'right' && <View className="ml-2">{icon}</View>}
          </View>
        );
      }

      if (icon) {
        return icon;
      }

      return children;
    };

    const PressableComponent = withAnimation ? AnimatedPressable : Pressable;

    return (
      <TextClassContext.Provider value={buttonTextVariants({ variant, size })}>
        <Root
          className={Platform.select({
            ios: undefined,
            default: androidRootVariants({
              size,
              className: androidRootClassName,
            }),
          })}>
          <PressableComponent
            className={cn(
              (props.disabled || isLoading) && 'opacity-60',
              buttonVariants({ variant, size, className })
            )}
            ref={ref}
            style={[style, withAnimation && animatedStyle]}
            android_ripple={ANDROID_RIPPLE[colorScheme][variant]}
            accessibilityRole="button"
            accessibilityLabel={accessibilityLabel}
            accessibilityHint={accessibilityHint}
            accessibilityState={accessibilityState}
            disabled={props.disabled || isLoading}
            onPressIn={(e) => {
              handlePressIn();
              props.onPressIn?.(e);
            }}
            onPressOut={(e) => {
              handlePressOut();
              props.onPressOut?.(e);
            }}
            {...props}>
            {renderContent()}
          </PressableComponent>
        </Root>
      </TextClassContext.Provider>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };
