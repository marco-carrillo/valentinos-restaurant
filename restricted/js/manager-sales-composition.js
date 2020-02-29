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
        let arrWf0=[];
        let arrWf1=[];
        let arrWf2=[];
        let arrWf3=[];
        let arraySales=[];
        let arrayWtrfall=[];
        let item={name:"",value:0};
        let name=["","","",""];
        let total=[0,0,0,0];

        for(let i=0;i<salesData.length;i++){
            item0={name: salesData[i].meal , value: parseInt(salesData[i].meals_total)};  // Creates Object
            item1={name: salesData[i].meal , value: parseInt(salesData[i].meals_total),offset:0};  // Creates Object

            switch (salesData[i].category_id){
                case 1:
                    array0.push(item0);   // For piechart
                    arrWf0.push(item1);   // For waterfall
                    name[0]=salesData[i].category;
                    total[0]=total[0]+parseInt(salesData[i].meals_total);
                    break;
                case 2:
                    array1.push(item0);   // For piechart
                    arrWf1.push(item1);   // For waterfall
                    name[1]=salesData[i].category;
                    total[1]=total[1]+parseInt(salesData[i].meals_total);
                    break;
                case 3:
                    array2.push(item0);   // For piechart
                    arrWf2.push(item1);   // For waterfall
                    name[2]=salesData[i].category;
                    total[2]=total[2]+parseInt(salesData[i].meals_total);
                    break;
                case 4:
                    array3.push(item0);   // For piechart
                    arrWf3.push(item1);   // For waterfall
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
            arraySales.push({name: name[0],value:  total[0],subvalues: array0});        //  Pie chart
            arrayWtrfall.push({id: name[0],name: name[0], value:total[0], offset:0,subvalues: arrWf0});   //  Waterfall chart
        };
        if(array1.length>0){
            arraySales.push({name: name[1],value:  total[1],subvalues: array1});   // Pie chart
            arrayWtrfall.push({id: name[1],name: name[1], value:total[1], offset:total[0],subvalues: arrWf1});   //  Waterfall chart
        };
        if(array2.length>0){
            arraySales.push({name: name[2],value:  total[2],subvalues: array2});   // Pie chart
            arrayWtrfall.push({id: name[2],name: name[2], value:total[2], offset:total[0]+total[1],subvalues: arrWf2});   //  Waterfall chart
        };
        if(array3.length>0){
            arraySales.push({name: name[3],value:  total[3],subvalues: array3});   // Pie chart
            arrayWtrfall.push({id: name[3],name: name[3], value:total[3], offset:total[0]+total[1]+total[2],subvalues: arrWf3});   //  Waterfall chart
        };

        let total_array=array0.concat(array1).concat(array2).concat(array3);
        arrayWtrfall.push({id: "Total",name: "Total", value:total[0]+total[1]+total[2]+total[3],offset:0,subvalues:total_array});   //  Waterfall chart
        //******************************************************************/
        // After arrays have been built, then we will construct the object
        //******************************************************************/
        let salesDay={ "subvalues": arraySales };
        let salesWF ={ id: "","subvalues": arrayWtrfall};
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
            },

            slice: {
                style: {
                    label: {
                        backgroundStyle: {
                            lineColor: "blue",
                            fillColor: "#77c277",
                            shadowBlur: 4,
                            shadowColor: "#000000"
                        },
                        padding: 15,
                        borderRadius: 7
                    },
                    insideLabel: {
                        textStyle: {
                            font: "16px Arial",
                            fillColor: "rgba(200,255,200,0.1)",
                            shadowColor: "#000000"
                        }
                    }
                }
            } // slice

        });    // PieChart object
        chart.updateSettings({area: { height:450, width:1200 }});

        //*****************************************/
        //  Waterfall chart is being built now
        //*****************************************/
        chart= new FacetChart({
            series: [
                {
                    name: "",
                    data: {
                        field: "offset"
                    },
                    stack: "default",
                    style: {
                        fillColor: "transparent"
                    },
                    type: "columns"
                },
                {

                    valueLabels: {
                        enabled: true,
                        position: "aboveValue",
                        style: {
                            textStyle: {
                                font: "16pt Arial"
                            },
                            backgroundStyle: {
                                lineColor: "#ccc",
                                lineWidth: 1,
                                fillColor: "rgba(200,200,200,0.5)"
                            },
                            borderRadius: 2
                        },
                        contentsFunction: function (value) { return "$"+value.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
                    }, // valuelabels

                    name: "Data",
                    data: {
                        field: "value"
                    },
                    stack: "default",
                    style: {
                        fillColor: "#b10400"
                    },
                    type: "columns"
                },
                
            ],
            "style": [],
            container: "salesWaterfall",
            data: [
                {
                    preloaded:salesWF
                }
            ],
            toolbar: {
                fullscreen: true,
                enabled: true
            },
            interaction: {
                resizing: {
                    enabled: false
                }
            },
            facetAxis: {
                defaultUnitWidth: 100
            },
            area: { height:450, width:1200 }
        });
        // chart.updateSettings({area: { height:450, width:1400 }});
    });  // API call

