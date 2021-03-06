// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

//************************************************************************/
// Requiring our custom middleware for checking if a user is logged in
// All restricted routes will be checked against this route
//************************************************************************/
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  //************************************************************************/
  //  Route to get to the application route.  This is not restricted
  //************************************************************************/
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    console.log(`Requesting \ route ${req.user}`);

    if (req.user) {
      res.redirect("/members");
    }
    // res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  //************************************************************/
  //  Route to get to the login page.  This is not restricted
  //************************************************************/
  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  //******************************************************************************/
  // From now on, all of those are restricted routes.  This is where we call
  // the authentication middleware to ensure the user has been logged
  // the following are all of the manager's html routes
  //******************************************************************************/
  app.get("/manager-dashboard.html", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../restricted/manager-dashboard.html"));
  });
  //-------------------------------------------------------------------------------
  app.get("/manager-new-user.html", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../restricted/manager-new-user.html"));
  });
  //-------------------------------------------------------------------------------
  app.get("/js/create-user.js", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../restricted/js/create-user.js"));
  });
  //-------------------------------------------------------------------------------
  app.get("/manager-profitability.html", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../restricted/manager-profitability.html"));
  });
  //-------------------------------------------------------------------------------
  app.get("/manager-tables.html", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../restricted/manager-tables.html"));
  });
  //-------------------------------------------------------------------------------
  app.get("/js/manager-tables.js", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../restricted/js/manager-tables.js"));
  });
  //-------------------------------------------------------------------------------
  app.get("/js/manager-newuser.js", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../restricted/js/manager-newuser.js"));
  });
  //-------------------------------------------------------------------------------
  app.get("/js/manager-profitability.js", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../restricted/js/manager-profitability.js"));
  });
  //-------------------------------------------------------------------------------
  app.get("/manager-menu_add.html", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../restricted/manager-menu_add.html"));
  });
  //-------------------------------------------------------------------------------
  app.get("/js/manager-menu_add.js", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../restricted/js/manager-menu_add.js"));
  });
  //-------------------------------------------------------------------------------
  app.get("/manager-sales-composition.html", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../restricted/manager-sales-composition.html"));
  });
  //-------------------------------------------------------------------------------
  app.get("/js/manager-sales-composition.js", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../restricted/js/manager-sales-composition.js"));
  });
  //-------------------------------------------------------------------------------
  app.get("/manager-waterfall.html", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../restricted/manager-waterfall.html"));
  });
  //-------------------------------------------------------------------------------
  app.get("/js/manager-waterfall.js", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../restricted/js/manager-waterfall.js"));
  });
  //***************************************************/
  // the following are restricted routes for the host
  //***************************************************/
  app.get("/host-serveorder.html", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../restricted/host-serveorder.html"));
  });
  //-------------------------------------------------------------------------------
  app.get("/host-closeorder.html", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../restricted/host-closeorder.html"));
  });
  //-------------------------------------------------------------------------------
  app.get("/host-dashboard.html", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../restricted/host-dashboard.html"));
  });
  //-------------------------------------------------------------------------------
  app.get("/host-neworder.html", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../restricted/host-neworder.html"));
  });
  //-------------------------------------------------------------------------------
  app.get("/js/host-serveorder.js", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../restricted/js/host-serveorder.js"));
  });
  //-------------------------------------------------------------------------------
  app.get("/js/host-closeorder.js", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../restricted/js/host-closeorder.js"));
  });
  //-------------------------------------------------------------------------------
  app.get("/js/host-neworder.js", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../restricted/js/host-neworder.js"));
  });
  //***************************************************/
  // the following are restricted routes for the chef
  //***************************************************/
  app.get("/chef-dashboard.html", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../restricted/chef-dashboard.html"));
  });
  //-------------------------------------------------------------------------------
  app.get("/chef-actions.html", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../restricted/chef-actions.html"));
  });
  //-------------------------------------------------------------------------------
  app.get("/js/chef-dashboard.js", isAuthenticated, function(req, res) {
    console.log(path.join(__dirname, "../restricted/js/chef-dashboard.js"));
    
    res.sendFile(path.join(__dirname, "../restricted/js/chef-dashboard.js"));
  });
  //-------------------------------------------------------------------------------
  app.get("/js/chef-actions.js", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../restricted/js/chef-actions.js"));
  });
  //-------------------------------------------------------------------------------
  app.get("/valentino-family.html", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../restricted/valentino-family.html"));
  });
};
