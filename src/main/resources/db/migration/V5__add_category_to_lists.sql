ALTER TABLE Lists ADD COLUMN category VARCHAR DEFAULT 'MISC';
CREATE INDEX categories_num_completions_idx ON lists(category, num_completions);
