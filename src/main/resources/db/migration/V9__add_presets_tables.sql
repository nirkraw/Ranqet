CREATE TABLE Presets (
    id UUID PRIMARY KEY,
    title VARCHAR(255),
    created_by UUID,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX created_by_idx on Presets(created_by);

CREATE TABLE PresetOptions (
    id UUID PRIMARY KEY,
    name VARCHAR(255),
    photo_url VARCHAR(5000)
);

ALTER TABLE PresetOptions ADD COLUMN preset_id UUID;
ALTER TABLE PresetOptions ADD CONSTRAINT preset_id_fk FOREIGN KEY(preset_id) REFERENCES Presets(id);



