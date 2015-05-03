MYSQL='which mysql'
$MYSQL -u root -p root -e "create table if not exists users (username varchar(255) not null, name varchar(255) not null, age int not null, online boolean not null default 0, school varchar(255) not null, primary key (username)); create table if not exists chat (COLUMN COLTYPE, ..., PRIMARY KEY (SOMECOL));"
# mark unique identifiers
