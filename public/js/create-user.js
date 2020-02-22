$(document).ready(function() {
  // Getting references to our form and input
  let signUpForm = $("form.signup");
  let emailInput = $("input#email-input");
  let passwordInput = $("input#password-input");


  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();

    let role_id = parseInt($('input[name=inlineRadioOptions]:checked').val(),0);
    let userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      role_id:  role_id,
      salary: 0
    };

    console.log(userData);


    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password,userData.role_id,userData.salary);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password,roleid,salary) {

    $.post("/api/createuser", {
      email: email,
      password: password,
      role_id: roleid,
      salary: salary
    })
      .then(function(data) {
          // window.location.replace("/members");
          console.log(data);
          alert(alert);
          $.confirm({
            title: 'Success!!!!',
            content: 'Valentino partner created successfully',
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
    // $("#alert .msg").text(err.responseJSON);
    // $("#alert").fadeIn(500);
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
