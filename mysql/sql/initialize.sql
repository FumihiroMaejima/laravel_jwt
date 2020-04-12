CREATE DATABASE IF NOT EXISTS laraveldocker CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
CREATE USER IF NOT EXISTS 'testuser'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON laraveldocker.* TO 'testuser'@'%';

FLUSH PRIVILEGES;
