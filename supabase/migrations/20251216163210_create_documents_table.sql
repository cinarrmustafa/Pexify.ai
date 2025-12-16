/*
  # Create documents table

  1. New Tables
    - `documents`
      - `id` (uuid, primary key) - Unique identifier for each document
      - `name` (text) - Document name/filename
      - `type` (text) - Document type (e.g., Fatura, Konşimento)
      - `date` (date) - Document date
      - `size` (text) - File size (e.g., "2.4 MB")
      - `status` (text) - Verification status (e.g., DOĞRULANDI, BEKLİYOR)
      - `tags` (text array) - Document tags/labels
      - `created_at` (timestamptz) - When the document was created
      - `updated_at` (timestamptz) - When the document was last updated

  2. Security
    - Enable RLS on `documents` table
    - Add policy for all users to read documents
    - Add policy for all users to update documents
*/

CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL DEFAULT 'Fatura',
  date date NOT NULL DEFAULT CURRENT_DATE,
  size text NOT NULL DEFAULT '0 MB',
  status text NOT NULL DEFAULT 'BEKLİYOR',
  tags text[] DEFAULT ARRAY[]::text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all to read documents"
  ON documents
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow all to update documents"
  ON documents
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all to insert documents"
  ON documents
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Insert some sample data
INSERT INTO documents (name, type, date, size, status, tags) VALUES
  ('INV-2024-001.pdf', 'Fatura', '2024-03-12', '2.4 MB', 'DOĞRULANDI', ARRAY['Urgent']),
  ('INV-2024-002.pdf', 'Fatura', '2024-03-11', '1.8 MB', 'DOĞRULANDI', ARRAY[]::text[]),
  ('BOL-2024-001.pdf', 'Konşimento', '2024-03-10', '3.2 MB', 'BEKLİYOR', ARRAY['Review']),
  ('INV-2024-003.pdf', 'Fatura', '2024-03-09', '2.1 MB', 'DOĞRULANDI', ARRAY[]::text[]);
