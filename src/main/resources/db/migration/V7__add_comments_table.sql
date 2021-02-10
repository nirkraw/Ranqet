CREATE TABLE Comments (
    id UUID PRIMARY KEY,
    contents VARCHAR,
    list_id UUID,
    posted_by UUID,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX list_id_created_on_idx ON Comments(list_id, created_on);

