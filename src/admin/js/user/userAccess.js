var $ = require('jquery');
var req = require('../../../helpers/request');
var alert = require('../../../helpers/alert');
var listUsers = require('./listUsers');

var propsAccess = {};
var userId;
module.exports = {
  listProjects: function(id) {
    userId = id;
    var urlPath = `/api/v1/organizations/${localStorage.getItem('organizationId')}/projects`;
    $('#accessProject').empty();
    $('#accessProject').append('<option value="0">Selecione un projecto</option>');
    req.getA(urlPath, function(error, result) {
      if (error) {
        alert('danger', error.message);
        return;
      }
      for (var i = 0; i < result.length; i++) {
        var project = result[i];
        $('#accessProject').append(`<option value="${project.id}">${project.name}</option>`);
        console.log(project);
      }
    });
  },
  listCategories: function() {
    $('#accessCategories').empty();
    var urlPath = `/api/v1/categories`;
    req.getA(urlPath, function(error, result) {
      if (error) {
        alert('danger', error.message);
        return;
      }
      for (var i = 0; i < result.length; i++) {
        var category = result[i];
        $('#accessCategories').append(`<option value="${category.id}">${category.name}</option>`);
      }
    });
  },
  addAccessToProject: function() {
    var projectId = $('#accessProject option:selected').val();
    if (projectId == '0') {
      alert('warning', 'Selecione un proyecto');
      return;
    }
    var projectName = $('#accessProject option:selected').text();
    propsAccess[projectId] = {
      name: projectName,
      categories: []
    };

    if ($('#accessCategoryAll').is(':checked')) {
      propsAccess[projectId].categories = '*';
    } else {
      $('#accessCategories option:selected').map(function(i, el) {
        var categoryId = $(el).val();
        var categoryName = $(el).text();
        propsAccess[projectId].categories.push({
          categoryId,
          categoryName
        });
      });
    }
    displayProjectAccess();
    setdefaultAccessForm();
  },
  removeAccessProject: function(projectId) {
    delete propsAccess[projectId];
    displayProjectAccess();
  },
  createUserAccess: function() {
    var urlPath = `/admin/users/${userId}/changeAccess`;
    var props = {
      access: propsAccess
    };
    req.put(urlPath, props, function(error, res) {
      if (error) {
        alert('danger', error.message);
        return;
      }
      alert('success', 'Se cambio los accesos del usuario');
      listUsers();
      propsAccess = {};
      $('#cancelUserAccess').trigger('click');
      displayProjectAccess();
    });
  }
};

function displayProjectAccess() {
  $('#listProjectsAdded').empty();
  for (var projectId in propsAccess) {
    var textCategories = [propsAccess[projectId].categories];
    if (textCategories[0] !== '*') {
      textCategories = propsAccess[projectId].categories.map(function(v) {
        return v.categoryName;
      });
    }
    $('#listProjectsAdded').append(`<div class="alert alert-warning alert-dismissible fade show" role="alert">
        Proyecto : <strong> ${propsAccess[projectId].name}</strong> <br>
        Categorias : <strong> ${textCategories.join(',')}</strong> 
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true" class="removeAccessProject" id="remove-${projectId}">×</span>
        </button>
        </div>`);
  }
}

function setdefaultAccessForm() {
  $('#accessProject').val($('#accessProject option:first').val());
  $('#accessCategories').val();
  $('#accessCategoryAll').trigger('click');
}
