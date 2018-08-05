create database microprojectdb;
create user 'microdba'@'localhost' identified by 'qwer1234!';   
create user 'microdba'@'%' identified by 'qwer1234!';
grant all privileges on microprojectdb.* to 'microdba'@'localhost' identified by 'qwer1234!';
grant all privileges on microprojectdb.* to 'microdba'@'%' identified by 'qwer1234!';
flush privileges;

/*change user 'microdba' after logout 'root'*/

use microprojectdb;

create table member (
  _num int AUTO_INCREMENT primary key,
  _id varchar(16) not null,
  _password varchar(60) not null,
  _name varchar(128) not null /*long name length in korean */
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table goods (
  _goodsnum int AUTO_INCREMENT primary key,
  _goodsname varchar(100) not null, 
  _goodsprice int not null,
  _goodsthumbnail varchar(255) not null,  /*ext4 limited filepath length*/
  _goodsinfoimage varchar(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table orders (
  _ordernum int AUTO_INCREMENT primary key,
  _orderid varchar(16) not null,
  _orderdate timestamp default current_timestamp on update current_timestamp,
  _ordergoodsname varchar(100) not null,
  _ordergoodsquantity int not null,
  _ordergoodspaymentprice int not null,
  _ordergoodsthumbnail varchar(255) not null
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
