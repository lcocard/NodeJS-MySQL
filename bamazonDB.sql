-- Drops the bamazon if it exists currently --
DROP DATABASE IF EXISTS bamazon;
-- Creates the "bamazon" database --
CREATE DATABASE bamazon;

-- Makes it so all of the following code will affect bamazon --
USE bamazon;

-- Creates the table "products" within bamazon which cannot contain null --
CREATE TABLE products (
  -- Creates a numeric column called "item_id"  --
  item_id INTEGER(11) NOT NULL,
  -- Makes a string column called "product_name" which cannot contain null --
  product_name VARCHAR(30) NOT NULL,
  -- Makes a boolean column called "department_name" which cannot contain null --
  department_name VARCHAR(30) NOT NULL,
  -- Makes an numeric column called "price" which cannot contain null --
  price DECIMAL(10,2) NOT NULL,
    -- Makes an numeric column called "stock_quantity" which cannot contain null --
  stock_quantity INT(20) NOT NULL,
  -- Sets item_id as this table's primary key which means all data contained within it will be unique --
  PRIMARY KEY (item_id)
);

SELECT * FROM products;

-- Creates new rows containing data in all named columns --
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (00101, "Denon Home Theatre", "Electronics", 3999.00, 5),
        (00301, "Bose Headphones", "Electronics", 199.99, 8),
        (00501, "Sony Camera", "Electronics", 2798.00, 10),
        (01351, "Bissell Vacuum", "Home and Kitchen", 69.98, 15),
        (01756, "Krups Coffee Grinder", "Home and Kitchen", 239.62, 20),
        (01253, "Black+Decker Coffee Maker", "Home and Kitchen", 18.96, 15),
        (03198, "Mongoose Bicycle", "Sports and Outdoors", 576.44, 10),
        (03275, "Callaway Golf Set", "Sports and Outdoors", 409.86, 8),
        (03834, "Garmin Fishfinder Kit", "Sports and Outdoors", 269.99, 6),
        (07105, "iBUYPOWER Elite PC Desktop", "Electronics", 1256.29, 12)
        
