/*
  # Initial schema for Pragya Bin

  1. New Tables
    - users
      - id (uuid, primary key)
      - name (text)
      - email (text, unique)
      - created_at (timestamp)
    
    - bins
      - id (uuid, primary key)
      - name (text)
      - location_lat (float)
      - location_lng (float)
      - location_address (text)
      - status (text)
      - last_synced (timestamp)
      - fill_levels (jsonb)
      - total_capacity (jsonb)
      - created_at (timestamp)
    
    - contributions
      - id (uuid, primary key)
      - user_id (uuid, references users)
      - waste_type (text)
      - weight (float)
      - bin_id (uuid, references bins)
      - timestamp (timestamp)
      - created_at (timestamp)
    
    - rewards
      - id (uuid, primary key)
      - user_id (uuid, references users)
      - amount (float)
      - waste_type (text)
      - redeemed (boolean)
      - timestamp (timestamp)
      - created_at (timestamp)
    
    - coupons
      - id (uuid, primary key)
      - name (text)
      - description (text)
      - value (float)
      - required_points (float)
      - created_at (timestamp)
    
    - vendor_requests
      - id (uuid, primary key)
      - vendor_id (uuid, references users)
      - waste_type (text)
      - quantity (float)
      - status (text)
      - created_at (timestamp)
      - fulfilled_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create bins table
CREATE TABLE IF NOT EXISTS bins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  location_lat float NOT NULL,
  location_lng float NOT NULL,
  location_address text NOT NULL,
  status text NOT NULL DEFAULT 'online',
  last_synced timestamptz DEFAULT now(),
  fill_levels jsonb NOT NULL DEFAULT '{}'::jsonb,
  total_capacity jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create contributions table
CREATE TABLE IF NOT EXISTS contributions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  waste_type text NOT NULL,
  weight float NOT NULL,
  bin_id uuid REFERENCES bins(id) ON DELETE CASCADE,
  timestamp timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create rewards table
CREATE TABLE IF NOT EXISTS rewards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  amount float NOT NULL,
  waste_type text NOT NULL,
  redeemed boolean DEFAULT false,
  timestamp timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create coupons table
CREATE TABLE IF NOT EXISTS coupons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  value float NOT NULL,
  required_points float NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create vendor_requests table
CREATE TABLE IF NOT EXISTS vendor_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id uuid REFERENCES users(id) ON DELETE CASCADE,
  waste_type text NOT NULL,
  quantity float NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  fulfilled_at timestamptz
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE bins ENABLE ROW LEVEL SECURITY;
ALTER TABLE contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_requests ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Public can read bin data"
  ON bins
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can read own contributions"
  ON contributions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create contributions"
  ON contributions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own rewards"
  ON rewards
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Public can read coupons"
  ON coupons
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Vendors can read own requests"
  ON vendor_requests
  FOR SELECT
  TO authenticated
  USING (auth.uid() = vendor_id);

CREATE POLICY "Vendors can create requests"
  ON vendor_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = vendor_id);