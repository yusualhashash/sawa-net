-- Create table for about page hero section
CREATE TABLE IF NOT EXISTS about_page_hero (
  id SERIAL PRIMARY KEY,
  badge_text VARCHAR(255) DEFAULT 'تعرف علينا',
  title VARCHAR(500) DEFAULT 'نحن RASHD-WIFI',
  subtitle TEXT DEFAULT 'نقدم لك أفضل خدمات الإنترنت في العراق منذ عام 2020',
  description TEXT DEFAULT 'نحن شركة رائدة في تقديم خدمات الإنترنت عالي السرعة في العراق. نؤمن بأن الإنترنت السريع والموثوق هو حق للجميع، ونعمل جاهدين لتوفير أفضل تجربة إنترنت لعملائنا.',
  button1_text VARCHAR(100) DEFAULT 'تواصل معنا',
  button1_link VARCHAR(500) DEFAULT '/contact',
  background_image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default data
INSERT INTO about_page_hero (badge_text, title, subtitle, description, button1_text, button1_link)
VALUES 
  ('تعرف علينا', 'نحن RASHD-WIFI', 'نقدم لك أفضل خدمات الإنترنت في العراق منذ عام 2020', 'نحن شركة رائدة في تقديم خدمات الإنترنت عالي السرعة في العراق. نؤمن بأن الإنترنت السريع والموثوق هو حق للجميع، ونعمل جاهدين لتوفير أفضل تجربة إنترنت لعملائنا.', 'تواصل معنا', '/contact')
ON CONFLICT DO NOTHING;

-- Create table for about page statistics
CREATE TABLE IF NOT EXISTS about_page_stats (
  id SERIAL PRIMARY KEY,
  icon VARCHAR(50) DEFAULT 'users',
  value VARCHAR(50) NOT NULL,
  label VARCHAR(200) NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default stats
INSERT INTO about_page_stats (icon, value, label, sort_order)
VALUES 
  ('users', '+10000', 'عميل راضٍ', 1),
  ('globe', '15+', 'مدينة مغطاة', 2),
  ('award', '99.9%', 'وقت تشغيل', 3),
  ('clock', '24/7', 'دعم فني', 4)
ON CONFLICT DO NOTHING;
