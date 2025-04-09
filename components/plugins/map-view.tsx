import { Ionicons } from '@expo/vector-icons';
import Mapbox, { MapView, Camera, PointAnnotation } from '@rnmapbox/maps';
import * as Location from 'expo-location';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';

const accessToken = process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN;

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

  const handleMapPress = (event: any) => {
    if (!enabled) return;

    const { coordinates } = event.geometry;
    onLocationSelect({
      latitude: coordinates[1],
      longitude: coordinates[0],
      address: 'Vị trí đã chọn',
    });
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
