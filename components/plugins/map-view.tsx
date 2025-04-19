import { Ionicons } from '@expo/vector-icons';
import Mapbox, { MapView, Camera, PointAnnotation } from '@rnmapbox/maps';
import * as Location from 'expo-location';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';

const accessToken = process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN;
const GeoApifyUrl = process.env.EXPO_PUBLIC_GEOAPIFY_URL;
const GeoApify = process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY;

Mapbox.setAccessToken(accessToken ?? '');

interface MapComponentProps {
  onLocationSelect: (location: { latitude: number; longitude: number; address: string }) => void;
  selectedLocation: Partial<{
    latitude: number;
    longitude: number;
    address: string;
  }> | null;
  enabled?: boolean;
  pointerEvents?: 'none' | 'auto' | 'box-none' | 'box-only';
}

export const MapComponent: FunctionComponent<MapComponentProps> = ({
  onLocationSelect,
  selectedLocation,
  enabled = true,
  pointerEvents = 'auto',
}) => {
  const mapRef = useRef<MapView>(null);
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [region, setRegion] = useState({
    latitude: 10.762622,
    longitude: 106.660172,
    zoomLevel: 12,
  });

  // Get current location
  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const newLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      setCurrentLocation(newLocation);
      setRegion({
        ...newLocation,
        zoomLevel: 12,
      });
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  // Initial location fetch
  useEffect(() => {
    getCurrentLocation();
  }, []);

  // Watch location updates
  useEffect(() => {
    let locationSubscription: Location.LocationSubscription | null = null;

    const startWatchingLocation = async () => {
      try {
        locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 5000,
            distanceInterval: 10,
          },
          (location) => {
            const newLocation = {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            };
            setCurrentLocation(newLocation);
            if (!selectedLocation) {
              setRegion({
                ...newLocation,
                zoomLevel: 12,
              });
            }
          }
        );
      } catch (error) {
        console.error('Error watching location:', error);
      }
    };

    startWatchingLocation();

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, [selectedLocation]);

  // Update region when selected location changes
  useEffect(() => {
    if (selectedLocation) {
      setRegion({
        latitude: selectedLocation.latitude ?? 10.762622,
        longitude: selectedLocation.longitude ?? 106.660172,
        zoomLevel: 12,
      });
    }
  }, [selectedLocation]);

  const handleMapPress = async (event: any) => {
    if (!enabled) return;

    const { coordinates } = event.geometry;
    const latitude = coordinates[1];
    const longitude = coordinates[0];

    try {
      // Reverse geocode to get address
      const response = await fetch(
        `${GeoApifyUrl}/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${GeoApify}`
      );
      const data = await response.json();

      let address = 'Vị trí đã chọn';
      if (data.results && data.results.length > 0) {
        const result = data.results[0];
        const parts = [];
        if (result.name) parts.push(result.name);
        if (result.street) parts.push(result.street);
        if (result.district) parts.push(result.district);
        if (result.city) parts.push(result.city);
        if (result.state) parts.push(result.state);
        if (result.country) parts.push(result.country);
        address = parts.join(', ');
      }

      onLocationSelect({
        latitude,
        longitude,
        address,
      });
    } catch (error) {
      console.error('Error getting address:', error);
      onLocationSelect({
        latitude,
        longitude,
        address: 'Vị trí đã chọn',
      });
    }
  };

  return (
    <View style={styles.container} pointerEvents={pointerEvents}>
      <MapView
        ref={mapRef}
        style={styles.map}
        onPress={handleMapPress}
        scrollEnabled={enabled}
        rotateEnabled={enabled}
        pitchEnabled={enabled}
        zoomEnabled={enabled}>
        <Camera
          zoomLevel={region.zoomLevel}
          centerCoordinate={[region.longitude, region.latitude]}
          animationMode="none"
          animationDuration={0}
        />
        {currentLocation && (
          <PointAnnotation
            id="currentLocation"
            coordinate={[currentLocation.longitude, currentLocation.latitude]}
            title="Vị trí hiện tại">
            <Ionicons name="location-sharp" size={24} color="blue" />
          </PointAnnotation>
        )}
        {selectedLocation && (
          <PointAnnotation
            id="selectedLocation"
            coordinate={[
              selectedLocation.longitude ?? 106.660172,
              selectedLocation.latitude ?? 10.762622,
            ]}
            title={selectedLocation.address}>
            <Ionicons name="location-sharp" size={24} color="red" />
          </PointAnnotation>
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
