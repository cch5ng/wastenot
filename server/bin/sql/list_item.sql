CREATE TABLE list_item(
  id SERIAL PRIMARY KEY,
  name VARCHAR(64),
  sort_order INTEGER,
  list_guid VARCHAR(64),
  guid VARCHAR(64) UNIQUE,
  section_id INTEGER,
  checked BOOLEAN,
  list_item_map_guid VARCHAR(64),
  timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  notify_timestamp TIMESTAMPTZ,
  notification_sent BOOLEAN,
  FOREIGN KEY (list_guid) REFERENCES list(guid),
  FOREIGN KEY (section_id) REFERENCES section(id),
  FOREIGN KEY (list_item_map_guid) REFERENCES list_item_map(guid)
);