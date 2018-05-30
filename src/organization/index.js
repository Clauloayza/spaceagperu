var $ = require('jquery');

//Dashboard requirements
require('../template')();
require('./css/style.css');
require('../helpers/redirect')();
require('../user')();

// Local requirements
require('./js/js/cascading')($, null);
var organization = require('./js/organization');
var crudProject = require('./js/crudProject');
var locations = require('./js/location');

$(document).ready(function($) {
  //Check if Exist the organization
  if (!localStorage.getItem('organizationId')) {
    //Muestra modal si el usuario aun no tiene organizacion
    document.getElementById('actionDisplayModalToCreateOrganization').click();
    $(document).on('click', '#actionCreateOrganization', function() {
      organization.CreateOrganization();
    });
  } else {
    // Display organization properties
    organization.setOrganizationProperties();
    // Display projects
    crudProject.listProjects();
  }
  //================================================================> ACTIONS CREATE PROJECT
  $(document).on('click', '#createProject', function() {
    crudProject.createProject();
  });
  $(document).on('click', '.deleteProject', function() {
    crudProject.deleteProject(
      $(this)
        .attr('id')
        .split('-')[1]
    );
  });
  $(document).on('click', '.displayFormToUpdate', function() {
    crudProject.displayFormToUpdate(
      $(this)
        .attr('id')
        .split('-')[1]
    );
  });
  $(document).on('click', '#updateProject', function() {
    crudProject.updateProject(); //TODO aun no actualiz  el proyecto
  });
  $(document).on('click', '.linktoproject', function() {
    var projectId = $(this).attr('id');
    localStorage.setItem('projectId', projectId);
    localStorage.removeItem('maplayerId');
    localStorage.removeItem('variableId');
    window.location.href = '/project.html?projectId=' + projectId;
  });

  //================================================================> JQUERY SELECT DINAMIC CREATEPROJECT

  $('#country').change(function() {
    var $locations = $('#location');
    var country = $(this).val(),
      lcns = locations[country] || [];

    var html = $.map(lcns, function(lcn) {
      return '<option value="' + lcn + '">' + lcn + '</option>';
    }).join('');
    $locations.html(html);
  });

  //================================================================> JQUERY SELECT DINAMIC EDITPROJECT
  $('.country').change(function() {
    var $locations = $('#city');
    var country = $(this).val(),
      lcns = locations[country] || [];

    var html = $.map(lcns, function(lcn) {
      return '<option value="' + lcn + '">' + lcn + '</option>';
    }).join('');
    $locations.html(html);
  });

  //================================================================> JQUERY SELECT DINAMIC CREATEPROJECT

  $('#country').change(function() {
    var $locations = $('#location');
    var country = $(this).val(),
      lcns = locations[country] || [];

    var html = $.map(lcns, function(lcn) {
      return '<option value="' + lcn + '">' + lcn + '</option>';
    }).join('');
    $locations.html(html);
  });

  //================================================================> JQUERY SELECT DINAMIC EDITPROJECT
  $('.country').change(function() {
    var $locations = $('#city');
    var country = $(this).val(),
      lcns = locations[country] || [];

    var html = $.map(lcns, function(lcn) {
      return '<option value="' + lcn + '">' + lcn + '</option>';
    }).join('');
    $locations.html(html);
  });
});

$(document).ready(function() {
  $('#organizaciones-load').click(function() {
    $('.organizaciones-load li:not(:first-child)').toggle();
  });
});

$(document).ready(function() {
  $('#variables-load').click(function() {
    $('.variables-load li:not(:first-child)').toggle();
  });
});
