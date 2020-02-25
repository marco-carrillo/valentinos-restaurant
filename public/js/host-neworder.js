


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

    let orderData={
        customer_name: $('#diner-name').val(),
        table_id: $('#table-number').val(),
        status_id: 1,
        host_id:1,
        chef_id:1,
        total_bill: total_order,
    };

    console.log(orderData);
    $.post("/api/createOrder", orderData)       // Asking server to create a new order
      .then(orderInfo=>{                        // Server returns orderInfo.id, the order number just created

        //************************************************************************/
        //  Now, it will call the order detail so that a new detail can be done
        //************************************************************************/
        for(let i=0;i<pedido.length;i++){

            let orderData={
                order_id:    orderInfo.id,
                meal_id:     pedido[i].item_id,
                party_name:  $('#diner-name').val(),
                quantity:    pedido[i].qty_item,
                total:   pedido[i].total_item 
            };
            console.log(orderData);
            $.post("/api/createOrderDetail",orderData)
              .then(orderInfo=>{
                  console.log(orderInfo);
              });  // End of call to createOrderDetail

        }   //  End of loop asking for details
       });  //  End of call to make order
}  // End of function


//**************************************************************************/
//  Main functionality.  Starts first by
//  making an API call to get all of the menu marked by manager as active  */
//**************************************************************************/

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

        //***************************************/
        // Following, we will initialize table  */
        //***************************************/
        $(document).ready(function() {
            // $('#menuTable').DataTable();
            var table=$('#menuTable').DataTable({
                ordering: false,
                columnDefs: [{
                    orderable: false,
                    targets: [4]
                }]
            });    // let table=

            $('#submitOrder').click( function() {
                let data = table.$('input, select').serialize();
                console.log("my data:",data.substr);
                sendOrder(data,menu);
                return false;
            } );
        });        // document.ready
    }).
        catch(error=>{
            console.log(error);
        });

//***********************************************/
// Assigning click events to the submit button  */
//***********************************************/

// $("#submitOrder").on("click", sendOrder);

