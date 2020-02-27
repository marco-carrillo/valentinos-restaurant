//*****************************************************************/
//  This function calls the API to change to a specific status
//****************************************************************/
function chgOrderStatus(newStatus){
    $.post("/api/changeOrderStatus",{id:order[0].id, status_id:newStatus})
        .then(all_data=>{
            usrAlert("Order changed","Your order status has been changed","Score!!!!",2,false);
            setTimeout(window.location.href = "chef-dashboard.html",5000);
        })
}

//**************************************************************/
//  This function changes the status order from NEW to COOKING */
//**************************************************************/
function sendToCook(){
    console.log('cooking');
    chgOrderStatus(2);
}

//****************************************************************/
//  This function changes the status order from COOKING TO READY */
//****************************************************************/
function sendToServe(){
    chgOrderStatus(3);
}

//****************************************************/
//  This function changes the status order TO CLOSED */
//****************************************************/
function sendToTrash(){
    chgOrderStatus(5);
}

//********************************************************************************/
// Main functionality.  First, it goes to local storage to retrieve order number */ 
//********************************************************************************/
let order_id=JSON.parse(localStorage.getItem("current_order"));
let order=[];

//********************************************************************/
//  makes an API call to find out all of the orders for the kitchen  */
//  that is, orders that have been ordered but not prepared yet.     */
//********************************************************************/

$.post("/api/orderDetails",{id: order_id}).
    then(all_data=>{

        order=all_data[0];                             // Sequelize returns 2 identical sets, only choosing the first one

        //**********************************************/
        //  Will write header to message for kitchen   */
        //**********************************************/
        $("#orderInformation").html(`<p>Order #: ${order[0].id}</p><p>Guest :  ${order[0].customer_name} </p>Table : ${order[0].tables}<br>Total bill ${order[0].total_bill}<br>Ordered at ${order[0].ordered}`);
        console.log(order);

        //*************************************************/
        // Now, it will show the details of the order    */
        //************************************************/
        for(let i=0;i<order.length;i++){
            let newRow   =$("<tr>").attr("data-index", i);                    // header.  ID=name for identification later on
            let newMId   =$("<td>").text(order[i].meal_id);                  // Item #
            let newMName =$("<td>").text(order[i].meal);                     // Item name
            let newStatus=$("<td>").text(order[i].status);                   // status
            let newQty   =$("<td>").text(order[i].quantity);                 // Quantity
            let newCost  =$("<td>").text("$"+order[i].item_total);           // Item total

            newRow.append(newMId);
            newRow.append(newMName);
            newRow.append(newStatus);
            newRow.append(newQty);
            newRow.append(newCost);
            $("#orderList").append(newRow);
        }

        $(document).ready(function() {

        //***************************************/
        // Following, we will initialize table  */
        //***************************************/
        $('#orderList').DataTable();

        //***********************************************/
        // Assigning click events to the submit button  */
        //***********************************************/
        $("#toCook").click(sendToCook);
        $("#toServe").click(sendToServe);
        $("#toTrash").click(sendToTrash);
            
        });
    }).
        catch(error=>{
            console.log(error)});


