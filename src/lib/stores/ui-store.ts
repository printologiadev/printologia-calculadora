import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UiState {
  // Loading states
  isLoading: boolean;
  loadingMessage: string | null;

  // Error states
  error: string | null;
  errorDetails: string | null;

  // Success states
  success: string | null;

  // Modal states
  modalOpen: boolean;
  modalContent: React.ReactNode | null;
  modalTitle: string | null;

  // Actions
  setLoading: (loading: boolean, message?: string) => void;
  setError: (error: string | null, details?: string | null) => void;
  setSuccess: (message: string | null) => void;
  clearMessages: () => void;

  // Modal actions
  openModal: (content: React.ReactNode, title?: string) => void;
  closeModal: () => void;
}

export const useUiStore = create<UiState>()(
  devtools(
    (set) => ({
      // Initial state
      isLoading: false,
      loadingMessage: null,
      error: null,
      errorDetails: null,
      success: null,
      modalOpen: false,
      modalContent: null,
      modalTitle: null,

      // Loading actions
      setLoading: (loading: boolean, message: string | null = null) =>
        set({ isLoading: loading, loadingMessage: message }),

      // Error actions
      setError: (error: string | null, details: string | null = null) =>
        set({ error, errorDetails: details, success: null }),

      // Success actions
      setSuccess: (message: string | null) =>
        set({ success: message, error: null, errorDetails: null }),

      // Clear messages
      clearMessages: () =>
        set({ error: null, errorDetails: null, success: null }),

      // Modal actions
      openModal: (content: React.ReactNode, title: string | null = null) =>
        set({ modalOpen: true, modalContent: content, modalTitle: title }),

      closeModal: () =>
        set({ modalOpen: false, modalContent: null, modalTitle: null }),
    }),
    { name: 'ui-store' }
  )
);

// Helper hooks for common UI operations
export const useLoading = () => {
  const { isLoading, loadingMessage, setLoading } = useUiStore();
  return { isLoading, loadingMessage, setLoading };
};

export const useError = () => {
  const { error, errorDetails, setError } = useUiStore();
  return { error, errorDetails, setError };
};

export const useSuccess = () => {
  const { success, setSuccess } = useUiStore();
  return { success, setSuccess };
};

export const useModal = () => {
  const { modalOpen, modalContent, modalTitle, openModal, closeModal } = useUiStore();
  return { modalOpen, modalContent, modalTitle, openModal, closeModal };
};