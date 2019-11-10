CREATE TABLE wastenot_user(
	id             SERIAL PRIMARY KEY,
	"emailHash"    VARCHAR(64) UNIQUE,
	"passwordHash" VARCHAR(64),
	name           VARCHAR(64),
	created_at     TIMESTAMP NOT NULL DEFAULT NOW(),
	guid           VARCHAR(64) UNIQUE,
  "sessionId"    VARCHAR(36)
);