-- Check the current schema of the buildings table
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'buildings' 
ORDER BY ordinal_position;

-- Check if the table exists and show its structure
\d buildings;
