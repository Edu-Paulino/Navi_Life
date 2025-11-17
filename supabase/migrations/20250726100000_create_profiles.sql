/*
# [Structural] Create User Profiles and Settings

This migration sets up the foundational `profiles` table to store user-specific data that complements the built-in `auth.users` table. It also establishes a trigger to automatically create a user profile upon successful sign-up.

## Query Description:
- **Create `profiles` table**: This table will store public user information like full name, and application-specific settings. It is linked to the `auth.users` table via a foreign key relationship.
- **Enable Row Level Security (RLS)**: RLS is enabled on the `profiles` table to ensure users can only access and modify their own data.
- **Create RLS Policies**: Policies are created to allow users to `SELECT` and `UPDATE` their own profile. A policy is also added to allow `INSERT` operations for new users.
- **Create `handle_new_user` function**: A PostgreSQL function that inserts a new row into the `public.profiles` table whenever a new user is created in `auth.users`.
- **Create Trigger**: A trigger that calls the `handle_new_user` function after a new user is inserted into `auth.users`.

This setup is non-destructive and essential for managing user data securely.

## Metadata:
- Schema-Category: "Structural"
- Impact-Level: "Low"
- Requires-Backup: false
- Reversible: true (with `DROP TRIGGER`, `DROP FUNCTION`, `DROP TABLE`)

## Structure Details:
- **Tables Affected**: `public.profiles` (created)
- **Functions Affected**: `public.handle_new_user` (created)
- **Triggers Affected**: `on_auth_user_created` on `auth.users` (created)

## Security Implications:
- RLS Status: Enabled on `public.profiles`.
- Policy Changes: Yes, new policies for SELECT, INSERT, UPDATE on `public.profiles`.
- Auth Requirements: Policies are based on `auth.uid()`, ensuring users can only access their own data.

## Performance Impact:
- Indexes: A primary key is created on `profiles.id`.
- Triggers: A trigger is added to `auth.users`, which will have a negligible performance impact on user sign-ups.
- Estimated Impact: Low.
*/

-- 1. Create the profiles table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    onboarding_completed BOOLEAN DEFAULT FALSE,
    integrates_calendar BOOLEAN DEFAULT FALSE,
    receives_financial_news BOOLEAN DEFAULT FALSE
);

-- 2. Add comments to the table and columns
COMMENT ON TABLE public.profiles IS 'Stores public user profile information and app-specific settings.';
COMMENT ON COLUMN public.profiles.id IS 'References the user in auth.users.';
COMMENT ON COLUMN public.profiles.full_name IS 'The user''s full name.';
COMMENT ON COLUMN public.profiles.onboarding_completed IS 'Flag to check if the user has completed the initial setup.';
COMMENT ON COLUMN public.profiles.integrates_calendar IS 'User preference for calendar integration.';
COMMENT ON COLUMN public.profiles.receives_financial_news IS 'User preference for receiving financial news.';

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS policies
CREATE POLICY "Users can view their own profile."
ON public.profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile."
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile."
ON public.profiles FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- 5. Create a function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$;

-- 6. Create a trigger to call the function on new user sign-up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
