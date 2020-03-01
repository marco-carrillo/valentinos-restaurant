# Purpose of the application

Valentino restaurant application allows the restaurant to run a paperless operation and allows managers to evaluate sales composition and monitor the efficiency of the operation real-time.

It has two parts:  the public area and the Valentino's area.

The public area is an adaptation of the RedCayenne restaurant template, we are not claiming credit, and the licenses is free as long as we continue to display credits on the lower left corner.  Some effort was done to eliminate the Ipso language as much as possible, but all of the available resources was prioritized on building the restricted area functionality.

The restricted area was developed by our team, using the theme of the RedCayenne template to create a coherent look and feel of the application.

The rest of this manual will explain the restricted area functionality.

## Access to the application

Application has been deployed to https://valentino-restaurant.herokuapp.com/

Choose the menu option "About us", then "Staff login".  You will be redirected to the login.  Enter e-mail address "bootcamp@gmail.com" and password "12345".

Upon a successful login you will be taken to three areas:  
*  Manager menu
*  Host menu
*  Chef menu

##  Undertanding the operation lifecycle

Our application revolves around the customer, and the customer order is the proxy to our application about the customer status.  Therefore, our database was created to be order-centric, and the order table can be related to each of the seven other orders.

Within the order table, the integrity of the status, allows the application to present the relevant options/orders.  As a result, the order status changes depending on the life-cycle of the order.

The sequence or "happy path" of an order (only path considered during the MVP, other workflows can include complaints about the food, tastiness, customer service, manager intervention, etc.)

1.  Host takes a order.  New order is created with the status of NEW.
2.  Kitchen obtains the order (constantly monitoring it through timed refreshes) and can see all orders that are NEW.  Kitchen can see details and signals when the order is READY.  Order status changes as a result.
3.  Host has an option to look for orders that are READY for pickup (post-MVP, real-time notification).  takes the order to be SERVED to the customer.  Order status changes accordingly.
4.  When the customer wants to leave, Host has another option to CLOSE the order.  Customer pays (payment is post-MVP) and order is CLOSED.


##  Host menu

The host menu allows the hos to 1) Create a new order, 2) Serve an order, r 3) Close an order.

1. New order   :  First of all, the program checks all of the "tables" table to ensure there are tables unoccupied.  If so, host needs to select which table this order is associated to.  Only tables availables will be shown for selection in the drop-down list.  Then, it fetches all of the records in the table "meals" to present the host with the menu.  The menu is searcheable and filterable so that a smaller list can be presented, for instance if customer asks for what wines are available.  There is a field where the host can enter the quantity of the each menu item orderd.  Once the host takes the order and clicks the "Place order" button, two things will happen:  1) creates a new order, 2) places the table in "ocuppied" status.
2. Serve order :  Shows the host a list of all orders with the READY status.  Host selects the order to be SERVED.  The order dissappears from the list.
3. Close order :  Shows the host a list of all orders with the SERVED status.  Host selects the order to be CLOSED.  The order dissapears from the list.

## Chef menu manager

The chef menu is the simplest, as its only function is to loo for order that are in READY status.  The chef is presented with a list of all orders from which to choose.  Once an order has been chosen, the details are displayed (customer, table, and the individual items ordered).

Once the order is ready, the Chef selects to place the order in READY to serve status.

The Chef is then redirected to the list of orders in NEW status.  All orders promoted to READY status are no longer shown on the table.

##  Manager Menu

The manager is responsible for the profitability and proper operation of the restaurant.  Consequently, it has the following five choices:

1. Add a user:  Can add a user to the table.  This is minimalistic as only three data points are needed:  e-mail, password, and role (manager, chef, host).
2. Add a menu item:  Can add a menu item.  Any items added will automatically shown to the host for creating a new order.  All attributes are specified by the manager, including time to prepare, cost, price, type of item.  All that data is needed for future development.
3. Tables:  Manager can see the overall status of all of the nine tables available.  The manager can see a rectangule push-button-like figure that represents each table.  On it, there will be information about the table number, the diner, the total bill.  The color of the table will depend on the order status associated with the table.  If the order has been taken but not SERVED, then it will be YELLOW.  It changes to RED when the order for that table is SERVED.  If the table is not occupied, it shows as GREEN.
4. Sales Forecast:  The application takes all sales to date, and uses sales statistics to project how the day will end.  For now, the statistic numbers have been adapted from a specific sales cycle, however, post-MVP, and once we have more than 35 days of full sales operations, a new sales curve will be created dynamically.  This option works well in the local server, however in Heroku, timestamps are in UTC time while the application works in local time.  Therefore, don't expect this function to work as well.  We will research and try to patch this bug that was discovered just recently.
5. Sales today:  It takes the sales and filters them by the day.  For your convenience, we will include all sales (not just today) otherwise you would have to enter sales in order to see this functionality.  It shows two graphs:  a cummulative waterfall and a pie chart.  It shows the sales by item type (main courses, wines, coffee, water) and they can be drilled down.  On the waterfall, just click the category you would like, and it will show the specific items that compose the sales.  To go back, click on the "back" button.  For the pie chart, click on the section you would like to see details, and it will show percentages by the products that compose it.  To go back, click on the center of the pie.

##  Overall application demonstration

![GIF of input](./valentino-demo.gif)


