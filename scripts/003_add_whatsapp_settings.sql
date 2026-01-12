-- Add WhatsApp settings table
CREATE TABLE IF NOT EXISTS settings (
  id SERIAL PRIMARY KEY,
  key VARCHAR(100) NOT NULL UNIQUE,
  value TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default WhatsApp number
INSERT INTO settings (key, value) VALUES
('whatsapp_number', '+964 775 173 5156')
ON CONFLICT (key) DO NOTHING;
