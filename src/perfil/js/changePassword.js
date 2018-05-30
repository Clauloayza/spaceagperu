var $ = require('jquery');
var req = require('../../helpers/request');
var alert = require('../../helpers/alert');
var validation = require('../js/validation');

module.exports = function() {
  var props = {
    password: $('#fieldChangePassword').val()
  };
  req.put('/users/password', props, function(error, res) {
    if (error) {
      alert('warnig', error.message);
      return;
    } else {
      alert('success', 'Su contraseña ha sido cambiado correctamente!!');
      setTimeout(function() {
        $('#changePasswordCancel').trigger('click');
      }, 1000);
    }
  });
};
