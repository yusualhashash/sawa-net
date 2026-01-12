-- Create footer_links table
CREATE TABLE IF NOT EXISTS footer_links (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create footer_social table
CREATE TABLE IF NOT EXISTS footer_social (
  id SERIAL PRIMARY KEY,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default footer content into site_content
INSERT INTO site_content (section, key, value, sort_order) VALUES
('footer_about', 'title', 'راشد واي فاي', 1),
('footer_about', 'description', 'نوفر لك أفضل خدمات الإنترنت في العراق بسرعات عالية وأسعار تنافسية. نحن هنا لخدمتك على مدار الساعة.', 2),
('footer_copyright', 'text', '© 2025 راشد واي فاي. جميع الحقوق محفوظة.', 1);

-- Insert default footer links
INSERT INTO footer_links (title, url, sort_order) VALUES
('الرئيسية', '/', 1),
('من نحن', '/about', 2),
('خدماتنا', '/services', 3),
('الباقات', '/packages', 4),
('تواصل معنا', '/contact', 5);

-- Insert default social media links
INSERT INTO footer_social (platform, url, icon, sort_order) VALUES
('Facebook', 'https://facebook.com', 'facebook', 1),
('Instagram', 'https://instagram.com', 'instagram', 2),
('Twitter', 'https://twitter.com', 'twitter', 3),
('WhatsApp', 'https://wa.me/9647751735156', 'message-circle', 4);
