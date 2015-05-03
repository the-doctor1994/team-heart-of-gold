create database main if not exists;

create table if not exists users (
	username text not null,
	name text not null,
	age text not null,
	online text not null default false,
	school text not null,
	courses text[] not null,
	studyPreferences text not null,
	matches text[],
	pending text[],
	primary key (username)
);

create table if not exists chats (
	id int auto_increment,
	user1 text,
	user2 text,
	primary key (id)
);
