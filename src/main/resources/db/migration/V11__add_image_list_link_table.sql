ALTER TABLE ImageRecords DROP COLUMN associated_list_id;

CREATE TABLE ImageListLinks (
    id UUID PRIMARY KEY,
    image_id UUID NOT NULL,
    list_id UUID,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX list_id_idx ON ImageListLinks(list_id);
CREATE INDEX image_id_idx ON ImageListLinks(image_id);

