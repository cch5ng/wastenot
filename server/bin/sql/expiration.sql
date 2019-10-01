CREATE TABLE expiration(
	id SERIAL PRIMARY KEY,
	food_name VARCHAR(64),
	expiration_range INTEGER
);