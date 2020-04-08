BEGIN;

-- Make sure this doesn't happen in production database
DROP TABLE IF EXISTS users, category, posts, comments CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  postcode VARCHAR(8)
);

INSERT INTO users (username, postcode) VALUES
  ('ina245', 'N5'),
  ('joe653', 'N7'), 
  ('gio981', 'SW4'),
  ('rog428', 'SE2')
;

CREATE TABLE category (
  id SERIAL PRIMARY KEY,
  category VARCHAR(20)
);

INSERT INTO category (category) VALUES
  ('Food'),
  ('Toiletries'),
  ('Household'),
  ('Other')
;

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,  
  title VARCHAR(255) NOT NULL,
  time TIMESTAMPTZ,
  category INTEGER REFERENCES category(id),
  post TEXT NOT NULL,  
  user_id INTEGER REFERENCES users(id)
);

INSERT INTO posts (title, time, category, post, user_id) VALUES
  ('Loads of toilet roll', '2016-06-22 19:10:25-07', 1, 'Literally way more than I can handle', 2),
  ('Loads of canned peas', '2016-06-22 19:10:25-07', 2, 'Let us all eat our 5 a day', 1),
  ('Anyone need any wooly socks?', '2016-06-22 19:10:25-07', 3, 'They are so warm', 4),
  ('I have 15 chickens going spare', '2016-06-22 19:10:25-07', 4, 'Not for eating. As company!', 3)
;

-- CREATE TABLE comments (
--   id SERIAL PRIMARY KEY,
--   comment TEXT NOT NULL,
--   post_id INTEGER REFERENCES posts(id),
--   user_id INTEGER REFERENCES users(id)
-- );

-- INSERT INTO comments (comment, post_id, user_id) VALUES
--   ('This is so cool', 1, 4),
--   ('Where did you get all of that from? You are a legend!', 2, 1),
--   ('You are so thoughtful, thank you', 4, 3),
--   ('I have lots of them spare to!', 3, 2)
-- ;

COMMIT;
