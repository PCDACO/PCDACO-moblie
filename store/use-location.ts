import { create } from 'zustand';

interface LocationStore {
  selectedLocation: {
    latitude: number;
    longitude: number;
    address: string;
  } | null;
  setSelectedLocation: (
    location: { latitude: number; longitude: number; address: string } | null
  ) => void;
  resetSelectedLocation: () => void;
}

export const useLocationStore = create<LocationStore>((set) => ({
  selectedLocation: null,
  setSelectedLocation: (location) => set({ selectedLocation: location }),
  resetSelectedLocation: () => set({ selectedLocation: null }),
}));
