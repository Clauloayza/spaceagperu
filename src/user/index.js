var $ = require('jquery');
var crudUser = require('./js/crudUser');

module.exports = function() {
  $(document).ready(function($) {
    //Display properties
    crudUser.setUserProperties();
    //User Actions
    $(document).on('click', '#logout', function() {
      crudUser.logout();
    });
    //Clear the localstorage when click en exit.
    // $(document).click(function(e) {
    // 	if (e.pageY <= 1) {
    // 		window.onbeforeunload = function() {
    // 			localStorage.clear();
    // 		}
    // 	}
    // });
  });
};
