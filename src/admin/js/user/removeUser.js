var $ = require('jquery');
var req = require('../../../helpers/request');
var alert = require('../../../helpers/alert');
var listUsers = require('./listUsers');

module.exports = function(userId) {
  var urlPath = `/admin/users/${userId}`;
  req.delete(urlPath, function(error, res) {
    if (error) {
      alert('danger', error);
    } else {
      alert('success', 'Usuario Eliminado!');
      listUsers();
    }
  });
};
