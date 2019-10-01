CREATE TABLE list_item(
	id SERIAL PRIMARY KEY,
	name VARCHAR(64),
	order INTEGER,
	list_id INTEGER,
	FOREIGN KEY (list_id) REFERENCES list(id),
);