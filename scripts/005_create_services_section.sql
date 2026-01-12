-- Create services/features section table
CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(100) NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_services_sort_order ON services(sort_order);
CREATE INDEX IF NOT EXISTS idx_services_is_active ON services(is_active);

-- Insert default services data
INSERT INTO services (title, description, icon, sort_order, is_active) VALUES
('سرعة فائقة', 'استمتع بسرعات إنترنت تصل إلى 1000 ميجابت في الثانية', 'zap', 1, true),
('تغطية واسعة', 'نصل إلى جميع المناطق بتقنية أبراج متطورة', 'signal', 2, true),
('دعم على مدار الساعة', 'فريق الدعم الفني متاح 24/7 لخدمتك', 'headphones', 3, true),
('بيانات غير محدودة', 'لا قيود على استخدام البيانات', 'infinity', 4, true);

-- Add section content for services section header
INSERT INTO site_content (section, key, value, sort_order) VALUES
('services_section_header', 'title', 'خدماتنا', 1),
('services_section_header', 'subtitle', 'نقدم لك أفضل خدمات الإنترنت في العراق', 2);
