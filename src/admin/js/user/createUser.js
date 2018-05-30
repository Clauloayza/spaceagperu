var $ = require('jquery');
var req = require('../../../helpers/request');
var alert = require('../../../helpers/alert');
var listUsers = require('./listUsers');

module.exports = function() {
  var urlPath = '/admin/users';
  var props = {};
  $('#formCreateUser input.form-control').each(function() {
    props[$(this).attr('name')] = $(this).val();
  });
  $('#formCreateUser select.form-control').each(function() {
    props[$(this).attr('name')] = $(this).val();
  });

  req.post(urlPath, props, function(error, res) {
    if (error) {
      alert('danger', error.message);
    } else {
      alert('success', `Usuario ${res.properties.name}  ha sido creado!!`);
      listUsers();
      setTimeout(function() {
        $('#createUserCancel').trigger('click');
      }, 1000);
    }
  });
};
