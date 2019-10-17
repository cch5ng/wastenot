CREATE TABLE list_item(
	id SERIAL PRIMARY KEY,
	name VARCHAR(64),
	sort_order INTEGER,
	list_id INTEGER,
	guid VARCHAR(64),
	FOREIGN KEY (list_id) REFERENCES list(id)
);