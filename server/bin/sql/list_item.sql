CREATE TABLE list_item(
	id SERIAL PRIMARY KEY,
	name VARCHAR(64),
	sort_order INTEGER,
	list_guid VARCHAR(64),
	guid VARCHAR(64),
	FOREIGN KEY (list_guid) REFERENCES list(guid)
);