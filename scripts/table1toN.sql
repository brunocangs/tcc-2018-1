create table if not exists table1toN(
    id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    target int, 
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (target) REFERENCES table1(id)
    ON DELETE CASCADE
)