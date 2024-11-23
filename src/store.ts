import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mountStoreDevtool } from "simple-zustand-devtools";

interface RoleStore {
  role: string | null;
  setRole: (role: string | null) => void;
}

// Adapter to make localStorage conform to PersistStorage
const localStorageAdapter = {
  getItem: (name: string) => {
    const item = localStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  },
  setItem: (name: string, value: any) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
};

const useRoleStore = create<RoleStore>()(
  persist(
    (set) => ({
      role: null,
      setRole: (role) => set({ role }),
    }),
    {
      name: "role-storage", // Unique name for storage
      storage: localStorageAdapter, // Use the custom adapter
    }
  )
);

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Role Store", useRoleStore);
}

export default useRoleStore;
