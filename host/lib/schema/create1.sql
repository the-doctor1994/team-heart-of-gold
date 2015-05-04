create database main;
use main;
create table users (
	username varchar(255) not null primary key,
	password varchar(40) not null,
	name varchar(255) not null,
	age int not null,
	school varchar(255) not null,
	classes varchar(255),
	study_preferences_array varchar(255),
    online boolean default 0,
    potential_matches_array varchar(255),
    matches_array varchar(255)
	);

create table chats (
	sender varchar(255),
	receiver varchar(255),
	time_sent datetime,
	message varchar(400)
	);
