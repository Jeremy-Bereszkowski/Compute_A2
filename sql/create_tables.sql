use test;

CREATE TABLE IF NOT EXISTS test
(
	id int not null AUTO_INCREMENT,
	value varchar(25) NOT NULL,

	PRIMARY KEY (id)
);


describe users;
+---------------+-------------+------+-----+---------+----------------+
| Field         | Type        | Null | Key | Default | Extra          |
+---------------+-------------+------+-----+---------+----------------+
| cust_id       | int(11)     | NO   | PRI | NULL    | auto_increment |
| fname         | varchar(25) | NO   |     | NULL    |                |
| lname         | varchar(25) | NO   |     | NULL    |                |
| account_value | int(11)     | YES  |     | 0       |                |
| email         | varchar(25) | NO   |     | NULL    |                |
| password      | varchar(25) | NO   |     | NULL    |                |
+---------------+-------------+------+-----+---------+----------------+

