# Supabase Integration Guide

## Setup Instructions

### 1. Install Dependencies
The Supabase client library has been installed:
```bash
bun add @supabase/supabase-js
```

### 2. Configure Environment Variables

Create a `.env.local` file in the project root with your Supabase credentials:

```env
# EmailJS Configuration (existing)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key

# Supabase Configuration
# Get these from: https://app.supabase.com/project/_/settings/api
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Optional: Supabase Service Role Key (for server-side operations only)
# CAUTION: Never expose this key in client-side code!
# SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 3. Get Your Supabase Credentials

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project (or create a new one)
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4. Using the Supabase Client

The Supabase client is configured in `src/lib/supabase.ts`. Import and use it in your components:

```typescript
import { supabase } from '@/lib/supabase';

// Example: Fetch data
const { data, error } = await supabase
  .from('your_table')
  .select('*');

// Example: Insert data
const { data, error } = await supabase
  .from('your_table')
  .insert({ column: 'value' });
```

## Example Use Cases

### Store Quote Requests
```typescript
// Save a quote to Supabase
const saveQuote = async (quoteData: any) => {
  const { data, error } = await supabase
    .from('quotes')
    .insert({
      name: quoteData.name,
      email: quoteData.email,
      phone: quoteData.phone,
      service: quoteData.service,
      details: quoteData.details,
      created_at: new Date().toISOString(),
    });

  if (error) {
    console.error('Error saving quote:', error);
    return null;
  }

  return data;
};
```

### Store Contact Form Submissions
```typescript
// Save contact form submission
const saveContact = async (contactData: any) => {
  const { data, error } = await supabase
    .from('contacts')
    .insert({
      name: contactData.name,
      email: contactData.email,
      message: contactData.message,
      created_at: new Date().toISOString(),
    });

  if (error) {
    console.error('Error saving contact:', error);
    return null;
  }

  return data;
};
```

## Database Schema Examples

### Quotes Table
```sql
create table quotes (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  phone text,
  service text,
  details jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

### Contacts Table
```sql
create table contacts (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  phone text,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

## Security Notes

- ✅ The `anon` key is safe to use in client-side code
- ❌ **NEVER** expose the `service_role` key in client-side code
- ✅ Use Row Level Security (RLS) policies in Supabase to protect your data
- ✅ The `.env.local` file is already in `.gitignore` to prevent accidental commits

## Next Steps

1. Create your database tables in Supabase
2. Set up Row Level Security policies
3. Update the `Database` type in `src/lib/supabase.ts` with your schema
4. Integrate Supabase calls into your forms and components
