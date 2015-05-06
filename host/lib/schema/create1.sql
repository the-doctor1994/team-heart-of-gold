create database main;
grant all on main.* to 'studybuddy'@'localhost' identified by 'password';
use main;
create table users (
	username varchar(255) not null primary key,
	password varchar(40) not null,
	name varchar(40) not null,
	age int not null,
	school varchar(255) not null,
	courses varchar(255) default 'undefined',
	study_pref varchar(255) default 'undefined',
    online boolean default 0,
    matches_array varchar(255) default 'undefined'
	);

create table chats (
	sender varchar(255) not null,
	receiver varchar(255) not null,
	time_sent datetime not null,
	message varchar(400) not null
	);
