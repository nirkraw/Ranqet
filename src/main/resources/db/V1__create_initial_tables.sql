CREATE TABLE Lists (
    id INTEGER,
    title VARCHAR(255),
    description VARCHAR(255),
    numCompletions INTEGER
);

CREATE TABLE Options (
    id int,
    name VARCHAR(255),
    photoURL VARCHAR(5000),
    listId INTEGER,
  FOREIGN KEY(listId) REFERENCES Lists(id)
);

CREATE TABLE Users (
    id INTEGER,
    name VARCHAR(250),
    avatarURL VARCHAR(5000)
);

CREATE TABLE Scores (
    score INTEGER,
    optionId INTEGER,
  FOREIGN KEY(optionID) REFERENCES Options(id),
    userId INTEGER,
  FOREIGN KEY(userID) REFERENCES users(id),
);

CREATE TABLE UserLists (
    userId INTEGER,
  FOREIGN KEY(userID) REFERENCES users(id),
    istId INTEGER,
  FOREIGN KEY(listId) REFERENCES Lists(id),
   completionStatus BOOL
);