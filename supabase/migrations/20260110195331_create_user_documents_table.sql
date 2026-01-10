/*
  # Create user_documents table for secure file management

  1. New Tables
    - `user_documents`
      - `id` (uuid, primary key) - Unique document identifier
      - `user_id` (uuid, foreign key) - References auth.users(id), cascading delete
      - `file_path` (text, not null) - Storage path in format: {user_id}/{unique_file_name}
      - `file_name` (text, not null) - Original file name for display
      - `analysis_status` (text, not null) - Document processing status (pending/processing/completed/failed)
      - `created_at` (timestamptz, not null) - Document upload timestamp

  2. Indexes
    - Index on `user_id` for fast user-specific queries
    - Index on `analysis_status` for filtering by status

  3. Security
    - Enable RLS on `user_documents` table
    - Policies will be added in next migration for clear separation

  ## Notes
  - user_id foreign key has ON DELETE CASCADE to auto-cleanup user documents
  - Default analysis_status is 'pending' for new uploads
  - All columns except company name are required (NOT NULL)
*/

-- Create user_documents table
CREATE TABLE IF NOT EXISTS user_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  file_path text NOT NULL,
  file_name text NOT NULL,
  analysis_status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_documents_user_id ON user_documents(user_id);
CREATE INDEX IF NOT EXISTS idx_user_documents_analysis_status ON user_documents(analysis_status);

-- Enable Row Level Security
ALTER TABLE user_documents ENABLE ROW LEVEL SECURITY;