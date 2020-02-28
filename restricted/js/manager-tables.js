//************************************************/
//  Format numbers with commas using regEdit     /
//************************************************/
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

//***************************************************************************/
//  This function creates all of the pictures representing dining tables
//***************************************************************************/
function get_table_info(){

    console.log('getting into function get_table_info')
    // ****************************************************************************************************/
    //  Getting a list of all of the tables, their statuses (occupied, available),                        */
    //  Who is the customer at the table, and how much is the total bill for the table                    */
    //  Returns:  id=table id, name=table name, customer_name, occupied=boolean, order_status, total_bill */
    //*****************************************************************************************************/
    $.get("api/allTablesInfo",{})
       .then(function(raw_data){
           console.log('got info from api/alltablesinfo');

           let tables=raw_data[0];
           console.log(tables);
           for(let i=0;i<tables.length;i++){

                //*************************************************************************/
                // Sets the table name, the customer name and the total bill infomation   */
                //*************************************************************************/
                let idtable="#table"+String(tables[i].table_id).trim();
                let customer='Available';
                let table_bill=0;
                if(tables[i].table_occupied){
                    customer=tables[i].customer_name;
                    table_bill="$"+numberWithCommas(tables[i].total_bill);
                }
                $(idtable).html(`${tables[i].table_name}</br>${customer}</br>${table_bill}</br>`);
                
                //*************************************************************************/
                // Checks if not occupied.  Automatically assigns class of table_avl     */
                // table-avl shows the table in green status and formats accordingly.    */
                //*************************************************************************/
                if(!tables[i].table_occupied) {$(idtable).attr("class","table_avl")}

                //****************************************************************************/
                // If the table is occupied, it checks the status of the order associated    */
                // with the table.  If the order is SERVED, then the class will be table_svd */
                // otherwise, it will be placed in class table_wtg                           */
                // table-svd shows table in red, table_wtg in yellow                         */
                //****************************************************************************/
                 else if(tables[i].order_status==="SERVED"){$(idtable).attr("class","table_svd")}
                    else{$(idtable).attr("class","table_wtg")}

            };  // For

        }).
            catch(function(error){
                console.log(error);
            })  // end catch
  
}  // end function


//*****************************************************************************************************/
// Main functionality.  Calls getting table information for now, and formats tables in the html file
// accordingly.  As more functionality post-MVP is added, this section will grow.
//*****************************************************************************************************/
console.log('I am executing manager-tables.js')
get_table_info();
