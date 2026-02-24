import { create } from 'zustand';
import { Receipt, ReceiptItem } from '../types';

interface ReceiptState {
  receipts: Receipt[];
  currentReceipt: Receipt | null;
  addReceipt: (receipt: Receipt) => void;
  updateReceipt: (id: string, receipt: Partial<Receipt>) => void;
  deleteReceipt: (id: string) => void;
  setCurrentReceipt: (receipt: Receipt | null) => void;
}

export const useReceiptStore = create<ReceiptState>((set) => ({
  receipts: [],
  currentReceipt: null,
  
  addReceipt: (receipt) => {
    set((state) => ({
      receipts: [receipt, ...state.receipts]
    }));
  },
  
  updateReceipt: (id, updatedReceipt) => {
    set((state) => ({
      receipts: state.receipts.map((r) =>
        r.id === id ? { ...r, ...updatedReceipt } : r
      )
    }));
  },
  
  deleteReceipt: (id) => {
    set((state) => ({
      receipts: state.receipts.filter((r) => r.id !== id)
    }));
  },
  
  setCurrentReceipt: (receipt) => {
    set({ currentReceipt: receipt });
  },
}));