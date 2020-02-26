//************************************************************************************************/
//  This function 1) checks that a selection has been made, and if so, loads another HTML file
//************************************************************************************************/
function getDetails(){
    let orderSelected = $('#orderList').find('.selected');  // Which row was selected?
    console.log(orderSelected[0].cells[1].textContent);
    if(orderSelected.length===0){
        usrAlert("No selection was made","You need to select at least one order to continue","Got it chief!!!",1,false)
    } else if (orderSelected.length>1){
        usrAlert("More than one selection was made","No more than one selection can be checked at the same time","Got it chief!!!",1,false)
    } else{
        localStorage.setItem("current_order",JSON.stringify(orderSelected[0].cells[1].textContent));  // Saves it so that the next window picks it up
        window.location.href = "chef-actions.html";
    };
}

function getsKitchenOrders(){
//********************************************************************/
//  makes an API call to find out all of the orders for the kitchen  */
//  that is, orders that have been ordered but not prepared yet.     */
//********************************************************************/

$.get("/api/kitchenOrders",{}).
    then(all_data=>{

        let orders=all_data[0];                             // Sequelize returns 2 identical sets, only choosing the first one

        //*********************************************************************/
        // Now, it will show the full table with all of the pending orders    */
        //*********************************************************************/
        for(let i=0;i<orders.length;i++){
            let newRow   =$("<tr>").attr("data-index", i);                    // header.  ID=name for identification later on
            let newChkBox=$("<td>");
            let newOrder =$("<td>").text(orders[i].id);                      // Order #
            let newCustom=$("<td>").text(orders[i].customer_name);           // customer name
            let newTable =$("<td>").text(orders[i].tables);                  // table name
            let newStatus=$("<td>").text(orders[i].status);                  // status name
            let newTBill =$("<td>").text("$"+orders[i].total_bill);              // total bill
            let newTOrder=$("<td>").text(orders[i].ordered);                 // Time ordered

            newRow.append(newChkBox);
            newRow.append(newOrder);
            newRow.append(newCustom);
            newRow.append(newTable);
            newRow.append(newStatus);
            newRow.append(newTBill);
            newRow.append(newTOrder);
            $("#orderList").append(newRow);
        }

        $(document).ready(function() {

        //***************************************/
        // Following, we will initialize table  */
        //***************************************/
        $('#orderList').DataTable( {
                columnDefs: [ {
                    orderable: false,
                    className: 'select-checkbox',
                    targets:   0
                } ],
                select: {
                    style:    'os',
                    selector: 'td:first-child'
                },
                order: [[ 1, 'asc' ]]
            } );

            //***********************************************/
            // Assigning click events to the submit button  */
            //***********************************************/
            $('#orderDetails').click( function() {
                getDetails();
                return false;
            } );
        } );
    }).
        catch(error=>{
            console.log(error)});

};  // end of function


//*******************************************************************************/
// Main functionality.  The following code will be run automatically 
//*******************************************************************************/
getsKitchenOrders();      // Loading all of the kitchen orders;
