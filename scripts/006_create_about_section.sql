-- Create about section content
-- This section displays company introduction on the homepage

-- Add about section header content
INSERT INTO site_content (section, key, value, sort_order) VALUES
('about_section_header', 'title', 'من نحن', 1),
('about_section_header', 'subtitle', 'تعرف على شركتنا', 2);

-- Create about_content table for company information
CREATE TABLE IF NOT EXISTS about_content (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for better query performance
CREATE INDEX idx_about_content_sort_order ON about_content(sort_order);
CREATE INDEX idx_about_content_is_active ON about_content(is_active);

-- Insert default about content
INSERT INTO about_content (title, description, image_url, sort_order) VALUES
('شركة رشد للإنترنت', 'نحن شركة متخصصة في توفير خدمات الإنترنت عبر الأبراج، نهدف إلى تقديم خدمة إنترنت ثابتة وسريعة لجميع عملائنا في المناطق المشمولة بالتغطية.', NULL, 1),
('رؤيتنا', 'نسعى لأن نكون الخيار الأول لخدمات الإنترنت في العراق من خلال تقديم أفضل جودة وسرعة واستقرار في الخدمة.', NULL, 2),
('هدفنا', 'بناء ثقة قوية مع عملائنا من خلال تقديم خدمة موثوقة ودعم فني متميز على مدار الساعة.', NULL, 3);
