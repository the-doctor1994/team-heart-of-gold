create database main;
use main;
create table if not exists users (
	username varchar(255) not null,
	name varchar(255) not null,
	age int not null,
	online boolean not null default 0,
	school varchar(255) not null,
	primary key (username)
	);

create table if not exists chats (
	id int auto_increment,
	user1 varchar(255),
	user2 varchar(255),
	primary key (id)
	);