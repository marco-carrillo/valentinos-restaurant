//****************************************************************************/
// This file contains functionality to be able to log-in to the application  */
// Only supposed to be used by Valentino's partners.  However, this is not   */
// a restricted area, since most everyone should be able to access this one  */
// For the project, we will leave it under the general public menu.          */
//****************************************************************************/

$(document).ready(function() {
  // Getting references to our form and inputs
  let loginForm = $("form.login");
  let emailInput = $("input#email-input");
  let passwordInput = $("input#password-input");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    event.preventDefault();
    let userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    console.log('validated email and pwd not empty');

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(function() {
        window.location.replace("/valentino-members");

        // If there's an error, log the error
      })
      .catch(function(err) {

      //*******************************************************************************/
      // The following function provides a message that the user is not  authorized   */
      //*******************************************************************************/
      usrAlert('Invalid credentials','Please try again, or see your manager for assistance','Got it!!!',1,false);
      });    // catch
  }          // function
});          // Document ready
