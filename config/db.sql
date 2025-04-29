-- Active: 1745317109039@@127.0.0.1@3306@rent_stadium

CREATE DATABASE rent_stadium

SHOW DATABASES

SHOW TABLES

DROP TABLE Users

CREATE TABLE `users`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `role` ENUM('owner', 'customer', 'admin') NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255),
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(15) NOT NULL
);
CREATE TABLE `stadium`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255),
    `location` VARCHAR(50) NOT NULL,
    `description` TEXT,
    `price` DECIMAL(15, 2) NOT NULL,
    `owner_id` INT NOT NULL
);

DROP TABLE booking

CREATE TABLE `booking`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `stadion_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    `booking_date` DATE NOT NULL,
    `start_time` VARCHAR(10) NOT NULL,
    `end_time` VARCHAR(10) NOT NULL,
    `total_price` DECIMAL(15, 2) NOT NULL,
    `status` ENUM('PENDING', 'CANCELLED', 'CONFIRMED', 'PAID') NOT NULL
);
CREATE TABLE `payment`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `booking_id` BIGINT UNSIGNED NOT NULL,
    `amount` DECIMAL(15, 2) NOT NULL,
    `payment_time` DATETIME NOT NULL,
    `payment_method` ENUM('CARD', 'CASH', 'ONLINE') NOT NULL
);
CREATE TABLE `review`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `stadion_id` INT UNSIGNED NOT NULL,
    `user_id` INT UNSIGNED NOT NULL,
    `rating` SMALLINT NOT NULL,
    `comment` VARCHAR(255) NOT NULL
);
CREATE TABLE `images`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `stadion_id` INT UNSIGNED NOT NULL,
    `image_url` VARCHAR(255) NOT NULL
);

SHOW TABLES

SELECT * FROM users

SELECT u.first_name, u.phone, s.name FROM  users u
LEFT JOIN stadium s ON u.id = s.owner_id
LEFT JOIN images i ON s.id = i.stadion_id
WHERE first_name="Jobir" and last_name='Sobirov'

SELECT * FROM  booking b
LEFT JOIN stadium s ON b.stadion_id = s.id
LEFT JOIN users i ON b.id 
WHERE b.booking_date BETWEEN "2025-01-01" AND  "2025-06-01"
AND s.name LIKE '%ARENA%'

SELECT u.first_name, u.phone, r.comment, s.name FROM users u
LEFT JOIN review r ON u.id = r.user_id
LEFT JOIN stadium s ON s.id = r.stadion_id
WHERE phone = '998911234567'

SELECT * FROM users

SELECT * FROM stadium s
LEFT JOIN booking b ON s.id = b.stadion_id
WHERE end_time - start_time >=2