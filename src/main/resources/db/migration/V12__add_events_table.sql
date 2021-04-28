CREATE TABLE Events (
    id UUID PRIMARY KEY,
    type VARCHAR(32),
    list_id UUID,
    occurred_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX events_tbl_list_id_idx ON Events(list_id);
