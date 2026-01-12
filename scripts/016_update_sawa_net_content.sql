-- Update site content for SAWA-NET company
-- This script updates all company-specific content

-- Update brand name
UPDATE site_content SET value = 'SAWA-NET' WHERE section = 'top_main_menu_branding' AND key = 'brand_name';

-- Update footer about section
UPDATE site_content SET value = 'سوا نت' WHERE section = 'footer_about' AND key = 'title';
UPDATE site_content SET value = 'نوفر لك أفضل خدمات الإنترنت في درعا الريف الغربي. نلتزم بتقديم خدمة موثوقة وسريعة مع دعم فني على مدار الساعة.' WHERE section = 'footer_about' AND key = 'description';

-- Update footer copyright
UPDATE site_content SET value = '© 2025 سوا نت. جميع الحقوق محفوظة.' WHERE section = 'footer_copyright' AND key = 'text';

-- Update contact info
UPDATE contact_info SET value = '0934173775' WHERE type = 'phone';
UPDATE contact_info SET value = '0934173775' WHERE type = 'whatsapp';
UPDATE contact_info SET value = 'zeennoo11@gmail.com' WHERE type = 'email';
UPDATE contact_info SET value = 'درعا الريف الغربي' WHERE type = 'location';

-- Update hero slides titles to mention SAWA-NET
UPDATE hero_slides SET 
  title = 'مرحباً بكم في سوا نت',
  subtitle = 'أفضل خدمات الإنترنت في درعا الريف الغربي'
WHERE id = 1;

-- Update about section header
UPDATE site_content SET value = 'من نحن - سوا نت' WHERE section = 'about_section_header' AND key = 'title';
UPDATE site_content SET value = 'شركة رائدة في مجال خدمات الإنترنت في درعا' WHERE section = 'about_section_header' AND key = 'subtitle';

-- Update services section header
UPDATE site_content SET value = 'خدمات سوا نت' WHERE section = 'services_section_header' AND key = 'title';
UPDATE site_content SET value = 'نقدم لك أفضل خدمات الإنترنت في درعا الريف الغربي' WHERE section = 'services_section_header' AND key = 'subtitle';

-- Update packages section header
UPDATE site_content SET value = 'باقات سوا نت' WHERE section = 'packages_section_header' AND key = 'title';
UPDATE site_content SET value = 'اختر الباقة المناسبة لاحتياجاتك' WHERE section = 'packages_section_header' AND key = 'subtitle';

-- Update contact section header
UPDATE site_content SET value = 'تواصل مع سوا نت' WHERE section = 'contact_section_header' AND key = 'title';
UPDATE site_content SET value = 'نحن هنا لخدمتك في درعا الريف الغربي' WHERE section = 'contact_section_header' AND key = 'subtitle';

-- Update CTA section
UPDATE site_content SET value = 'جاهز للاتصال بسوا نت؟' WHERE section = 'contact_cta' AND key = 'title';
UPDATE site_content SET value = 'انضم إلى عائلة سوا نت واستمتع بأفضل خدمة إنترنت' WHERE section = 'contact_cta' AND key = 'subtitle';

-- Update why choose section
UPDATE why_choose_section SET section_title = 'لماذا تختار سوا نت؟' WHERE id = 1;

-- Update packages hero
UPDATE packages_hero SET 
  badge_text = 'باقات سوا نت المميزة',
  title = 'اختر باقتك المثالية من سوا نت',
  description = 'باقات إنترنت عالية السرعة مع دعم فني متميز في درعا الريف الغربي'
WHERE id = 1;

-- Update contact page hero
UPDATE contact_page_hero SET 
  badge_text = 'سوا نت هنا لك',
  title = 'تواصل مع فريق سوا نت',
  subtitle = 'نحن هنا لمساعدتك في درعا الريف الغربي',
  description = 'فريق سوا نت متاح على مدار الساعة للإجابة على استفساراتك وتقديم أفضل الحلول'
WHERE id = 1;

-- Update about page hero
UPDATE about_page_hero SET 
  badge_text = 'تعرف على سوا نت',
  title = 'قصة سوا نت',
  subtitle = 'رحلتنا في تقديم أفضل خدمات الإنترنت في درعا',
  description = 'سوا نت شركة رائدة في مجال خدمات الإنترنت في درعا الريف الغربي، نلتزم بتقديم خدمة موثوقة وسريعة لعملائنا'
WHERE id = 1;
