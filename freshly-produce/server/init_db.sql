-- CREATE DATABASE freshly_produce;

-- USE DATABASE freshly_produce;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username TEXT,
  first_name TEXT,
  surname TEXT,
  "role" SMALLINT,
  phone TEXT,
  email TEXT,
  "address" TEXT
);

CREATE TABLE products (
  product_id SERIAL PRIMARY KEY,
  product_name TEXT,
  product_type TEXT,
  product_price NUMERIC,
  unit TEXT,
  quantity NUMERIC,
  expiration_date TIMESTAMPTZ,
  user_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE "user_subscriptions" (
  subscription_id SERIAL PRIMARY KEY,
  frequency TEXT,
  delivery_day TEXT,
  expiration_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ,
  user_id INTEGER,
  product_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE transactions (
  transaction_id SERIAL PRIMARY KEY,
  transaction_cost NUMERIC,
  created_at TIMESTAMPTZ,
  product_id INTEGER,
  user_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE orders (
  order_id SERIAL PRIMARY KEY,
  price NUMERIC,
  quantity NUMERIC,
  created_at TIMESTAMPTZ,
  user_id INTEGER,
  transaction_id INTEGER,
  product_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (transaction_id) REFERENCES transactions(transaction_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);
