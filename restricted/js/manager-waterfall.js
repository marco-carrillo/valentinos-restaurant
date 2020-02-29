
let salesDay ={
    id: "",
    subvalues: [
       {
          id: "category1",
          name: "Category 1",
          value: 400,
          offset: 0
       },
       {
          id: "category2",
          name: "Category 2",
          value: 200,
          offset: 400
       },
       {
          id: "category3",
          name: "Category 3",
          value: 100,
          offset: 600
       },
       {
          id: "category4",
          name: "Category 4",
          value: 50,
          offset: 700
       },
       {
          id: "category5",
          name: "Category 5",
          value: 50,
          offset: 750
       },
       {
          id: "Total",
          name: "Total",
          value: 800,
          offset: 0
       }
    ]
 }




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
            name: "Data",
            data: {
                field: "value"
            },
            stack: "default",
            style: {
                fillColor: "#b10400"
            },
            type: "columns"
        }
    ],
    "style": [],
    container: "salesWaterfall",
    data: [
        {
            preloaded:salesDay
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
    }
});
chart.updateSettings({area: { height:450, width:1200 }});
