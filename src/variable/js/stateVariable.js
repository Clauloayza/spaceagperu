var $ = require('jquery');
var req = require('../../helpers/request');
var alert = require('../../helpers/alert');
var _ = require('underscore');
var listVariables = require('./listVariables');

module.exports = function(variableId) {
  var organizationId = localStorage.getItem('organizationId');
  var urlPath = `/api/v1/organizations/${organizationId}/variables/${variableId}`;
  req.delete(urlPath, function(error, res) {
    if (error) {
      alert('danger', error);
    } else {
      if (res.state) {
        alert('warning', 'Variable ha sido habilitado!');
      } else {
        alert('warning', 'Variable ha sido deshabilitado!');
      }
      listVariables();
    }
  });
};
