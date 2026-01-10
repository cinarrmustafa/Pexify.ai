/*
  # Set user_id default to auth.uid()

  1. Changes
    - Update `user_id` column default value to auth.uid()
    - This ensures user_id is automatically populated with the authenticated user's ID
    - Prevents client-side manipulation of user_id field
  
  2. Security Benefits
    - Client code no longer needs to send user_id explicitly
    - Database automatically uses the authenticated user's ID
    - Eliminates possibility of user_id spoofing attempts
    - Works in conjunction with RLS policies for complete security

  3. Notes
    - DEFAULT auth.uid() requires the user to be authenticated
    - If no user is authenticated, insert will fail (as intended)
    - RLS policies continue to enforce user_id = auth.uid() on the server side
*/

-- Set default value for user_id to auth.uid()
ALTER TABLE documents 
  ALTER COLUMN user_id SET DEFAULT auth.uid();
