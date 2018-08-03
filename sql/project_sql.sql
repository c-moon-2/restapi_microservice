create database microprojectdb;
create user 'microdba'@'localhost' identified by 'qwer1234!';   
create user 'microdba'@'%' identified by 'qwer1234!';
grant all privileges on microprojectdb.* to 'microdba'@'localhost' identified by 'qwer1234!';
grant all privileges on microprojectdb.* to 'microdba'@'%' identified by 'qwer1234!';
flush privileges;

/*change user microdba after logout 'root'*/

use microprojectdb;

create table member (
  _num int AUTO_INCREMENT primary key,
  _id varchar(16) not null,
  _password varchar(60) not null,
  _name varchar(128) not null
) ENGINE=InnoDB DEFAULT CHARSET=utf8;