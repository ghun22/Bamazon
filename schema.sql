DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(45) NOT NULL,
    department_name VARCHAR(45) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    primary key(item_id) 
);

SELECT * FROM products;

INSERT INTO products (product_name,  department_name, price, stock_quantity)

VALUES ("League of Legend", "Video Game", 0.99, 30),
    ("God of War", "Video Game", 59.99, 200),
    ("Quantum Break", "Video Game", 29.99, 41),
    ("Iron Man 2", "Moive", 12.99, 120),
    ("Iphone XR", "Electronic", 749.99, 10),
    ("Milk ","Drinks", 4.99, 40),
    ("Apple", "Food", 0.99, 74),
    ("Airpod", "Electronic", 120.99, 40),
    ("Gocci Shoes", "Shoes", 1250.99, 5),
    ("Jeans", "Clothing", 49.99, 600);
