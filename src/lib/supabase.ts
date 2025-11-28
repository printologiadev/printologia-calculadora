import { createClient } from '@supabase/supabase-js';

// Supabase client configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
        'Missing Supabase environment variables. Please check your .env.local file.'
    );
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
    },
});

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
