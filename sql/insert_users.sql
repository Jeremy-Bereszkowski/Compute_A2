use paybuddy_db;

/*  Test users */
insert into users (fname,lname,clearance,email,password)
values ('jeremy', 'beresh', 'admin', 'j.beresh@hotmail.com', 'hello');

insert into users (fname,lname,clearance,email,password)
values ('ye wyn', 'woon', 'admin', 's3675485@student.rmit.edu.au', 'testpass');

/* Test cities */
insert into user_favorite_city (user_id,fav_city)
values (1, 'Melbourne,AU');

insert into user_favorite_city (user_id,fav_city)
values (2, 'SYDNEY,AU');