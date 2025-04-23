import { Ionicons } from '@expo/vector-icons';
import Mapbox, { MapView, Camera, PointAnnotation } from '@rnmapbox/maps';
import { useLocalSearchParams } from 'expo-router';
import React, { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';

import { CarLocationResponse } from '~/constants/models/car.model';
import { useGetLocationCar } from '~/hooks/plugins/use-get-location';

const accessToken = process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN;

Mapbox.setAccessToken(accessToken ?? '');

const MapViewScreen: FunctionComponent = () => {
  const { id } = useLocalSearchParams();
  const [location, setLocation] = React.useState<CarLocationResponse>();

  useGetLocationCar(id as string, (value) => {
    setLocation(value);
  });

  const mapRef = React.useRef<MapView>(null);

  return (
    <View style={styles.container}>
      <MapView ref={mapRef} style={styles.map}>
        {location && (
          <Camera
            zoomLevel={12}
            centerCoordinate={[location.longitude, location.latitude]}
            animationMode="none"
            animationDuration={0}
          />
        )}
        {location && (
          <PointAnnotation
            id="currentLocation"
            coordinate={[location.longitude, location.latitude]}
            title="Vị trí hiện tại">
            <Ionicons name="location-sharp" size={24} color="blue" />
          </PointAnnotation>
        )}
      </MapView>
    </View>
  );
};

export default MapViewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
