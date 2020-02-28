//************************************************/
//  Format numbers with commas using regEdit     /
//************************************************/
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

//*****************************************************/
//  Makes a call to the API to get all sales to date
//*****************************************************/
$.get("/api/salesToday",{}).
    then(raw_data=>{
        salesData=raw_data[0];  //  Sequelize returns an array of 2 identical data sets

        //****************************************************************************/
        //  Now we will pre-load this information into a new object for zoom charts
        //****************************************************************************/
        let lastCat=salesData[0].category_id;
        let curtCat=salesData[0].category_id;
        let array0=[];
        let array1=[];
        let array2=[];
        let array3=[];
        let arraySales=[];
        let item={name:"",value:0};
        let name=["","","",""];
        let total=[0,0,0,0];

        for(let i=0;i<salesData.length;i++){
            item={name: salesData[i].meal , value: parseInt(salesData[i].meals_total)};  // Creates Object

            switch (salesData[i].category_id){
                case 1:
                    array0.push(item);
                    name[0]=salesData[i].category;
                    total[0]=total[0]+parseInt(salesData[i].meals_total);
                    break;
                case 2:
                    array1.push(item);
                    name[1]=salesData[i].category;
                    total[1]=total[1]+parseInt(salesData[i].meals_total);
                    break;
                case 3:
                    array2.push(item);
                    name[2]=salesData[i].category;
                    total[2]=total[2]+parseInt(salesData[i].meals_total);
                    break;
                case 4:
                    array3.push(item);
                    name[3]=salesData[i].category;
                    total[3]=total[3]+parseInt(salesData[i].meals_total);
                    break;
            };   // switch
        };       // for
        
        //*******************************************************************/
        //  Building the detailed object once we have the arrays as we want
        //  we always check that there are sales for each category
        //*******************************************************************/
        if(array0.length>0){
            arraySales.push({name: name[0],value:  total[0],subvalues: array0});
        };
        if(array1.length>0){
            arraySales.push({name: name[1],value:  total[1],subvalues: array1});
        };
        if(array2.length>0){
            arraySales.push({name: name[2],value:  total[2],subvalues: array2});
        };
        if(array3.length>0){
            arraySales.push({name: name[3],value:  total[3],subvalues: array3});
        };
        
        //******************************************************************/
        // After arrays have been built, then we will construct the object
        //******************************************************************/
        let salesDay={ "subvalues": arraySales };
        $("#salesMsg").text(`Total sales today $${numberWithCommas(total[0]+total[1]+total[2]+total[3])}`);
        $("#salesHdr").text(`Today's sales distribution $${numberWithCommas(total[0]+total[1]+total[2]+total[3])}`);

        //****************************/
        // Then, to build the chart  */
        //****************************/
        chart= new PieChart({
            pie: {
                innerRadius: 70
            },
            container: "salesPieChart",
            data: {
                preloaded:salesDay
            },
            toolbar: {
                fullscreen: false,
                enabled: true
            },
            interaction: {
                resizing: {
                    enabled: false
                }
            }
        });    // PieChart object
        chart.updateSettings({area: { height:450, width:1200 }});
    });  // API call

