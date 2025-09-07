-- Migration to update event date fields to startTime and endTime

-- Step 1: Add new columns
ALTER TABLE events 
ADD COLUMN start_time TIMESTAMP,
ADD COLUMN end_time TIMESTAMP,
ADD COLUMN is_published BOOLEAN DEFAULT false NOT NULL;

-- Step 2: Migrate existing data (set default times if only date exists)
UPDATE events 
SET start_time = CASE 
    WHEN event_date IS NOT NULL THEN event_date::timestamp + interval '20 hours'
    ELSE NOW()
END,
end_time = CASE 
    WHEN event_date IS NOT NULL THEN event_date::timestamp + interval '26 hours' 
    ELSE NOW() + interval '6 hours'
END;

-- Step 3: Make new columns NOT NULL after data migration
ALTER TABLE events 
ALTER COLUMN start_time SET NOT NULL,
ALTER COLUMN end_time SET NOT NULL;

-- Step 4: Drop old columns
ALTER TABLE events 
DROP COLUMN IF EXISTS event_date,
DROP COLUMN IF EXISTS date_display,
DROP COLUMN IF EXISTS dates_description,
DROP COLUMN IF EXISTS year,
DROP COLUMN IF EXISTS number,
DROP COLUMN IF EXISTS currency,
DROP COLUMN IF EXISTS price,
DROP COLUMN IF EXISTS status,
DROP COLUMN IF EXISTS is_featured;

-- Step 5: Create new index
CREATE INDEX IF NOT EXISTS event_start_time_idx ON events(start_time);

-- Step 6: Drop old index if exists
DROP INDEX IF EXISTS event_date_idx;