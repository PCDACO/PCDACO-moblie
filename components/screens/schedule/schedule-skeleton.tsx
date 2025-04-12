import { View, StyleSheet } from 'react-native';

import Skeleton from '~/components/nativewindui/Skeleton';

const ScheduleSkeleton = () => {
  return (
    <View style={styles.container}>
      {Array.from({ length: 4 }).map((_, idx) => (
        <View key={idx} style={styles.card}>
          <Skeleton width="50%" height={14} style={styles.title} />
          <Skeleton width="70%" height={12} style={styles.subtitle} />
          <Skeleton width="40%" height={12} style={styles.time} />
        </View>
      ))}
    </View>
  );
};

export default ScheduleSkeleton;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 6,
  },
  time: {},
});
