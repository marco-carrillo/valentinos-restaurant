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

//********************************************/
//  The following route creates a new order  */
//  and then returns the number of the order */
//********************************************/
app.post("/api/createOrder", (req, res) =>{
  db.Order.create(req.body).then (function(order){
    res.status(200).json(order);
  })
});

//**************************************************/
//  The following route creates a new order detail */
//  and then returns the number of the order       */
//**************************************************/
app.post("/api/createOrderDetail", (req, res) =>{
  db.Order_detail.create(req.body).then (function(order){
    res.status(200).json(order);
  })
});

//*******************************************************/
//  The following route updates a table ID to occupied  */
//*******************************************************/
app.post("/api/occupyTable",(req,res)=>{
  let sql=`UPDATE tables SET occupied=true WHERE id=${req.body.id}`
          'FROM tables ' +
          'ORDER BY id ASC ;'

  db.sequelize.query(sql).then(tables => {
    res.status(200).json(tables);});
});

//*******************************************************************************/
//  The following route returns information about all of the tables, and their  */
//  associated order(if available).                                             */
//*******************************************************************************/
app.get("/api/allTablesInfo",(req,res)=>{
  let sql='SELECT tables.id AS table_id,tables.name AS table_name,tables.occupied AS table_occupied, '+
            'orders.customer_name AS customer_name,orders.total_bill AS total_bill, order_statuses.name AS order_status '+
            'FROM `tables` '+ 
            'LEFT JOIN `orders` ON orders.table_id=tables.id '+
            'LEFT JOIN `order_statuses` ON order_statuses.id=orders.status_id';

    db.sequelize.query(sql).then(tables => {res.status(200).json(tables);});
});

//********************************************************************************/
//  The following route returns sales per hour (1 row per hour with the number)  */
//  of sales and the total amount sold per hour.                                 */
//********************************************************************************/
app.get("/api/salesByHour",(req,res)=>{
  let sql='SELECT HOUR(orders.updatedAt) AS hour,COUNT(*) AS nOrders, SUM(total_bill) AS hSales ' +
          'FROM orders ' +
          'LEFT JOIN order_statuses ON order_statuses.id=orders.status_id ' +
          'GROUP BY HOUR(orders.updatedAt) ' + 
          'ORDER BY HOUR(orders.updatedAt) ASC ;'

  db.sequelize.query(sql).then(sales => {
    res.status(200).json(sales);});
});

//*****************************************************************************/
//  The following route returns all tables that are available (not occupied)  */
//*****************************************************************************/
app.get("/api/tablesAvailable",(req,res)=>{
  let sql='SELECT name, id ' +
          'FROM tables ' +
          'WHERE occupied=false '+
          'ORDER BY id ASC ;'

  db.sequelize.query(sql).then(tables => {
    res.status(200).json(tables);});
});


//*******************************************************************************/
//  The following route returns the full menu, marked by the manager as active  */
//  Only items by the manager will be returned.  Also, it will return the order */
//  for it to be presented in the menu, and the type of item.                   */
//*******************************************************************************/
app.get("/api/menu",(req,res)=>{
  let sql='SELECT t.name as type, m.id,m.name,m.price,t.menu_order '+
          'FROM meals m '+
          'LEFT JOIN meal_types t on t.id=m.meal_type_id '+
          'WHERE active=1 '+
          'ORDER BY t.menu_order ASC, m.price DESC ';
  db.sequelize.query(sql).then(menu => {
    res.status(200).json(menu);});
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
