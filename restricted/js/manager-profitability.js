//************************************************/
//  Format numbers with commas using regEdit     /
//************************************************/
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};


//*******************************************************************************/
// Main functionality.  The following code will be run automatically 
//*******************************************************************************/

//***********************************************************************************************/
//  This is the cummulative statistics of prior sales.  Reads as follows:  If right now, it is  */
//  14:00 hours, historically, sales from start to right now should be ~ 20%.  Therefore, to    */
//  get an approximation of full day's sales, we will divide sales today until 2:00 PM by 20%   */
//***********************************************************************************************/
let sales_stats=[
    {hour:  "8:00",hourN:8,sales:.05,hSales:0.05,dSales:500},
    {hour:  "9:00",hourN:9,sales:.10,hSales:0.05,dSales:500},
    {hour:  "10:00",hourN:10,sales:.18,hSales:0.08,dSales:500},
    {hour:  "11:00",hourN:11,sales:.20,hSales:0.02,dSales:500},
    {hour:  "12:00",hourN:12,sales:.25,hSales:0.05,dSales:500},
    {hour:  "13:00",hourN:13,sales:.32,hSales:0.07,dSales:500},
    {hour:  "14:00",hourN:14,sales:.35,hSales:0.03,dSales:500},
    {hour:  "15:00",hourN:15,sales:.38,hSales:0.03,dSales:500},
    {hour:  "16:00",hourN:16,sales:.42,hSales:0.04,dSales:500},
    {hour:  "17:00",hourN:17,sales:.60,hSales:0.18,dSales:500},
    {hour:  "18:00",hourN:18,sales:.85,hSales:0.25,dSales:500},
    {hour:  "19:00",hourN:19,sales:.92,hSales:0.07,dSales:500},
    {hour:  "20:00",hourN:20,sales:.98,hSales:0.06,dSales:500},
    {hour:  "21:00",hourN:21,sales:.100,hSales:0.02,dSales:500},

];


//*****************************************************************/
//  makes an API call to find out total sales per hour for today  */
//*****************************************************************/

$.get("/api/salesByHour",{}).
    then(all_data=>{

        //******************************************************************************************/
        // Using the statistics matrix to get sales per hour.  If no sales, then $0 for that hour  */
        // starts by checking what time it is and then going from there                            */
        //******************************************************************************************/
        let sales_hour=all_data[0];                         // Sequelize returns 2 identical sets, only choosing the first one
        let current_hour=Number(moment().format('HH'));     // Current hour

        //***********************************************************************/
        // Calculating actual sales for the day, and future sale for the day    */
        //***********************************************************************/
        let day_sales=0;               
        let total_day_sales=0;                                                                   // total day sales forecast
        for(let i=0;i<sales_hour.length;i++){day_sales=day_sales+Number(sales_hour[i].hSales)};  // Getting total sales since opening
        let hrIdx=sales_stats.findIndex(x => x.hourN === current_hour);                          // Looking for the hour right now to get stats
        if(hrIdx===-1){
            total_day_sales=day_sales;    // If not found, assumes outside business hours.
        } else {
            total_day_sales=parseInt(day_sales/sales_stats[hrIdx].sales);
        };

        //********************************************************/
        //  Updates total sales per hour for the manager to see  */
        //********************************************************/
        let total_day_sales_fmt=numberWithCommas(total_day_sales);
        $("#salesMsg").text(`Total sales forecast for today $${total_day_sales_fmt}`);

        //***********************************************************/
        // Now, it will get total data/forecast for the full day    */
        //***********************************************************/
        for(let i=0;i<sales_stats.length;i++){
            let newRow = $("<tr>").attr("class", "rowHour").attr("data-index", i);   // header.  ID=name for identification later on
            let newchkbox=$("<td>");                                                         // empty, please leave it for the checkbox
            let newHour=$("<td>").text(sales_stats[i].hour);                                 // Hour

            //******************************************************************************/
            // Checks if there were sales for the results returned.  If not, zeros         */
            //******************************************************************************/
            let newOrders=$("<td>").text("0");
            let newSales=$("<td>").text("0");
            let newType=$("<td>").text("Actual");

            let hrIndex=sales_hour.findIndex(x => x.hour === sales_stats[i].hourN);
            if (hrIndex!==-1){
                newOrders=$("<td>").text(sales_hour[hrIndex].nOrders);
                newSales=$("<td>").text("$"+numberWithCommas(sales_hour[hrIndex].hSales));
            };

            //******************************************************************************/
            // Checks if this iteration is an actual sales, or it is a forecasting value   */
            // If the hour is higher than current, then forecasting starts                 */
            //******************************************************************************/
            if(sales_stats[i].hourN>(current_hour)){
                let hrSalesFcst=total_day_sales*sales_stats[i].hSales;
                newSales=$("<td>").text("$"+numberWithCommas(hrSalesFcst.toFixed(0)));
                newType=$("<td>").text("Forecast");
            }

            newRow.append(newchkbox);
            newRow.append(newHour);
            newRow.append(newOrders);
            newRow.append(newSales);
            newRow.append(newType);
            $("#tableList").append(newRow);
        }

        //***************************************/
        // Following, we will initialize table  */
        //***************************************/
        $(document).ready(function() {
            $('#dataTableList').DataTable({"paging": false});
        } );
    }).
        catch(error=>{
            console.log(error);
        });

// Assigning click events to all buttons
// $("#editStrategy").on("click", editStrategy);
// $(document).on("click",".select-checkbox",checkbox_clicked);