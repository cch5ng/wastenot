CREATE TABLE list_item_map(
  id SERIAL PRIMARY KEY,
  name VARCHAR(64),
  expiration_days INTEGER,
  skip_notification BOOLEAN,
  user_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES wastenot_user(id)
);