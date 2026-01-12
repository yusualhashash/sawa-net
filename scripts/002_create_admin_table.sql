-- Create admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Using plain text password instead of hash
-- Create default admin user (username: admin, password: admin123)
INSERT INTO admin_users (username, password) 
VALUES ('admin', 'admin123')
ON CONFLICT (username) DO NOTHING;
