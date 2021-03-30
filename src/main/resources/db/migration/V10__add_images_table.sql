CREATE TABLE ImageRecords (
    id UUID PRIMARY KEY,
    filename VARCHAR(255),
    url VARCHAR,
    associated_list_id UUID,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX associated_list_id_idx on ImageRecords(associated_list_id);

CREATE INDEX url_idx on ImageRecords(url);
