### Schema

CREATE DATABASE burgers_db;
USE burgers_db;

CREATE TABLE burgers
	id int NOT NULL AUTO_INCREMENT,
	burger_name varchar(255) NOT NULL,
	devouted BOOLEAN DEFAULT false,
	created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
);
