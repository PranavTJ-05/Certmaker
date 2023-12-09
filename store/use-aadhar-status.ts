import { create } from "zustand";
interface AadharStatus {
  status: boolean;
  setStatus: () => void;
}
export const useAadharStatus = create<AadharStatus>((set) => ({
  status: false,
  setStatus: () => set((state) => ({ status: !state.status })),
}));
