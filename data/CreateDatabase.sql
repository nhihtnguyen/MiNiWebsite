drop database cosmetic_website;
create database cosmetic_website;
use cosmetic_website;


CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(100) NOT NULL,
  `address` varchar(30),
  `phone_number` varchar(30),
  `dob` date NOT NULL,
  `role` int(5),
  UNIQUE KEY `email_UNIQUE` (`email`),
  PRIMARY KEY (`user_id`)
) ;
CREATE TABLE `category` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`category_id`)
) ;
create table`product`(
`product_id` int(11) not null auto_increment,
`product_name` varchar(30) not null,
`category_id` int(11),
`price` float not null,
`description` text,
PRIMARY KEY (`product_id`),
CONSTRAINT `category_fk` FOREIGN KEY (`category_id`) REFERENCES `category`(`category_id`)
);


create table `cart`(
`cart_id` int(11) not null auto_increment,
`customer_id` int(11) not null,
`total_price` float not null,
PRIMARY KEY (`cart_id`),
CONSTRAINT `user_fk` FOREIGN KEY (`customer_id`) REFERENCES `user` (`user_id`)
);

create table `cart_detail`
(
`cart_id` int(11) not null,
`product_id` int(11) not null,
`amount` int(11) not null,
`subtotal` float NOT NULL,
PRIMARY KEY (`cart_id`,`product_id`)
);

create table `order` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `order_date` datetime NOT NULL,
  `shipping_address` varchar(256) NOT NULL,
  `recipient_name` varchar(30) NOT NULL,
  `recipient_phone` varchar(15) NOT NULL,
  `payment_method` varchar(20) NOT NULL,
  `total` float NOT NULL,
  `status` varchar(20) NOT NULL,
  PRIMARY KEY (`order_id`),
  UNIQUE KEY `order_id_UNIQUE` (`order_id`),
  KEY `customer_fk_2_idx` (`customer_id`),
  CONSTRAINT `customer_fk_2` FOREIGN KEY (`customer_id`) REFERENCES `user` (`user_id`) 
) ;


CREATE TABLE `order_detail` (
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `amount` int(11) NOT NULL,
  `subtotal` float NOT NULL,
  CONSTRAINT `product_fk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ,
  CONSTRAINT `order_fk` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`) 
) 


