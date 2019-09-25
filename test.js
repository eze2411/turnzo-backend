var mysql = require('mysql');

var con = mysql.createConnection({
  host: "turnzo-dev.cumg0vjkzfqu.us-east-2.rds.amazonaws.com",
  user: "espertmilei",
  password: "46bi]MhHUM.^0Uyn"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});