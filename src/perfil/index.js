var $ = require('jquery');
var _ = require('underscore');
var validation = require('./js/validation');
require('./css/style.css');
require('./js/validation')();

//Dashboard requirements
require('./css/style.css');
require('../template')();
require('../helpers/redirect')();
require('../user')();
var organization = require('../organization/js/organization');
var perfilUser = require('./js/perfilUser');
var changePassword = require('./js/changePassword');

$(document).ready(function($) {
  organization.setOrganizationProperties();
  perfilUser();
  //========================================> Cabiar contrasena
  $(document).on('click', '#changePassword', function(e) {
    changePassword();
  });
  //actualizar user
  $(document).on('click', '#update', function() {
    crudPerfil.UpdateUser();
  });
});
