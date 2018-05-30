var $ = require('jquery');
var req = require('../../../helpers/request');
var alert = require('../../../helpers/alert');
var listUsers = require('./listUsers');
var userId;
module.exports = {
  setUserId: function(uid) {
    userId = uid;
  },
  changeUserScope: function() {
    var urlPath = `/admin/users/${userId}/scope`;
    var props = {
      scope: $('#scopeType option:selected').val()
    };

    req.put(urlPath, props, function(error, res) {
      if (error) {
        alert('danger', error.message);
      } else {
        alert('success', `Rol del usuario ha sido cambiado`);
        listUsers();
        setTimeout(function() {
          $('#changeUserScopeCancel').trigger('click');
        }, 1000);
      }
    });
  }
};
