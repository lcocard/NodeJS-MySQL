var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port;
    port: 3300,

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
var table = require("cli-table");

// Create a "Prompt" with a series of questions.
inquirer
    .prompt([
        // Here we create a basic text prompt.
        {
            type: "input",
            message: "What is your phone number?",
            name: "username"
        },
        // Here we create a basic password-protected text prompt.
        {
            type: "password",
            message: "Set your pin",
            name: "pin"
        },
        // Here we give the user a list to choose from.
        {
            type: "list",
            message: "What phone model you have?",
            choices: ["iPhone", "Samsung", "Nokia"],
            name: "phone"
        },

        {
            type: 'checkbox',
            message: "What OS?",
            choices: ["Android", "iOS"],
            name: "OS"
        },

        // Here we ask the user to confirm.
        {
            type: "confirm",
            message: "Are you sure:",
            name: "confirm",
            default: true
        }
    ])
    .then(function (inquirerResponse) {
        // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
        if (inquirerResponse.confirm) {
            console.log("\nThank you ");
            console.log("Your " + inquirerResponse.phone + "phone number" + inquirerResponse.username + " phone has been activated!\n");
        }
        else {
            console.log("\nThat's okay " + inquirerResponse.username + ", come again when you are more sure.\n");
        }
    });

/* SQL *********** */

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
});

function afterConnection() {
    connection.query("SELECT * FROM songs", function (err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
}