DROP TABLE orders;
DROP TABLE transactions;
DROP TABLE products;
DROP TABLE users;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY NOT NULL,
  user_photo BYTEA,
  username TEXT NOT NULL,
  "password" TEXT NOT NULL,
  first_name TEXT,
  surname TEXT,
  role SMALLINT NOT NULL,
  phone TEXT,
  email TEXT,
  "address" TEXT,
  created_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE products (
  product_id SERIAL PRIMARY KEY NOT NULL,
  seller_id INTEGER NOT NULL,
  product_photo TEXT,
  product_name TEXT NOT NULL,
  product_type TEXT NOT NULL,
  product_price NUMERIC,
  product_description TEXT,
  is_published BOOLEAN,
  unit TEXT,
  quantity NUMERIC,
  frequency TEXT,
  delivery_day TEXT,
  expiration_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL,
  is_deleted BOOLEAN,
  FOREIGN KEY (seller_id) REFERENCES users(user_id)
);

-- TODO: write sql trigger to update transactions table?
CREATE TABLE transactions (
  transaction_id SERIAL PRIMARY KEY NOT NULL,
  buyer_id INTEGER NOT NULL,
  seller_id INTEGER NOT NULL,
  transaction_cost NUMERIC NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  FOREIGN KEY (buyer_id) REFERENCES users(user_id),
  FOREIGN KEY (seller_id) REFERENCES users(user_id)
);

CREATE TABLE orders (
  order_id SERIAL PRIMARY KEY NOT NULL,
  buyer_id INTEGER NOT NULL,
  transaction_id INTEGER NOT NULL,  
  product_id INTEGER NOT NULL,
  product_name TEXT,
  product_price NUMERIC,
  order_type TEXT,
  order_quantity NUMERIC NOT NULL,
  is_deleted BOOLEAN,
  created_at TIMESTAMPTZ NOT NULL,
  FOREIGN KEY (buyer_id) REFERENCES users(user_id),
  FOREIGN KEY (transaction_id) REFERENCES transactions(transaction_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);