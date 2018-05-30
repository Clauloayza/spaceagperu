var $ = require('jquery');
var Q = require('jquery');
var _ = require('underscore');
//Dashboard requirements
require('../template')();
require('../helpers/redirect')();
require('../user')();
require('./css/style.css');
require('./js/validation')();
var organization = require('./../organization/js/organization');
var createVariable = require('./js/createVariable');
var listVariables = require('./js/listVariables');
var displayCodeToUpdate = require('./js/displayCodeToUpdate');
var stateVariable = require('./js/stateVariable');

$(document).ready(function($) {
  organization.setOrganizationProperties();
  //================================================================> LIST VARIABLES
  listVariables();
  //================================================================> ACTIONS CREATE VARIABLE
  $(document).on('click', '#actionDisplayModalToCreateVariable', function() {
    createVariable.listCategories();
  });
  $(document).on('click', '#createVariable', function() {
    createVariable.createVariable();
  });
  //================================================================> MONSTRAR CODIGO PARA ACTUALIZAR
  $(document).on('click', '.codeVariable', function(e) {
    var variableId = $(this)
      .attr('id')
      .split('-')[1];
    displayCodeToUpdate(variableId);
  });

  //================================================================> REMOVE VARIABLE
  $('#tableVariables tbody').on('click', 'td .disableVariable', function(e) {
    e.preventDefault();
    var table = $('#tableVariables').DataTable();
    var variable = table.row($(this).closest('tr')).data();
    if (confirm(`Desea deshabilitar la variable: ${variable[2]}`)) {
      stateVariable(variable[1]);
    }
  });

  $('#tableVariables tbody').on('click', 'td .enableVariable', function(e) {
    e.preventDefault();
    var table = $('#tableVariables').DataTable();
    var variable = table.row($(this).closest('tr')).data();
    if (confirm(`Desea habilitar la variable: ${variable[2]}`)) {
      stateVariable(variable[1]);
    }
  });
});
