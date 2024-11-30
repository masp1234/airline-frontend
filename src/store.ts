import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mountStoreDevtool } from "simple-zustand-devtools";

interface UserStore {
  role: string | null;
  email: string | null;
  setUser: (role: string | null, email: string | null ) => void;
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

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      role: null,
      email: null,
      setUser: (role, email) => set({ role, email}),
    }),
    {
      name: "user-storage", // Unique name for storage
      storage: localStorageAdapter, // Use the custom adapter
    }
  )
);

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("User Store", useUserStore);
}

export default useUserStore;
