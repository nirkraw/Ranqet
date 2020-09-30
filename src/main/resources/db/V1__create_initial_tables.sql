CREATE TABLE Lists (
    id INTEGER PRIMARY KEY,
    title VARCHAR(255),
    description VARCHAR(255),
    num_completions INTEGER
);

CREATE TABLE Options (
    id INTEGER PRIMARY KEY,
    name VARCHAR(255),
    photo_URL VARCHAR(5000),
    FOREIGN KEY(list_id) REFERENCES Lists(id)
);

CREATE TABLE Users (
    id INTEGER PRIMARY KEY,
    name VARCHAR(250),
    avatar_URL VARCHAR(5000)
);

CREATE TABLE Scores (
    score INTEGER,
    FOREIGN KEY(option_id) REFERENCES Options(id),
    FOREIGN KEY(user_id) REFERENCES Users(id),
);

CREATE TABLE UserLists (
    FOREIGN KEY(user_id) REFERENCES Users(id),
    FOREIGN KEY(list_id) REFERENCES Lists(id),
    completion_status BOOLEAN
);