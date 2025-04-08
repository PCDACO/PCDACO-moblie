import { useRouter } from 'expo-router';
import React, { FunctionComponent } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { AddressSuggestions } from '~/components/plugins/address-suggestions';
import { MapComponent } from '~/components/plugins/map-view';
import { SearchInput } from '~/components/plugins/search-input';
import { useLocationStore } from '~/store/use-location';
import { useSearchStore } from '~/store/use-search';

const accessToken = process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN;

const GeoApify = '102afaeaecf440baaaadfb78f8036389';

const MapScreen: FunctionComponent = () => {
  const router = useRouter();
  const setSelectedLocation = useLocationStore((state) => state.setSelectedLocation);
  const [tempLocation, setTempLocation] = React.useState<{
    latitude: number;
    longitude: number;
    address: string;
  } | null>(null);
  const [suggestions, setSuggestions] = React.useState<
    {
      address: string;
      latitude: number;
      longitude: number;
    }[]
  >([]);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const searchKeyword = useSearchStore((state) => state.searchKeyword);

  // Format address from feature
  const formatAddress = (feature: any): string => {
    if (!feature) return '';

    // For POIs and businesses, prioritize their names
    const placeName = feature.text || '';
    const properties = feature.properties || {};
    const address = feature.address || '';

    // Get all context elements
    const context = feature.context || [];
    const streetNumber = feature.address || '';
    const street = feature.text || '';
    const district = context.find((c: any) => c.id.includes('district'))?.text || '';
    const commune = context.find((c: any) => c.id.includes('neighborhood'))?.text || '';
    const city = context.find((c: any) => c.id.includes('place'))?.text || '';
    const region = context.find((c: any) => c.id.includes('region'))?.text || '';

    // If it's a POI or business
    if (feature.place_type?.includes('poi')) {
      const parts = [placeName];
      if (address) parts.push(address);
      if (street && street !== placeName) parts.push(street);
      if (commune) parts.push(commune);
      if (district) parts.push(district);
      if (city) parts.push(city);
      if (region) parts.push(region);
      return parts.join(', ');
    }

    // For regular addresses
    const parts = [];
    if (streetNumber) parts.push(streetNumber);
    if (street && !parts.includes(street)) parts.push(street);
    if (commune) parts.push(commune);
    if (district) parts.push(district);
    if (city) parts.push(city);
    if (region) parts.push(region);

    return parts.join(', ');
  };

  // Handle search location
  React.useEffect(() => {
    async function searchAddress() {
      if (!searchKeyword) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
            searchKeyword
          )}&format=json&filter=countrycode:vn&bias=proximity:106.6297,10.8231&limit=10&apiKey=${GeoApify}`
        );

        const data = await response.json();

        if (data.results && data.results.length > 0) {
          const newSuggestions = data.results.map((result: any) => ({
            address: formatGeoapifyAddress(result),
            latitude: result.lat,
            longitude: result.lon,
            placeName: result.formatted,
            placeType: result.result_type,
          }));

          setSuggestions(newSuggestions);
          setShowSuggestions(true);
        } else {
          setSuggestions([]);
          setShowSuggestions(false);
        }
      } catch (error) {
        console.error('Error searching address:', error);
        setSuggestions([]);
        setShowSuggestions(false);
      } finally {
        setIsLoading(false);
      }
    }

    // Add debounce to prevent too many API calls
    const timeoutId = setTimeout(() => {
      searchAddress();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchKeyword]);

  // Add this helper function to format the address
  const formatGeoapifyAddress = (result: any): string => {
    const parts = [];

    if (result.name) parts.push(result.name);
    if (result.street) parts.push(result.street);
    if (result.district) parts.push(result.district);
    if (result.city) parts.push(result.city);
    if (result.state) parts.push(result.state);
    if (result.country) parts.push(result.country);

    return parts.join(', ');
  };

  const handleLocationSelect = async (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setTempLocation(location);
    setShowSuggestions(false);
  };

  const handleConfirm = () => {
    if (tempLocation) {
      setSelectedLocation(tempLocation);
      router.back();
    }
  };

  return (
    <View className="relative flex-1">
      <View className="absolute left-0 right-0 top-4 z-[100] px-4">
        <View className="relative">
          <SearchInput placeholder="Nhập số nhà, tên đường, phường/xã, quận/huyện, thành phố..." />
          {showSuggestions && (
            <View className="absolute left-0 right-0 z-[100]">
              <AddressSuggestions
                suggestions={suggestions}
                onSelect={handleLocationSelect}
                visible={showSuggestions}
                isLoading={isLoading}
              />
            </View>
          )}
        </View>
      </View>
      <View className="flex-1">
        <MapComponent
          onLocationSelect={handleLocationSelect}
          selectedLocation={tempLocation}
          enabled={!showSuggestions}
          pointerEvents={showSuggestions ? 'none' : 'auto'}
        />
      </View>
      <View className="absolute bottom-4 left-0 right-0 z-[90] flex-row justify-center gap-4 px-4">
        <TouchableOpacity
          className="flex-1 rounded-lg bg-gray-200 p-4"
          onPress={() => router.back()}>
          <Text className="text-center">Hủy</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 rounded-lg bg-blue-500 p-4" onPress={handleConfirm}>
          <Text className="text-center text-white">Xác nhận</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MapScreen;
