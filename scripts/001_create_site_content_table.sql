-- Create the site_content table to store all website text
-- This allows the client to manage all text from an admin panel in the future

CREATE TABLE IF NOT EXISTS site_content (
  id SERIAL PRIMARY KEY,
  section VARCHAR(100) NOT NULL,
  key VARCHAR(100) NOT NULL,
  value TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(section, key)
);

-- Create an index for faster queries
CREATE INDEX idx_site_content_section ON site_content(section, sort_order);

-- Insert top main menu content
-- Section: top_main_menu_branding
INSERT INTO site_content (section, key, value, sort_order) VALUES
('top_main_menu_branding', 'brand_name', 'RASHD-WIFI', 1);

-- Section: top_main_menu_navigation
INSERT INTO site_content (section, key, value, sort_order) VALUES
('top_main_menu_navigation', 'nav_home', 'الرئيسية', 1),
('top_main_menu_navigation', 'nav_packages', 'الباقات', 2),
('top_main_menu_navigation', 'nav_coverage', 'التغطية', 3),
('top_main_menu_navigation', 'nav_about', 'من نحن', 4),
('top_main_menu_navigation', 'nav_contact', 'تواصل معنا', 5);

-- Section: top_main_menu_action
INSERT INTO site_content (section, key, value, sort_order) VALUES
('top_main_menu_action', 'subscribe_button', 'اشترك الآن', 1);
