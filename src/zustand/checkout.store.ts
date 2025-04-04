import { IpaymentMethod } from "@/types/store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type IStoreItem = {
  id: string;
  name: string;
  quantity: number;
  cost: number;
  img_src: string;
  paymentMethod?: IpaymentMethod;
  buyer_email?: string;
};

interface StoreState {
  item: IStoreItem | null;
}

interface AppStore extends StoreState {
  // Actions
  setStoreItem: (value: IStoreItem) => void;
}

const initialState: StoreState = {
  item: null,
};

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      ...initialState,
      setStoreItem: (data: IStoreItem) => set((state) => ({ item: data })),
    }),
    {
      name: "store-storage", // name of the item in the storage (must be unique)
      partialize: (state) => ({ ...state }),
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export const getItemFromStore = () => useAppStore((state) => state.item);
