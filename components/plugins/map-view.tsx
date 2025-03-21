import { Ionicons } from '@expo/vector-icons';
import Mapbox, { MapView, Camera, PointAnnotation } from '@rnmapbox/maps';
import * as Location from 'expo-location';
import React from 'react';
import { ToastAndroid } from 'react-native';

const accessToken =
  'pk.eyJ1IjoiYW5odGh0MTM4IiwiYSI6ImNtOGExOHI2bDEwb2cybHF1M2l4aWxnNmsifQ.zqi0B4G5-tDF2HG0qSTk3Q';

Mapbox.setAccessToken(accessToken);

export const MapComponent = () => {
  const [location, setLocation] = React.useState<Location.LocationObject | null>(null);

  React.useEffect(() => {
    async function getCurrentLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        ToastAndroid.show('Xin hãy cấp quyền truy cập vị trí', ToastAndroid.SHORT);
        return;
      }

      const response = await Location.getCurrentPositionAsync({});
      setLocation(response);
    }

    getCurrentLocation();
  }, []);

  return (
    <MapView style={{ flex: 1, position: 'relative' }}>
      <Camera
        zoomLevel={12}
        centerCoordinate={[location?.coords?.longitude || 0, location?.coords?.latitude || 0]}
      />
      {location && (
        <PointAnnotation
          id="currentLocation"
          coordinate={[location.coords.longitude, location.coords.latitude]}
          title="Current Location">
          <Ionicons name="location-sharp" size={24} color="red" />
        </PointAnnotation>
      )}
    </MapView>
  );
};
