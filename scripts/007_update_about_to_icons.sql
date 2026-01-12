-- Update about_content table to use icons instead of images
ALTER TABLE about_content DROP COLUMN IF EXISTS image_url;
ALTER TABLE about_content ADD COLUMN icon VARCHAR(50) NOT NULL DEFAULT 'building';

-- Update existing records with appropriate icons
UPDATE about_content SET icon = 'building' WHERE sort_order = 1;
UPDATE about_content SET icon = 'target' WHERE sort_order = 2;
UPDATE about_content SET icon = 'trophy' WHERE sort_order = 3;
