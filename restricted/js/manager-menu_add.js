$(document).ready(function() {
    // Getting references to our form and input
    // let signUpForm = $("form.signup");
    // let emailInput = $("input#email-input");
    // let passwordInput = $("input#password-input");
    let nameInput = $("#name");
    let timeInput = $("#time_prepare");
    let costInput = $("#cost");
    let priceInput = $("#price");
    let incentiveInput = $("#incentive");
    let activeInput = $("#active");


    let menuForm = $("#menu");
    let mealSelect = $("#meal_type");
  
  
    // When the signup button is clicked, we validate the email and password are not blank
    menuForm.on("submit", function(event) {
      event.preventDefault();
  
      let meal_type_id = parseInt($('input[name=inlineRadioOptions]:checked').val(),0);
      let mealData = {
        name: nameInput.val().trim(),
        time_to_prepare: timeInput.val().trim(),
        meal_cost: costInput.val().trim(),
        meal_price: priceInput.val().trim(),
        meal_incentive: incentiveInput.val().trim(),
        active: true,
        meal_type_id: meal_type_id
      };
  
      if (!mealData.name || !mealData.time_to_prepare) {
        return;
      }
      // If we have an email and password, run the signUpUser function
      addMeal(mealData.name, mealData.time_to_prepare,mealData.meal_cost,mealData.meal_price,mealData.meal_incentive,mealData.active,mealData.meal_type_id);
    //   emailInput.val("");
    //   passwordInput.val("");
    });
  
    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function addMeal(name, time_to_prepare,meal_cost,meal_price,meal_incentive,active,meal_type_id) {
  
      $.post("/api/createmeal", {
        name: name,
        time_to_prepare: time_to_prepare,
        meal_cost: meal_cost,
        meal_price: meal_price,
        meal_incentive: meal_incentive,
        active: active,
        meal_type_id: meal_type_id,

      })
        .then(function(data) {
            // window.location.replace("/members");
            $.confirm({
              title: 'Success!!!!',
              content: 'A new meal created successfully',
              type: 'green',   
              buttons: {
                          delete: {text: 'Yay!!!', btnClass: 'btn-green',
                          action: function(){}  }
                        }
            });  // Jquery confirm
        })       // then
        .catch(handleLoginErr);
    };           // function
  
    function handleLoginErr(err) {
      $.confirm({
        title: 'Invalid credentials',
        content: err.responseJSON,
        type: 'red',   
        buttons: {
                    delete: {text: 'Understand', btnClass: 'btn-red',
                    action: function(){}  }
                  }
      });  // Jquery confirm  }
    };
  });