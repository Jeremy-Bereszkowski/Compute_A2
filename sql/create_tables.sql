use test;

CREATE TABLE IF NOT EXISTS users
(
	user_id int not null AUTO_INCREMENT,
	fname varchar(25) NOT NULL,
	lname varchar(25) NOT NULL,
	clearance enum('read-only', 'edit', 'admin') not null,
	email varchar(50) NOT NULL,
	password varchar(25) NOT NULL,

	PRIMARY KEY (user_id)
);

describe users;
+-----------+----------------------------------+------+-----+---------+----------------+
| Field     | Type                             | Null | Key | Default | Extra          |
+-----------+----------------------------------+------+-----+---------+----------------+
| user_id   | int(11)                          | NO   | PRI | NULL    | auto_increment |
| fname     | varchar(25)                      | NO   |     | NULL    |                |
| lname     | varchar(25)                      | NO   |     | NULL    |                |
| clearance | enum('read-only','edit','admin') | NO   |     | NULL    |                |
| email     | varchar(50)                      | NO   |     | NULL    |                |
| password  | varchar(25)                      | NO   |     | NULL    |                |
+-----------+----------------------------------+------+-----+---------+----------------+

CREATE TABLE IF NOT EXISTS user_favorite_city
(
	user_favorite_city_id int not null AUTO_INCREMENT,
	user_id int not null,
	fav_city varchar(50),

	PRIMARY KEY (user_favorite_city_id),
	FOREIGN KEY (user_id) REFERENCES users(user_id)
);

describe user_favorite_city;
+-----------------------+-------------+------+-----+---------+----------------+
| Field                 | Type        | Null | Key | Default | Extra          |
+-----------------------+-------------+------+-----+---------+----------------+
| user_favorite_city_id | int(11)     | NO   | PRI | NULL    | auto_increment |
| user_id               | int(11)     | NO   | MUL | NULL    |                |
| fav_city              | varchar(50) | YES  |     | NULL    |                |
+-----------------------+-------------+------+-----+---------+----------------+