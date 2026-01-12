-- Create packages hero section table
CREATE TABLE IF NOT EXISTS packages_hero (
  id SERIAL PRIMARY KEY,
  badge_text VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  button1_text VARCHAR(100) NOT NULL,
  button1_link VARCHAR(255) NOT NULL,
  button2_text VARCHAR(100) NOT NULL,
  button2_link VARCHAR(255) NOT NULL,
  background_image TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create packages stats table
CREATE TABLE IF NOT EXISTS packages_stats (
  id SERIAL PRIMARY KEY,
  icon VARCHAR(50) NOT NULL,
  value VARCHAR(100) NOT NULL,
  label VARCHAR(255) NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default packages hero content
INSERT INTO packages_hero (badge_text, title, description, button1_text, button1_link, button2_text, button2_link, background_image)
VALUES (
  'باقات مصممة خصيصاً لك',
  'اختر الباقة المثالية لاحتياجاتك',
  'باقات إنترنت عالية السرعة مع دعم فني متميز على مدار الساعة. اشترك الآن واستمتع بأفضل تجربة إنترنت في العراق',
  'استكشف الباقات',
  '#packages',
  'قارن بين الباقات',
  '#compare',
  '/abstract-network.png'
);

-- Insert default packages stats
INSERT INTO packages_stats (icon, value, label, sort_order, is_active) VALUES
('headphones', '24/7', 'دعم فني', 1, true),
('trending-up', 'Mbps 100', 'أقصى سرعة', 2, true),
('zap', '99.9%', 'وقت التشغيل', 3, true),
('users', '+5000', 'عميل راضي', 4, true);
