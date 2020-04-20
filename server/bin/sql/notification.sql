CREATE TABLE notification(
  id SERIAL PRIMARY KEY,
  to_send_timestamp TIMESTAMPTZ,
  sent_timestamp TIMESTAMPTZ,
  list_item_id INTEGER,
  list_item_map_id INTEGER,
  FOREIGN KEY (list_item_map_id) REFERENCES list_item_map(id),
  FOREIGN KEY (list_item_id) REFERENCES list_item(id)
);