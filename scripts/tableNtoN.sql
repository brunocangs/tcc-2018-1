create table if not exists tableNtoN(
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
	idOne INT NOT NULL,
	idTwo INT NOT NULL,
	FOREIGN KEY (idOne) REFERENCES table1(id)
	ON DELETE CASCADE,
	FOREIGN KEY (idTwo) REFERENCES table2(id)
	ON DELETE CASCADE
)