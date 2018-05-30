var $ = require('jquery');
var request = require('../../helpers/request');
var alert = require('../../helpers/alert');
require('./validation')();

module.exports = {
  UpdateUser: function() {
    var urlPath = '/users';
    var user = {
      name: $('#name').val(),
      title: $('#title').val(),
      telephone: $('#telephone').val(),
      mobile: $('#mobile').val()
    };
    request.put(urlPath, user, function(error, result) {
      if (error) {
        alert('danger', `Error, usuario no se creo!! ${error.response.data.message}`);
        // setTimeout(function() {
        //   $('#okUpdateUser').hide();
        // }, 4000);
      } else {
        alert('success', 'Su usuario se actualizo satisfactoriamente');
        setTimeout(function() {
          localStorage.clear();
          window.location.href = '/perfil.html';
        }, 4000);
      }
    });
  }
};
