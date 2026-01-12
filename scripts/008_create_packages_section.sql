-- Create packages table
CREATE TABLE IF NOT EXISTS packages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  speed VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'IQD',
  features TEXT NOT NULL, -- JSON array stored as text
  is_featured BOOLEAN DEFAULT FALSE,
  sort_order INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert packages section header content
INSERT INTO site_content (section, key, value, sort_order)
VALUES 
  ('packages_section_header', 'title', 'باقاتنا', 1),
  ('packages_section_header', 'subtitle', 'اختر الباقة المناسبة لك', 2);

-- Insert default packages
INSERT INTO packages (name, speed, price, currency, features, is_featured, sort_order, is_active)
VALUES 
  ('الباقة الأساسية', '10 Mbps', 30000, 'IQD', '["إنترنت عالي السرعة","دعم فني 24/7","بدون حد للاستخدام"]', false, 1, true),
  ('الباقة المميزة', '50 Mbps', 50000, 'IQD', '["سرعة فائقة","دعم فني 24/7","بدون حد للاستخدام","أولوية في الخدمة"]', true, 2, true),
  ('الباقة الاحترافية', '100 Mbps', 80000, 'IQD', '["أقصى سرعة","دعم فني مخصص","بدون حد للاستخدام","أولوية قصوى","IP ثابت"]', false, 3, true);
