import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Text } from '../ui/text';
import { cn } from '~/lib/utils';

interface IconFieldProps {
  icon: React.ReactNode;
  label: string;
  children?: React.ReactNode;
  className?: string;
}

const IconField: React.FC<IconFieldProps> = ({ icon, label, children, className }) => {
  return (
    <View style={styles.container} className={cn('', className)}>
      <View style={[styles.iconContainer, children ? styles.withChildren : styles.withoutChildren]}>
        {icon}
        <Text style={styles.label}>{label}</Text>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  withChildren: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderRightWidth: 0,
  },
  withoutChildren: {
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
  },
});

export default IconField;
