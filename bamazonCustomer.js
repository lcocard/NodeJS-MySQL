var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port;
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});

/* Inquire ***************** */
// Load the NPM Package inquirer
var inquirer = require("inquirer");

/* CLI Table *************** */
// Load the NPM Package cli-table
var Table = require("cli-table");

/* ************************************************************************************** */
/* ******************* Display all products using CLI Table ***************************** */

var ShowAllProducts = function () {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;
        var AllProductsTable = new Table({
            head: ["Item ID", "Product Name", "Department Name", "Price", "Stock Quantity"],
            colWidths: [11, 30, 30, 12, 20]
        });
        for (var i = 0; i < res.length; i++) {
            AllProductsTable.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            );
        }
        console.log(AllProductsTable.toString());
        Buy_Prompt();
    });
}

// Create a "Prompt" with a series of questions.
function Buy_Prompt() {
    inquirer.prompt([
        // Here we create an input text prompt for getting the ITEM ID.
        {
            type: "input",
            message: "Please enter the ID of the product you would like to buy.",
            name: "ITEM_ID",
            filter: Number
        },
        // Here we create an input text prompt for getting the quantity the user wants to buy.
        {
            type: "input",
            message: "How many items would you like to buy?",
            name: "BUY_QUANTITY",
            filter: Number
        },
    ]).then(function (inquirerResponse) {
        var buyQuantity = inquirerResponse.BUY_QUANTITY;
        var item = inquirerResponse.ITEM_ID;
        customerOrder(item, buyQuantity);
    });
};

// Query the bamazon database, confirm if the item is available in stock and then display the total cost.
function customerOrder(item, qty) {
    connection.query("Select * FROM products WHERE item_id =?", [item], function (err, res) {
        if (err) { console.log(err) };
        if (qty <= res[0].stock_quantity) {
            var totalCost = res[0].price * qty;
            var updatedStockQuantity = res[0].stock_quantity - qty;
            console.log("The item is available in stock!");
            console.log("Total purchase cost for " + qty + " " + res[0].product_name + " = " + "CAD " + totalCost);
            connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [updatedStockQuantity, item]);
        } else {
            console.log("Items available in stock for : " + res[0].product_name + " = " + res[0].stock_quantity);
        };
        ShowAllProducts();
    });
};
ShowAllProducts();
