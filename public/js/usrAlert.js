//***************************************************************** */
//  The following function provides a sleek message for the user    */
//  Type :  1= Warning, 2= OK                                       */
//***************************************************************** */
function usrAlert(title,message,btnText,type,reload){
if(type===1){

    $.confirm({
        icon: 'fa fa-warning',
        title: title,
        content: message,
        type: 'red',   
        buttons: {
                    delete: {text: btnText, btnClass: `btn-red`,
                    action: function(){
                        if(reload===true){location.reload()}
                    }  }
                }
        });
    }

if(type===2){
    $.confirm({
        icon: 'fa fa-thumbs-up',
        title: title,
        content: message,
        type: 'green',   
        buttons: {
                    delete: {text: btnText, btnClass: `btn-green`,
                    action: function(){
                        if(reload===true){location.reload()}
                    }  }
                }
        });
    }
};