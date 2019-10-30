CREATE TABLE list(
	id SERIAL PRIMARY KEY,
	name VARCHAR(64),
	type VARCHAR(64),
	owner_guid VARCHAR(64),
	guid VARCHAR(64) UNIQUE,
	FOREIGN KEY (owner_guid) REFERENCES wastenot_user(guid)
);