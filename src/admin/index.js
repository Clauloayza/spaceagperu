var $ = require('jquery');
var _ = require('underscore');

//Dashboard requirements
require('./css/style.css');
require('../template')();
require('../helpers/redirect')();
require('../user')();
require('./js/validation')();
var organization = require('../organization/js/organization');
var removeUser = require('./js/user/removeUser');
var createUser = require('./js/user/createUser');
var listUsers = require('./js/user/listUsers');
var userAccess = require('./js/user/userAccess');
var changeScope = require('./js/user/changeScope');

$(document).ready(function($) {
  organization.setOrganizationProperties();
  listUsers();
  //===============================================================> create user
  $(document).on('click', '#createUser', function() {
    createUser();
  });
  //===============================================================> Remove user
  $('#tableUsers tbody').on('click', 'td .diaplayUserInfoToRemove', function(e) {
    e.preventDefault();
    var table = $('#tableUsers').DataTable();
    var user = table.row($(this).closest('tr')).data();
    if (confirm(`Desea eliminar al usuario ${user[2]}`)) {
      removeUser(user[0]);
    }
  });

  //===========================================================> changeset access
  $(document).on('click', '.displayModalForUserAccess', function(e) {
    e.preventDefault();
    var userId = $(this)
      .attr('id')
      .split('-')[1];
    userAccess.listProjects(userId);
    userAccess.listCategories();
    $('#contentCategory').hide();
  });

  $(document).on('click', '#accessCategoryCustomized', function() {
    $('#contentCategory').show();
  });
  $(document).on('click', '#accessCategoryAll', function() {
    $('#contentCategory').hide();
  });

  $(document).on('click', '#addAccessToProject', function() {
    userAccess.addAccessToProject();
  });

  $(document).on('click', '.removeAccessProject', function(e) {
    e.preventDefault();
    var projectId = $(this)
      .attr('id')
      .split('-')[1];
    userAccess.removeAccessProject(projectId);
  });

  $(document).on('click', '#createUserAccess', function() {
    userAccess.createUserAccess();
  });

  //==========================================================> change role
  //
  $(document).on('click', '.displayModalUserScope', function(e) {
    e.preventDefault();
    var userId = $(this)
      .attr('id')
      .split('-')[1];
    changeScope.setUserId(userId);
  });

  $(document).on('click', '#changeUserScope', function(e) {
    e.preventDefault();
    changeScope.changeUserScope();
  });
});
