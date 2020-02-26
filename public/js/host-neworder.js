//************************************************/
//  Format numbers with commas using regEdit     /
//************************************************/
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

//*************************************************************/
// send the order to the main server for inmediate processing 
//*************************************************************/

function sendOrder(order,menu){
    //************************************************************************************************/
    //  order is a big string that separates all the rows with the & sign.
    //  Then, each part will be a-qty=b, where a=row, -qty=separator, and b is the quantity ordered
    //************************************************************************************************/
    let qtyOrder=order.split('&');
    let a=[];           // dummy variable to hold separators 
    let row=0;          // row for each item
    let qty=0;          // qty of each item
    let pedido=[];      // array of objects holding the actual order
    let object={};      // temporary object appended to pedido
    let total_order=0;  // total order cost

    for(let i=0;i<qtyOrder.length;i++){
        a=qtyOrder[i].split("-qty=");
        row=parseInt(a[0],10);   // This is the row number to pair with menu
        qty=parseInt(a[1],10);   // This is the quantity ordered

        if(qty>0){

            object={item_id: menu[row].id,
                    qty_item: qty,
                    total_item: qty*menu[row].price}
            pedido.push(object);
            total_order=total_order+qty*menu[row].price;
        }
    };

    //**************************************************************************************/
    //  Array of objects "pedido" has the detailed order.  We need to do two things here
    //  1)  Create an order with the totals
    //  2)  Create a detail for all individual line items
    //**************************************************************************************/

    let table_name=$("#tableSelect").val();                             // Retrieves name of the table from DOM
    let table_id=tables_available.find(x => x.name === table_name).id;  // Gets the ID from the returned server query

    let orderData={
        customer_name: $('#diner-name').val(),
        table_id: table_id,
        status_id: 1,
        host_id:1,
        chef_id:1,
        total_bill: total_order,
    };

    $.post("/api/createOrder", orderData)       // Asking server to create a new order
      .then(orderInfo=>{                        // Server returns orderInfo.id, the order number just created

        //***************************************************************************/
        //  Now, it will create the order detail so that the order can be completed
        //***************************************************************************/
        for(let i=0;i<pedido.length;i++){

            let orderData={
                order_id:    orderInfo.id,
                meal_id:     pedido[i].item_id,
                party_name:  $('#diner-name').val(),
                quantity:    pedido[i].qty_item,
                total:   pedido[i].total_item 
            };
            console.log(orderData);

            //*******************************************************/
            //  Calling the API that will create those row details
            //*******************************************************/
            $.post("/api/createOrderDetail",orderData)
              .then(orderInfo=>{
                  console.log(orderInfo);

                //****************************************************************************/
                //  Now, we need to call the API that will update that the table is occupied
                //  Then it will call the function that cleans all of the data so that another
                //  order can be done. 
                //****************************************************************************/
                console.log(`calling to occypy ${table_id}`);
                $.post("/api/occupyTable",{id: table_id})
                    .then(orderInfo=>{
                        console.log(orderInfo);
                        usrAlert("Success!!!!","Order Created","Let's eat!!!",2,true);   // Message.  2 means success
                        
                    });  //  End of call to update occupyTable
              });       // End of call to createOrderDetail
        };   //  End of loop asking for details
       });  //  End of call to make order
}  // End of function


//*********************************************************************************/
//  Main functionality.  Starts first by calling to the API to ensure a
//  table is ready and available.  If there are no tables unoccupied, it exists  
//*********************************************************************************/

let tables_available=[];
$.get("/api/tablesAvailable",{})
    .then(raw_data=>{
        tables_available=raw_data[0];
        console.log(tables_available);
        if(tables_available.length<=0){
            usrAlert("No tables available","All tables are occupied at the moment, please tell your guest to try again later","oh no!!!!",1,false);
            return;
        };

        //*****************************************************************************/
        //  Now that we know that tables are available, we will add them to the DOM   */
        //*****************************************************************************/
        let newTable;
        for(let i=0;i<tables_available.length;i++){
            newTable=$("<option>").text(tables_available[i].name);
            $("#tableSelect").append(newTable);
        };

        //*************************************************************************************************************/
        //  Now, we will call the server asking for the menu.  Getting hungry trying to get this darn thing to work   */
        //*************************************************************************************************************/
        $.get("/api/menu",{}).
            then(all_data=>{

                let menu=all_data[0];     // Sequelize returns 2 identical sets, only choosing the first one

                //****************************************************************************************************/
                // The data is already sorted by how it will be used, so right now just appending to the dataTable   */
                //****************************************************************************************************/
                for(let i=0;i<menu.length;i++){

                    let newRow  = $("<tr>").attr("class", "item").attr("data-index", i);            // header.  ID for identification later on
                    let newtype =$("<td>").text(menu[i].type);                                      // Type
                    let newId   =$("<td>").text(menu[i].id);                                        // Id
                    let newitem =$("<td>").text(menu[i].name);                                      // Name
                    let newprice=$("<td>").text("$"+numberWithCommas(parseInt(menu[i].price)));     // Price
                    let row=i.toString().trim();
                    let newqty  =$("<td>").html(`<input type="text" id="${row}-qty" name="${row}-qty" value="0">`);

                    // let newqty  =$("<td>").attr("type","text").attr("id",`row-${i}-qty`).attr("name",`row-${i}-qty`).attr("value","0");

                    newRow.append(newtype);
                    newRow.append(newId);
                    newRow.append(newitem);
                    newRow.append(newprice);
                    newRow.append(newqty);
                    $("#menuTable").append(newRow);
                }

                //*******************************************/
                // Following, we will initialize dataTable  */
                //*******************************************/
                $(document).ready(function() {
                    var table=$('#menuTable').DataTable({
                        ordering: false,
                        columnDefs: [{
                            orderable: false,
                            targets: [4]
                        }]
                    });    // let table=

                    //***********************************************/
                    // Assigning click events to the submit button  */
                    //***********************************************/
                    $('#submitOrder').click( function() {
                        let data = table.$('input, select').serialize();
                        sendOrder(data,menu);
                        return false;
                    } );
                });        // document.ready
            }).
                catch(error=>{
                    console.log(error);
                });
            });  // All tables call
