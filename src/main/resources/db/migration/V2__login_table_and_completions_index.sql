CREATE INDEX num_completions_idx ON Lists(num_completions);

ALTER TABLE users ADD COLUMN username VARCHAR;
UPDATE users SET username = name;
CREATE UNIQUE INDEX unique_username_idx ON users(username);

ALTER TABLE users ADD COLUMN password_salt VARCHAR;
ALTER TABLE users ADD COLUMN password_hash VARCHAR;

