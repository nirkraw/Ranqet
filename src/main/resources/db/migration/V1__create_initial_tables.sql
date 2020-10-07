CREATE TABLE Lists (
    id INTEGER PRIMARY KEY,
    title VARCHAR(255),
    description VARCHAR(255),
    num_completions INTEGER
);

CREATE TABLE Options (
    id INTEGER PRIMARY KEY,
    name VARCHAR(255),
    photo_URL VARCHAR(5000)
);

ALTER TABLE Options ADD COLUMN list_id INTEGER;
ALTER TABLE Options ADD CONSTRAINT list_id_fk FOREIGN KEY(list_id) REFERENCES Lists(id);

CREATE TABLE Users (
    id INTEGER PRIMARY KEY,
    name VARCHAR(250),
    avatar_URL VARCHAR(5000)
);

CREATE TABLE Scores (
    score INTEGER
);

ALTER TABLE Scores ADD COLUMN option_id INTEGER;
ALTER TABLE Scores ADD CONSTRAINT option_id_fk FOREIGN KEY(option_id) REFERENCES Options(id);
ALTER TABLE Scores ADD COLUMN user_id INTEGER;
ALTER TABLE Scores ADD CONSTRAINT user_id_fk FOREIGN KEY(user_id) REFERENCES Users(id);

CREATE TABLE UserLists (
    completion_status BOOLEAN
);

ALTER TABLE UserLists ADD COLUMN user_id INTEGER;
ALTER TABLE UserLists ADD CONSTRAINT user_id_fk FOREIGN KEY(user_id) REFERENCES Users(id);
ALTER TABLE UserLists ADD COLUMN list_id INTEGER;
ALTER TABLE UserLists ADD CONSTRAINT list_id_fk FOREIGN KEY(list_id) REFERENCES Lists(id);