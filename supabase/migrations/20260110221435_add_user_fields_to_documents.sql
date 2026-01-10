/*
  # Add user and file fields to documents table

  1. Changes
    - Add `user_id` (uuid, foreign key) - References auth.users(id), links document to owner
    - Add `file_path` (text) - Storage path in documents bucket
    - Add `file_name` (text) - Original file name for display and download
    
  2. Security Updates
    - Drop existing overly permissive RLS policies
    - Add restrictive policy: users can only SELECT their own documents
    - Add restrictive policy: users can only INSERT documents with their own user_id
    - Add restrictive policy: users can only UPDATE their own documents
    - Add restrictive policy: users can only DELETE their own documents

  3. Notes
    - user_id foreign key has ON DELETE CASCADE to auto-cleanup when user is deleted
    - All new fields are nullable to support existing sample records
    - RLS policies ensure complete user data isolation
*/

-- Add user_id column with foreign key constraint
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'documents' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE documents ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Add file_path column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'documents' AND column_name = 'file_path'
  ) THEN
    ALTER TABLE documents ADD COLUMN file_path text;
  END IF;
END $$;

-- Add file_name column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'documents' AND column_name = 'file_name'
  ) THEN
    ALTER TABLE documents ADD COLUMN file_name text;
  END IF;
END $$;

-- Drop old overly permissive policies
DROP POLICY IF EXISTS "Allow all to read documents" ON documents;
DROP POLICY IF EXISTS "Allow all to update documents" ON documents;
DROP POLICY IF EXISTS "Allow all to insert documents" ON documents;

-- Create secure RLS policies
CREATE POLICY "Users can view own documents"
  ON documents
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own documents"
  ON documents
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own documents"
  ON documents
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own documents"
  ON documents
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index for performance on user_id queries
CREATE INDEX IF NOT EXISTS idx_documents_user_id ON documents(user_id);
