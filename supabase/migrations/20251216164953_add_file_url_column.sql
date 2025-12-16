/*
  # Add file_url column to documents table

  1. Changes
    - Add `file_url` (text, nullable) column to `documents` table
      - Stores the URL/path to the uploaded file for preview purposes
    
  2. Notes
    - This column is optional (nullable) to support existing records
    - Allows storing file references for document preview functionality
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'documents' AND column_name = 'file_url'
  ) THEN
    ALTER TABLE documents ADD COLUMN file_url text;
  END IF;
END $$;