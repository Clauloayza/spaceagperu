var $ = require('jquery');
var request = require('../../helpers/request');
var validation = require('./validation');
validation();
//Global projects
var projectList = {};
module.exports = {
  createUser: function() {
    var urlPath = '/users';
    var user = {
      name: $('#name').val(),
      email: $('#gmail').val(),
      title: $('#title').val(),
      telephone: $('#telephone').val(),
      mobile: $('#mobile').val(),
      password: $('#passwordSignup').val()
    };
    request.post(urlPath, user, function(error, result) {
      if (error) {
        $('#errorCreateUser').show();
        $('#errorCreateUser').text(`Error, usuario no se creo!! ${error.response.data.message}`);
        setTimeout(function() {
          $('#okCreateUser').hide();
        }, 4000);
      } else {
        $('#okCreateUser')
          .text('Su usuario se creo satisfactoriamente')
          .show();
        setTimeout(function() {
          localStorage.clear();
          window.location.href = '/';
        }, 4000);
      }
    });
  }
};
