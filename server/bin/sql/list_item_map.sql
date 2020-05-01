CREATE TABLE list_item_map(
  id SERIAL PRIMARY KEY,
  guid VARCHAR(64),
  name VARCHAR(64),
  expiration_ms BIGINT,
  skip_notification BOOLEAN,
  user_id INTEGER,
  UNIQUE (guid),
  FOREIGN KEY (user_id) REFERENCES wastenot_user(id)
);