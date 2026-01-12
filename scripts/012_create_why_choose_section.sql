-- Create why_choose_features table for packages page
CREATE TABLE IF NOT EXISTS why_choose_features (
  id SERIAL PRIMARY KEY,
  icon TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert default features
INSERT INTO why_choose_features (icon, title, description, sort_order) VALUES
('wifi', 'إنترنت فائق السرعة', 'استمتع بسرعات إنترنت عالية تصل حتى 100 Mbps لجميع احتياجاتك', 1),
('shield', 'اتصال آمن وموثوق', 'حماية متقدمة وتشفير كامل لضمان خصوصيتك وأمان بياناتك', 2),
('headphones', 'دعم فني 24/7', 'فريق دعم فني متخصص جاهز لمساعدتك في أي وقت على مدار الساعة', 3),
('zap', 'بدون حد للاستخدام', 'استخدم الإنترنت بحرية تامة دون قلق من حدود البيانات أو القيود', 4),
('trending-up', 'أداء مستقر', 'وقت تشغيل يصل إلى 99.9% مع أداء ثابت ومستقر طوال اليوم', 5),
('check', 'أسعار تنافسية', 'باقات بأسعار مناسبة للجميع مع أفضل قيمة مقابل المال', 6);
