var $ = require('jquery');
var req = require('../../helpers/request');
var alert = require('../../helpers/alert');

module.exports = function() {
  req.getA('/users', function(error, res) {
    if (error) {
      alert('warnig', error.message);
      return;
    }
    $('#perfilUser-name').text(res.properties.name);
    $('#perfilUser-email').text(res.properties.email);
    $('#perfilUser-mobile').text(res.properties.mobile);
    $('#perfilUser-telephone').text(res.properties.telephone);
    $('#perfilUser-title').text(res.properties.title);
    $('#perfilUser-organization').text(localStorage.getItem('orgName'));
    $('#perfilUser-role').text(res.scope[0]);
    $('#perfilUser-access').text(res.access.projects);
    $('#perfilUser-createdAt').text(res.createdAt);
    $('#perfilUser-updatedAt').text(res.updatedAt);
  });
};
