require('./css/login.css');
var $ = require('jquery');
var auth = require('./js/auth');
var crudUser = require('./js/crudUser');

//Vemos si existe el token
if (localStorage.getItem('token')) {
  window.location.href = '/organization.html';
}

$(document).ready(function($) {
  //====================================================> login
  $('#login').click(function() {
    auth.getToken(function(response) {
      if (response) {
        //Store variables in the browser
        localStorage.clear();
        localStorage.setItem('name', response.name);
        if (response.organization) localStorage.setItem('organizationId', response.organization.id);
        localStorage.setItem('token', response.token);
        // Redirect to dashboards
        window.location.href = '/organization.html';
      } else {
        $('#unauthorized')
          .show()
          .delay(2000)
          .hide(1000);
      }
    });
  });

  $('#loginregister').keypress(function(e) {
    var key = e.which;
    if (key == 13) {
      $('#login').click();
      return false;
    }
  });
  //===================================================>create user
  $(document).on('click', '#signup', function() {
    crudUser.createUser();
  });
});
