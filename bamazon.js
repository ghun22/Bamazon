var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
  }
  start();
});

function start() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    console.log(
      "----------------------------------------------------------------------------------------------------"
    );

    for (var i = 0; i < res.length; i++) {
      console.log(
        "ID: " +
          res[i].item_id +
          " | " +
          res[i].product_name +
          " | " +
          "Department: " +
          res[i].department_name +
          " | " +
          "Price: " +
          res[i].price +
          " | " +
          "QTY: " +
          res[i].stock_quantity
      );
      console.log(
        "--------------------------------------------------------------------------------------------------"
      );
    }

    wantToBuy(res);
  });
}

function wantToBuy(inventory) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message:
          "What is the item that you would like to purchase? (select by ID)(Q to quit)",
        validate: function(val) {
          return !isNaN(val) || val.toLowerCase() === "q";
        }
      }
    ])
    .then(function(val) {
      quit(val.choice);
      var choiceId = parseInt(val.choice);
      var product = checkInventory(choiceId, inventory);
      if (product) {
        promptCustomerForQuantity(product);
      } else {
        // Otherwise let them know the item is not in the inventory, re-run loadProducts
        console.log("\nThat item is not in the inventory.");
        start();
      }
    });
}

function promptCustomerForQuantity(product) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "How many would you like? (Q to quit)",
        validate: function(val) {
          return val > 0 || val.toLowerCase() === "q";
        }
      }
    ])
    .then(function(val) {
      quit(val.quantity);
      var quantity = parseInt(val.quantity);

      if (quantity > product.stock_quantity) {
        console.log("\nInsufficient quantity!\n\n\n\n");
        start();
      } else {  
        makePurchase(product, quantity,);
      }
    });
}

function makePurchase(product, quantity, price) {
  connection.query(
    "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
    [quantity, product.item_id],
    function(err, res) {
      console.log(
        product.product_name   +  " is going to be " + quantity*product.price + "in total!! \n" +
        "\nSuccessfully purchased " +
          quantity +
          " " +
          product.product_name +
          "'s! \n\n\n\n"
      );
      start();
    }
  );
}



function checkInventory(choiceId, inventory) {
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].item_id === choiceId) {
      return inventory[i];
    }
  }
  return null;
}

function quit(choice) {
  if (choice.toLowerCase() === "q") {
    // Log a message and exit the current node process
    console.log("Thank You for shopping with bamazon I hope to see you again! goodbye!");
    process.exit(0);
  }
}
