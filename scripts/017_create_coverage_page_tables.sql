-- Create coverage page hero table
CREATE TABLE IF NOT EXISTS coverage_page_hero (
  id SERIAL PRIMARY KEY,
  badge_text TEXT NOT NULL DEFAULT 'تعرف علينا',
  title TEXT NOT NULL DEFAULT 'نحن شركة RASHD-WIFI',
  subtitle TEXT NOT NULL DEFAULT 'نقدم لك أفضل خدمات الإنترنت في العراق منذ عام 2020',
  description TEXT NOT NULL DEFAULT 'نحن شركة رائدة في تقديم خدمات الإنترنت عالي السرعة في العراق. نؤمن بأن الإنترنت السريع والموثوق هو حق للجميع، ونعمل جاهدين لتوفير أفضل تجربة إنترنت لعملائنا.',
  button_text TEXT NOT NULL DEFAULT 'تواصل معنا',
  button_link TEXT NOT NULL DEFAULT '/contact',
  background_image TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default hero data
INSERT INTO coverage_page_hero (badge_text, title, subtitle, description, button_text, button_link)
VALUES ('تعرف علينا', 'نحن شركة RASHD-WIFI', 'نقدم لك أفضل خدمات الإنترنت في العراق منذ عام 2020', 'نحن شركة رائدة في تقديم خدمات الإنترنت عالي السرعة في العراق. نؤمن بأن الإنترنت السريع والموثوق هو حق للجميع، ونعمل جاهدين لتوفير أفضل تجربة إنترنت لعملائنا.', 'تواصل معنا', '/contact')
ON CONFLICT DO NOTHING;

-- Create coverage areas table
CREATE TABLE IF NOT EXISTS coverage_areas (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'available',
  tower_count INTEGER NOT NULL DEFAULT 1,
  icon TEXT DEFAULT 'map-pin',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default coverage areas
INSERT INTO coverage_areas (name, status, tower_count, sort_order)
VALUES 
  ('منطقة المركز', 'available', 3, 0),
  ('الحي الثانوي', 'available', 2, 1),
  ('الحي الغربي', 'available', 2, 2),
  ('المنطقة الصناعية', 'available', 1, 3),
  ('الحي الجنوبي', 'available', 2, 4),
  ('الحي الشمالي', 'soon', 0, 5)
ON CONFLICT DO NOTHING;

-- Create coverage map section table
CREATE TABLE IF NOT EXISTS coverage_map_section (
  id SERIAL PRIMARY KEY,
  map_image TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default map section
INSERT INTO coverage_map_section (map_image)
VALUES (NULL)
ON CONFLICT DO NOTHING;