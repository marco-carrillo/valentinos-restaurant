//***********************************************************************************************/
//  When user selects a row, following function enables/disables buttons, and then it writes     /
//  selected row to local storage for other users to know which strategy was selected            /
//***********************************************************************************************/
function checkbox_clicked(){
    var slected = $('#TradingStrategiesList').find('.selected');  // Which row was selected?
    if(slected.length===0){  // This means, the user de-selected an option, disabling buttons

        $("#runStrategy").attr("disabled",true);
        $("#run-str-fnt").attr("class","fas fa-fighter-jet mt-0")
  
        $("#editStrategy").attr("disabled",true);
        $("#edt-str-fnt").attr("class","fas fa-pencil-alt mt-0")
  
        $("#deleteStrategy").attr("disabled",true);
        $("#dlt-str-fnt").attr("class","far fa-trash-alt mt-0")
        return;   // Goes back to main
    };  

      // enables buttons, makes them bigger
      $("#runStrategy").attr("disabled",false);
      $("#run-str-fnt").attr("class","fas fa-2x fa-fighter-jet mt-0")

      $("#editStrategy").attr("disabled",false);
      $("#edt-str-fnt").attr("class","fas fa-2x fa-pencil-alt mt-0")

      $("#deleteStrategy").attr("disabled",false);
      $("#dlt-str-fnt").attr("class","far fa-2x fa-trash-alt mt-0")

      // saves name of selected strategy to local storage
      localStorage.setItem("selectedStrategy",slected[0].cells[1].textContent);
    };


//***************************************************************************************/
//  The following function calls the code so that the selected strategy can be edited
//***************************************************************************************/

function editStrategy() {
    // finding the strategy that was checked
    var index = $("#TradingStrategiesList").find(".selected").data(all_strategies).data(index)
    localStorage.setItem("edit-strategy", JSON.stringify(index));

    window.location = "trading-main-edit.html";

};

//*******************************************************************************/
// Main functionality.  The following code will be run automatically 
//*******************************************************************************/
alert('Executing');

let all_data=[
    {name:  "Name 1",desc:"Desc 1",date_created:"Date created 1",date_edited:"Date edited 1",date_used:"Date used 1"},
    {name:  "Name 2",desc:"Desc 2",date_created:"Date created 2",date_edited:"Date edited 2",date_used:"Date used 2"},
    {name:  "Name 3",desc:"Desc 3",date_created:"Date created 3",date_edited:"Date edited 3",date_used:"Date used 3"},
    {name:  "Name 4",desc:"Desc 4",date_created:"Date created 4",date_edited:"Date edited 4",date_used:"Date used 4"},
    {name:  "Name 5",desc:"Desc 5",date_created:"Date created 5",date_edited:"Date edited 5",date_used:"Date used 5"},
    {name:  "Name 6",desc:"Desc 6",date_created:"Date created 6",date_edited:"Date edited 6",date_used:"Date used 6"},
    {name:  "Name 7",desc:"Desc 7",date_created:"Date created 7",date_edited:"Date edited 7",date_used:"Date used 7"},
    {name:  "Name 8",desc:"Desc 8",date_created:"Date created 8",date_edited:"Date edited 8",date_used:"Date used 8"},
]

if(all_data!==null){
        for(let i=0;i<all_data.length;i++){
            let newstrat = $("<tr>").attr("id", all_data[i].name).attr("data-index", i);     // header.  ID=Strat name for identification later on
            let newchkbox=$("<td>");                                                         // empty, please leave it for the checkbox
            let newname=$("<td>").text(all_data[i].name);                                    // strategy name
            let newdesc=$("<td>").text(all_data[i].desc);                                    // strategy description
            let created=$("<td>").text(all_data[i].date_created);                            // Date created
            let edited=$("<td>").text(all_data[i].date_edited);                              // Date last edited
            let used=$("<td>").text(all_data[i].date_used);                                  // Date last used
            newstrat.append(newchkbox);
            newstrat.append(newname);
            newstrat.append(newdesc);
            newstrat.append(created);
            newstrat.append(edited);
            newstrat.append(used);
            $("#table-list").append(newstrat);
        }
}

// Assigning click events to all buttons
$("#editStrategy").on("click", editStrategy);
$(document).on("click",".select-checkbox",checkbox_clicked);