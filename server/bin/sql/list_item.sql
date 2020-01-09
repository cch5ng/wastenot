CREATE TABLE list_item(
  id SERIAL PRIMARY KEY,
  name VARCHAR(64),
  sort_order INTEGER,
  list_guid VARCHAR(64),
  guid VARCHAR(64) UNIQUE,
  section_id INTEGER,
  checked BOOLEAN,
  timestamp TIMESTAMPTZ,
  FOREIGN KEY (list_guid) REFERENCES list(guid),
  FOREIGN KEY (section_id) REFERENCES section(id)
);