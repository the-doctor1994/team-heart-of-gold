create database main;
grant all on main.* to 'studybuddy'@'localhost' identified by '';
use main;
create table users (
	username varchar(255) not null primary key,
	password varchar(40) not null,
	name varchar(40) not null,
	age int not null,
	school varchar(255) not null,
	courses varchar(255),
	study_pref varchar(255),
    online boolean default 0,
    matches_array varchar(255)
	);

create table chats (
	sender varchar(255),
	receiver varchar(255),
	time_sent datetime,
	message varchar(400)
	);
