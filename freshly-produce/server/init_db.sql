DROP TABLE orders;
DROP TABLE transactions;
DROP TABLE "user_subscriptions";
DROP TABLE products;
DROP TABLE users;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY NOT NULL,
  username TEXT,
  "password" TEXT,
  first_name TEXT,
  surname TEXT,
  "role" SMALLINT NOT NULL,
  phone TEXT,
  email TEXT,
  "address" TEXT,
  photo BYTEA
);

INSERT INTO public.users
(username, first_name, surname, role, phone, email, address)
VALUES('jc', 'jj', 'cc', 0, '23', 's1@com', 'Candy way');

CREATE TABLE products (
  product_id SERIAL PRIMARY KEY NOT NULL,
  photo BYTEA,
  product_name TEXT,
  product_type TEXT,
  product_price NUMERIC,
  is_published BOOLEAN,
  unit TEXT,
  quantity NUMERIC,
  expiration_date TIMESTAMPTZ,
  user_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE "user_subscriptions" (
  subscription_id SERIAL PRIMARY KEY NOT NULL,
  frequency TEXT,
  delivery_day TEXT,
  expiration_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL,
  user_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE transactions (
  transaction_id SERIAL PRIMARY KEY NOT NULL,
  transaction_cost NUMERIC NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  product_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE orders (
  order_id SERIAL PRIMARY KEY NOT NULL,
  price NUMERIC NOT NULL,
  quantity NUMERIC NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  user_id INTEGER NOT NULL,
  transaction_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (transaction_id) REFERENCES transactions(transaction_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);
