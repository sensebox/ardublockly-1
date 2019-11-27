/**
 * Login process with OSEM Account
 * @param none
 */
Ardublockly.logIn = function () {

  // Validate E-Mail:
  function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  if (!validateEmail(document.getElementById('email').value)) return;

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.opensensemap.org/users/sign-in",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
    },
    "data": JSON.stringify({
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    })
  }

  $.ajax(settings)
    .fail(function (response) {
      if (response.status === 403) {
        document.getElementById('email').classList.add('invalid');
        document.getElementById('password').classList.add('invalid');
        document.getElementById('wrongCredentials').classList.remove('hide');
      }
    })
    .done(function (response) {
      if (response.code === "Authorized") {
        // Set JWT token
        window.sessionStorage.setItem('sb_accessToken', response.token);
        window.sessionStorage.setItem('sb_refreshToken', response.refreshToken);
        $('#login_modal').closeModal();

        // Display name in navbar
        $('#login_name')[0].innerHTML = response.data.user.name;

        // Show Dropdown
        $('#acc-dropdown').css('visibility', 'visible')

        Ardublockly.isLoggedIn = true;
      }
    });
}

/**
 * Tries to recover a session by checking if there is an existing JWT token
 * @param none
 * @return true if the session was recovered, false if not
 */
Ardublockly.recoverSession = function () {
  let refreshToken = sessionStorage.getItem('sb_refreshToken');
  if (refreshToken != null) {

    var settings = {
      "crossDomain": true,
      "url": "https://api.opensensemap.org/users/refresh-auth",
      "method": "POST",
      "headers": {
        "Content-Type": "application/json"
      },
      "data": JSON.stringify({
        "token": refreshToken
      })
    }

    $.ajax(settings).fail(function (response) {
      return false;
    }).done(function (response) {

      window.sessionStorage.setItem('sb_accessToken', response.token);
      window.sessionStorage.setItem('sb_refreshToken', response.refreshToken);

      // Display name in navbar
      $('#login_name')[0].innerHTML = response.data.user.name;

      // Show Dropdown
      $('#acc-dropdown').css('visibility', 'visible');
      Ardublockly.user = response.data.user;
      Ardublockly.isLoggedIn = true;
      return true;
    });

  } else {
    return false;
  }
}


/**
 * Logs the user out, deletes tokens and registers tokens as
 * invalid with the OSEM API
 * @param none
 */
Ardublockly.logOut = function () {
  if (Ardublockly.isLoggedIn === false) return;

  let accessToken = sessionStorage.getItem('sb_accessToken');

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.opensensemap.org/users/sign-out",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + accessToken,
      "cache-control": "no-cache"
    }
  }

  $.ajax(settings).done(function (response) {
  });

  sessionStorage.removeItem('sb_accessToken');
  sessionStorage.removeItem('sb_refreshToken');
  location.reload();
}


/**
 * Initializes the frontend for retrieving a forgotten password
 * @param none
 */
Ardublockly.initForgotPassword = function () {
  // First hide the login fields
  !document.getElementById('loginForm').classList.contains('hide') && document.getElementById('loginForm').classList.add('hide');
  !document.getElementById('registerForm').classList.contains('hide') && document.getElementById('registerForm').classList.add('hide');
  !document.getElementById('wrongCredentials_forgotPW').classList.contains('hide') && document.getElementById('wrongCredentials_forgotPW').classList.add('hide');

  document.getElementById('forgotPasswordForm').classList.remove('hide');
}


/**
 * Sends a HTTP Request to the OSEM API requesting an email for password reset
 * @param none
 */
Ardublockly.submitForgotPassword = function () {

  function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  if (!validateEmail(document.getElementById('forgotPasswordEmail').value)) {
    document.getElementById('wrongCredentials_forgotPW').classList.remove('hide');
    return;
  }

  // Hide message if the email was valid
  document.getElementById('wrongCredentials_forgotPW').classList.add('hide');

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.opensensemap.org/users/request-password-reset",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
    },
    "data": JSON.stringify({
      email: document.getElementById('forgotPasswordEmail').value
    })
  }

  // Call API with above settings to request email.
  $.ajax(settings)
    .fail((err) => {
      Materialize.toast('Error while requesting password Reset', 4000);
    })
    .done((response) => {

      Materialize.toast('Check your E-Mail inbox!', 4000)
      Ardublockly.initLogin();

    })
}


/**
 * Sends a HTTP Request to the OSEM API to register a new account.
 * @param none
 */
Ardublockly.registerAccount = function () {
  function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  let name = document.getElementById('registerName').value;
  let mail = document.getElementById('registerEmail').value;
  let passwd = document.getElementById('registerPassword').value;
  let passwd_verify = document.getElementById('registerPassword_verify').value;

  // Input Validation
  if (!validateEmail(mail)) return document.getElementById('registerEmail').classList.add('invalid');
  if (passwd !== passwd_verify) {
    document.getElementById('registerPassword').classList.add('invalid');
    document.getElementById('registerPassword_verify').classList.add('invalid');
    return;
  }

  // If everything works, we remove the invalid class (if it was wrong before)
  document.getElementById('registerEmail').classList.remove('invalid');
  document.getElementById('registerPassword').classList.remove('invalid');
  document.getElementById('registerPassword_verify').classList.remove('invalid');

  // Now send the request

  var newUser = {
    "name" : document.getElementById('registerName').value,
    "email" : document.getElementById('registerEmail').value,
    "password" : document.getElementById('registerPassword').value
  }
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.opensensemap.org/users/register",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json"
    },
    "processData": false,
    "data": JSON.stringify(newUser)
  }
  
  $.ajax(settings).done(function (response) {
    if (response.code === "Created") {
      // Set JWT token
      window.sessionStorage.setItem('sb_accessToken', response.token);
      window.sessionStorage.setItem('sb_refreshToken', response.refreshToken);
      $('#login_modal').closeModal();
      // Display name in navbar
      $('#login_name')[0].innerHTML = response.data.user.name;
      // Show Dropdown
      $('#acc-dropdown').css('visibility', 'visible')
      Ardublockly.isLoggedIn = true;
    }
  }).fail(function (err) {
    var errormsg = JSON.parse(err.responseText).message;
    Materialize.toast(errormsg, 4000);
  });
}


/**
 * Helper Function to switch back to the standard login screen
 * @param none
 */
Ardublockly.initLogin = function () {
  !document.getElementById('forgotPasswordForm').classList.contains('hide') && document.getElementById('forgotPasswordForm').classList.add('hide');
  !document.getElementById('registerForm').classList.contains('hide') && document.getElementById('registerForm').classList.add('hide');
  document.getElementById('loginForm').classList.remove('hide');
}

/**
 * Helper Function to initialize the create account screen
 * @param none
 */

Ardublockly.initRegisterAccount = function () {
  !document.getElementById('forgotPasswordForm').classList.contains('hide') && document.getElementById('forgotPasswordForm').classList.add('hide');
  !document.getElementById('loginForm').classList.contains('hide') && document.getElementById('loginForm').classList.add('hide');
  document.getElementById('registerForm').classList.remove('hide');
}