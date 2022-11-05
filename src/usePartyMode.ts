import { useLocalStorage } from "react-use";
import { useCallback } from "react";
import create from "zustand";
import { persist } from "zustand/middleware";

interface PartyModeStore {
  isPartyModeEnabled: boolean;
  togglePartyMode: () => void;
}

const dummyStorageApi = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
};

export const usePartyModeStore = create(
  persist<PartyModeStore>(
    (set) => ({
      isPartyModeEnabled: false,
      togglePartyMode: () => set((state) => ({ isPartyModeEnabled: !state.isPartyModeEnabled })),
    }),
    {
      name: "someStoragekey",
      getStorage: () => (typeof window !== "undefined" ? window.localStorage : dummyStorageApi),
    },
  ),
);
