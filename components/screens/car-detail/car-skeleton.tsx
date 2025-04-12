import { View, StyleSheet } from 'react-native';

import Skeleton from '~/components/nativewindui/Skeleton';

const CarDetailSkeleton = () => {
  return (
    <View style={styles.container}>
      <View style={styles.image} />
      <View style={styles.tabContent}>
        <Skeleton width="60%" height={16} style={styles.item} />
        <Skeleton width="80%" height={14} style={styles.item} />
        <Skeleton width="40%" height={14} style={styles.item} />
        <Skeleton width="100%" height={14} style={styles.item} />
        <Skeleton width="90%" height={14} style={styles.item} />
        <Skeleton width="50%" height={14} style={styles.item} />
        <Skeleton width="80%" height={14} style={styles.item} />
      </View>
    </View>
  );
};

export default CarDetailSkeleton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  image: {
    height: 200,
    backgroundColor: '#e5e7eb',
  },
  tabContent: {
    padding: 16,
    gap: 12,
  },
  item: {
    borderRadius: 8,
  },
});
