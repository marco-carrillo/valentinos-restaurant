// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

 // Route for creating a new user
 app.post("/api/createuser", function(req, res){

  console.log(req.body);

  db.User.create(req.body).then (function(dbUser){
    res.status(200).json({});

    }).catch(function(error){
      console.log(error);
      console.log('going through the catch route');
      res.status(401).json(error);
      });
  });

//*******************************************************************************/
//  The following route returns information about all of the tables, and their  */
//  associated order(if available).                                             */
//*******************************************************************************/
app.get("/api/allTablesInfo",(req,res)=>{
    console.log('entered into the api route');

    let sql='SELECT tables.id AS table_id,tables.name AS table_name,tables.occupied AS table_occupied, '+
            'orders.customer_name AS customer_name,orders.total_bill AS total_bill, order_statuses.name AS order_status '+
            'FROM `tables` '+ 
            'LEFT JOIN `orders` ON orders.table_id=tables.id '+
            'LEFT JOIN `order_statuses` ON order_statuses.id=orders.status_id';

    db.sequelize.query(sql).then(tables => {
                                    console.log(tables);
                                    res.status(200).json(tables);
                                  });

});

//***************************************/
//  The following route logs users out  */
//  associated order(if available).     */
//***************************************/
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};
