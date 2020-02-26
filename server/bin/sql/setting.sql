CREATE TABLE setting(
  id SERIAL PRIMARY KEY,
  mapped_items_to_categories BOOLEAN DEFAULT false,
  user_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES wastenot_user(id)
);