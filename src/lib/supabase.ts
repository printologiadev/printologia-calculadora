import { createBrowserClient } from '@supabase/ssr';

// Supabase client configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('⚠️ Supabase environment variables are missing!');
    console.error('Please add the following to your .env.local file:');
    console.error('NEXT_PUBLIC_SUPABASE_URL=your_supabase_url');
    console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key');
}

// Create a single supabase client for interacting with your database
export const supabase = createBrowserClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder-key'
);

// Type-safe database helpers
export type Database = {
    // Add your database types here as you create tables
    // Example:
    // public: {
    //   Tables: {
    //     quotes: {
    //       Row: {
    //         id: string;
    //         created_at: string;
    //         // ... other fields
    //       };
    //     };
    //   };
    // };
};

// Helper function to handle Supabase errors
export function handleSupabaseError(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    }
    return 'An unexpected error occurred';
}
