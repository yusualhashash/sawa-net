-- Create contact_info table for storing contact details
CREATE TABLE IF NOT EXISTS contact_info (
  id SERIAL PRIMARY KEY,
  type VARCHAR(50) NOT NULL, -- phone, email, whatsapp, location, facebook, instagram, etc.
  label VARCHAR(255) NOT NULL,
  value TEXT NOT NULL,
  icon VARCHAR(50) NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Insert default contact information
INSERT INTO contact_info (type, label, value, icon, sort_order, is_active) VALUES
('phone', 'رقم الهاتف', '+964 775 173 5156', 'phone', 1, true),
('whatsapp', 'واتساب', '+964 775 173 5156', 'message-circle', 2, true),
('email', 'البريد الإلكتروني', 'info@rashdwifi.com', 'mail', 3, true),
('location', 'الموقع', 'بغداد، العراق', 'map-pin', 4, true);

-- Add contact section header to site_content
INSERT INTO site_content (section, key, value, sort_order) VALUES
('contact_section_header', 'title', 'تواصل معنا', 1),
('contact_section_header', 'subtitle', 'نحن هنا لخدمتك على مدار الساعة', 2);

-- Add CTA section content
INSERT INTO site_content (section, key, value, sort_order) VALUES
('contact_cta', 'title', 'جاهز للبدء؟', 1),
('contact_cta', 'subtitle', 'انضم إلى آلاف العملاء الراضين واستمتع بإنترنت سريع ومستقر', 2),
('contact_cta', 'button_text', 'اشترك الآن', 3);
