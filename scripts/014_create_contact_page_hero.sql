-- Create contact page hero section
CREATE TABLE IF NOT EXISTS contact_page_hero (
  id SERIAL PRIMARY KEY,
  badge_text TEXT NOT NULL DEFAULT 'نحن هنا لك',
  title TEXT NOT NULL DEFAULT 'تواصل معنا',
  subtitle TEXT NOT NULL DEFAULT 'نحن هنا لمساعدتك في أي وقت',
  description TEXT NOT NULL DEFAULT 'فريقنا متاح على مدار الساعة للإجابة على استفساراتك وتقديم أفضل الحلول',
  background_image TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default data
INSERT INTO contact_page_hero (badge_text, title, subtitle, description)
VALUES (
  'نحن هنا لك',
  'تواصل معنا',
  'نحن هنا لمساعدتك في أي وقت',
  'فريقنا متاح على مدار الساعة للإجابة على استفساراتك وتقديم أفضل الحلول'
) ON CONFLICT DO NOTHING;

-- Create contact page features
CREATE TABLE IF NOT EXISTS contact_page_features (
  id SERIAL PRIMARY KEY,
  icon TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default features
INSERT INTO contact_page_features (icon, title, description, sort_order)
VALUES 
  ('headphones', 'دعم 24/7', 'فريق الدعم الفني متاح على مدار الساعة لمساعدتك', 1),
  ('mail', 'رد سريع', 'نضمن لك الرد على استفساراتك في أسرع وقت ممكن', 2),
  ('map-pin', 'موقعنا', 'يمكنك زيارتنا في مكتبنا أو التواصل معنا عبر الإنترنت', 3),
  ('message-circle', 'واتساب', 'تواصل معنا مباشرة عبر واتساب للحصول على خدمة فورية', 4)
ON CONFLICT DO NOTHING;
