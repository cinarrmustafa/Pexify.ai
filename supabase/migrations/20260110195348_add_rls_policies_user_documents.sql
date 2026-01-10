/*
  # Add RLS Policies for user_documents table

  1. Security Policies
    - SELECT: Users can only view their own documents
    - INSERT: Users can only create documents for themselves
    - UPDATE: Users can only update their own documents
    - DELETE: Users can only delete their own documents

  2. Policy Details
    - All policies check: auth.uid() = user_id
    - Policies are restrictive: authenticated users only
    - Each operation has its own policy for clarity and maintainability

  ## Notes
  - Policies use DROP IF EXISTS for idempotency
  - All policies require authentication (TO authenticated)
  - No user can access another user's documents
  - Policy names are descriptive and unique
*/

-- Drop existing policies if they exist (for idempotency)
DROP POLICY IF EXISTS "user_documents_select_own" ON user_documents;
DROP POLICY IF EXISTS "user_documents_insert_own" ON user_documents;
DROP POLICY IF EXISTS "user_documents_update_own" ON user_documents;
DROP POLICY IF EXISTS "user_documents_delete_own" ON user_documents;

-- SELECT: Users can only view their own documents
CREATE POLICY "user_documents_select_own"
  ON user_documents
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- INSERT: Users can only create documents for themselves
CREATE POLICY "user_documents_insert_own"
  ON user_documents
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- UPDATE: Users can only update their own documents
CREATE POLICY "user_documents_update_own"
  ON user_documents
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- DELETE: Users can only delete their own documents
CREATE POLICY "user_documents_delete_own"
  ON user_documents
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);