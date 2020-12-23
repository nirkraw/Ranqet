CREATE TABLE Lists (
    id UUID PRIMARY KEY,
    title VARCHAR(255),
    description VARCHAR(255),
    num_completions INTEGER,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Options (
    id UUID PRIMARY KEY,
    name VARCHAR(255),
    photo_URL VARCHAR(5000)
);

ALTER TABLE Options ADD COLUMN list_id UUID;
ALTER TABLE Options ADD CONSTRAINT list_id_fk FOREIGN KEY(list_id) REFERENCES Lists(id);

CREATE TABLE Users (
    id UUID PRIMARY KEY,
    name VARCHAR(250),
    avatar_URL VARCHAR(5000),
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE Lists ADD COLUMN created_by UUID;
ALTER TABLE Lists ADD CONSTRAINT created_by_fk FOREIGN KEY(created_by) REFERENCES Users(id);

CREATE TABLE Scores (
    id UUID PRIMARY KEY,
    score FLOAT
);

ALTER TABLE Scores ADD COLUMN list_id UUID;
ALTER TABLE Scores ADD CONSTRAINT list_id_fk FOREIGN KEY(list_id) REFERENCES Lists(id);
ALTER TABLE Scores ADD COLUMN option_id UUID;
ALTER TABLE Scores ADD CONSTRAINT option_id_fk FOREIGN KEY(option_id) REFERENCES Options(id);
ALTER TABLE Scores ADD COLUMN user_id UUID;
ALTER TABLE Scores ADD CONSTRAINT user_id_fk FOREIGN KEY(user_id) REFERENCES Users(id);

CREATE INDEX scores_list_id_user_id_idx on Scores(list_id, user_id);

CREATE TABLE UserLists (
    completion_status BOOLEAN,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE UserLists ADD COLUMN user_id UUID;
ALTER TABLE UserLists ADD CONSTRAINT user_id_fk FOREIGN KEY(user_id) REFERENCES Users(id);
ALTER TABLE UserLists ADD COLUMN list_id UUID;
ALTER TABLE UserLists ADD CONSTRAINT list_id_fk FOREIGN KEY(list_id) REFERENCES Lists(id);