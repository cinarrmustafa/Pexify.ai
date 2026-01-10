/*
  # Create Storage Bucket and RLS Policies

  1. Storage Bucket
    - Name: `secure-docs`
    - Public: false (private bucket)
    - File size limit: 50MB
    - Allowed MIME types: PDF, images, documents

  2. Storage Policies
    - SELECT (read/download): Users can only access files in their own folder
    - INSERT (upload): Users can only upload to their own folder
    - UPDATE (move/rename): Users can only modify files in their own folder
    - DELETE: Users can only delete files in their own folder

  3. Path Format
    - Storage path MUST be: {user_id}/{unique_file_name}
    - First folder name MUST match authenticated user's ID

  ## Security Notes
  - Bucket is PRIVATE (public = false)
  - All policies check folder name matches auth.uid()
  - Users cannot access other users' folders
  - Policies use storage.foldername() to extract user_id from path
*/

-- Create storage bucket (if not exists)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'secure-docs',
  'secure-docs',
  false,
  52428800,
  ARRAY['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword', 'text/plain']
)
ON CONFLICT (id) DO NOTHING;

-- Drop existing storage policies if they exist (for idempotency)
DROP POLICY IF EXISTS "secure_docs_select_own" ON storage.objects;
DROP POLICY IF EXISTS "secure_docs_insert_own" ON storage.objects;
DROP POLICY IF EXISTS "secure_docs_update_own" ON storage.objects;
DROP POLICY IF EXISTS "secure_docs_delete_own" ON storage.objects;

-- SELECT: Users can only read/download their own files
CREATE POLICY "secure_docs_select_own"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'secure-docs' 
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- INSERT: Users can only upload to their own folder
CREATE POLICY "secure_docs_insert_own"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'secure-docs' 
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- UPDATE: Users can only update/move their own files
CREATE POLICY "secure_docs_update_own"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'secure-docs' 
    AND (storage.foldername(name))[1] = auth.uid()::text
  )
  WITH CHECK (
    bucket_id = 'secure-docs' 
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- DELETE: Users can only delete their own files
CREATE POLICY "secure_docs_delete_own"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'secure-docs' 
    AND (storage.foldername(name))[1] = auth.uid()::text
  );