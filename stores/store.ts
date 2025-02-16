import { create } from 'zustand';

interface StoreState {
  id: string;
  setId: (newId: string) => void;
}

const useIDStore = create<StoreState>((set) => ({
  id: '',
  setId: (newId: string) => set({ id: newId }),
}));

export default useIDStore;
