import { create } from "zustand";

interface usePlusStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const usePlusStore = create<usePlusStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
