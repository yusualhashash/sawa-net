-- Add section title configuration for why choose section
CREATE TABLE IF NOT EXISTS why_choose_section (
  id SERIAL PRIMARY KEY,
  section_title TEXT NOT NULL DEFAULT 'لماذا تختار RASHD-WIFI؟',
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert default section title
INSERT INTO why_choose_section (section_title) VALUES ('لماذا تختار RASHD-WIFI؟');
