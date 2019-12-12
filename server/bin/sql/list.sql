CREATE TABLE list(
	id SERIAL PRIMARY KEY,
	name VARCHAR(64),
	type VARCHAR(64),
	owner_id INTEGER,
	guid VARCHAR(64) UNIQUE,
	FOREIGN KEY (owner_id) REFERENCES wastenot_user(id)
);