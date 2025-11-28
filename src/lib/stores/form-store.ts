import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { contactFormSchema, quoteFormSchema, type ContactForm, type QuoteForm } from '@/lib/zod/schemas';
import { supabase } from '@/lib/supabase';
import { useUiStore } from './ui-store';

interface FormState {
  // Contact form
  contactForm: ContactForm;
  contactErrors: Record<string, string>;

  // Quote form
  quoteForm: QuoteForm;
  quoteErrors: Record<string, string>;

  // Actions
  updateContactField: (field: keyof ContactForm, value: string) => void;
  validateContactForm: () => boolean;
  submitContactForm: () => Promise<void>;
  resetContactForm: () => void;

  updateQuoteField: (field: keyof QuoteForm, value: string) => void;
  validateQuoteForm: () => boolean;
  submitQuoteForm: () => Promise<void>;
  resetQuoteForm: () => void;
}

const initialContactForm: ContactForm = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

const initialQuoteForm: QuoteForm = {
  name: '',
  email: '',
  phone: '',
  service: '',
  details: '',
};

export const useFormStore = create<FormState>()(
  devtools(
    (set, get) => ({
      // Initial state
      contactForm: initialContactForm,
      contactErrors: {},

      quoteForm: initialQuoteForm,
      quoteErrors: {},

      // Contact form actions
      updateContactField: (field: keyof ContactForm, value: string) => {
        const { contactForm } = get();
        const updatedForm = { ...contactForm, [field]: value };

        set({ contactForm: updatedForm });

        // Clear error for this field if it exists
        const { contactErrors } = get();
        if (contactErrors[field]) {
          const updatedErrors = { ...contactErrors };
          delete updatedErrors[field];
          set({ contactErrors: updatedErrors });
        }
      },

      validateContactForm: () => {
        const { contactForm } = get();

        try {
          contactFormSchema.parse(contactForm);
          set({ contactErrors: {} });
          return true;
        } catch (error: unknown) {
          if (error instanceof Error && 'errors' in error) {
            const zodError = error as { errors: Array<{ path: string[]; message: string }> };
            const errors: Record<string, string> = {};
            zodError.errors.forEach((err) => {
              const field = err.path[0] as string;
              errors[field] = err.message;
            });
            set({ contactErrors: errors });
          }
          return false;
        }
      },

      submitContactForm: async () => {
        const { contactForm, validateContactForm } = get();
        const uiStore = useUiStore.getState();

        if (!validateContactForm()) {
          uiStore.setError('Por favor corrige los errores del formulario');
          return;
        }

        uiStore.setLoading(true, 'Enviando mensaje...');

        try {
          const { error } = await supabase
            .from('contacts')
            .insert({
              name: contactForm.name,
              email: contactForm.email,
              phone: contactForm.phone || null,
              message: contactForm.message,
              created_at: new Date().toISOString(),
            });

          if (error) throw error;

          uiStore.setSuccess('Mensaje enviado exitosamente');
          get().resetContactForm();
        } catch (error: unknown) {
          console.error('Error submitting contact form:', error);
          const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
          uiStore.setError('Error al enviar el mensaje', errorMessage);
        } finally {
          uiStore.setLoading(false);
        }
      },

      resetContactForm: () => {
        set({
          contactForm: initialContactForm,
          contactErrors: {}
        });
      },

      // Quote form actions
      updateQuoteField: (field: keyof QuoteForm, value: string) => {
        const { quoteForm } = get();
        const updatedForm = { ...quoteForm, [field]: value };

        set({ quoteForm: updatedForm });

        // Clear error for this field if it exists
        const { quoteErrors } = get();
        if (quoteErrors[field]) {
          const updatedErrors = { ...quoteErrors };
          delete updatedErrors[field];
          set({ quoteErrors: updatedErrors });
        }
      },

      validateQuoteForm: () => {
        const { quoteForm } = get();

        try {
          quoteFormSchema.parse(quoteForm);
          set({ quoteErrors: {} });
          return true;
        } catch (error: unknown) {
          if (error instanceof Error && 'errors' in error) {
            const zodError = error as { errors: Array<{ path: string[]; message: string }> };
            const errors: Record<string, string> = {};
            zodError.errors.forEach((err) => {
              const field = err.path[0] as string;
              errors[field] = err.message;
            });
            set({ quoteErrors: errors });
          }
          return false;
        }
      },

      submitQuoteForm: async () => {
        const { quoteForm, validateQuoteForm } = get();
        const uiStore = useUiStore.getState();

        if (!validateQuoteForm()) {
          uiStore.setError('Por favor corrige los errores del formulario');
          return;
        }

        uiStore.setLoading(true, 'Enviando cotización...');

        try {
          const { error } = await supabase
            .from('quotes')
            .insert({
              name: quoteForm.name,
              email: quoteForm.email,
              phone: quoteForm.phone,
              service: quoteForm.service,
              details: quoteForm.details,
              created_at: new Date().toISOString(),
            });

          if (error) throw error;

          uiStore.setSuccess('Cotización enviada exitosamente');
          get().resetQuoteForm();
        } catch (error: unknown) {
          console.error('Error submitting quote form:', error);
          const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
          uiStore.setError('Error al enviar la cotización', errorMessage);
        } finally {
          uiStore.setLoading(false);
        }
      },

      resetQuoteForm: () => {
        set({
          quoteForm: initialQuoteForm,
          quoteErrors: {}
        });
      },
    }),
    { name: 'form-store' }
  )
);

// Helper hooks for form validation
export const useContactForm = () => {
  const {
    contactForm,
    contactErrors,
    updateContactField,
    validateContactForm,
    submitContactForm,
    resetContactForm
  } = useFormStore();

  return {
    form: contactForm,
    errors: contactErrors,
    updateField: updateContactField,
    validate: validateContactForm,
    submit: submitContactForm,
    reset: resetContactForm
  };
};

export const useQuoteForm = () => {
  const {
    quoteForm,
    quoteErrors,
    updateQuoteField,
    validateQuoteForm,
    submitQuoteForm,
    resetQuoteForm
  } = useFormStore();

  return {
    form: quoteForm,
    errors: quoteErrors,
    updateField: updateQuoteField,
    validate: validateQuoteForm,
    submit: submitQuoteForm,
    reset: resetQuoteForm
  };
};