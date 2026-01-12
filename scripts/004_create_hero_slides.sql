-- Create hero slides table
CREATE TABLE IF NOT EXISTS hero_slides (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  button_text TEXT NOT NULL,
  button_link TEXT,
  image_url TEXT NOT NULL, -- Now stores base64 encoded images
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_hero_slides_sort ON hero_slides(sort_order);
CREATE INDEX IF NOT EXISTS idx_hero_slides_active ON hero_slides(is_active);

-- Insert sample hero slides with placeholder images
INSERT INTO hero_slides (title, subtitle, button_text, button_link, image_url, sort_order, is_active) VALUES
('تغطية قوية - سرعة عالية', 'نصل إلى جميع المناطق بتقنية أبراج متطورة', 'اكتشف التغطية', '#', '/placeholder.svg?height=600&width=1920', 1, true),
('عرض خاص: شهرين بـ 30,000', 'وفر أكثر مع عروضنا الحصرية', 'احصل على العرض', '#', '/placeholder.svg?height=600&width=1920', 2, true),
('إنترنت ثابت بدون تقطيع', 'استمتع بتجربة إنترنت سلسة وسريعة على مدار الساعة', 'اشترك الآن', '#', '/placeholder.svg?height=600&width=1920', 3, true);
