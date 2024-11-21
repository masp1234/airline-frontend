import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
 
interface RoleStore {
  role: string;
  setRole: (role: string) => void;
}
 
const useRoleStore = create<RoleStore>((set) => ({
  role: "",
  setRole: (role) => set({ role }),
}));
 
if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Role Store", useRoleStore);
}
 
export default useRoleStore;