var $ = require('jquery');
var _ = require('underscore');
var request = require('../../helpers/request');
var validation = require('./validation');

require('./validation')();
var alert = require('sweetalert');
//Global projects
var projectList = {};
module.exports = {
  listProjects: function() {
    var urlPath = `/api/v1/organizations/${localStorage.getItem('organizationId')}/projects`;
    console.log(urlPath);
    request.get(urlPath, function(result) {
      if (result) {
        for (var i = 0; i < result.length; i++) {
          var project = result[i];
          projectList[project.id] = project;
          var html = `
				  <div class="col-sm-4 col-lg-3">
				    <div class="card text-white bg-success">
				      <div class="card-body">
				        <div class="btn-group float-right">
				          <button type="button" class="btn btn-transparent dropdown-toggle p-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				          <i class="fa fa-wrench"></i>
				          </button>
				          <div class="dropdown-menu dropdown-menu-right">
				            <a class="dropdown-item displayFormToUpdate" id="edit-${
                      project.id
                    }" data-toggle="modal"  data-target="#displayModalToEditProject"href="#"><i class="fa fa-pencil"></i>Editar</a>
                    <a class="dropdown-item deleteProject" id="delete-${project.id}" href="#"><i class="fa fa-trash"></i>Eliminar</a>
                    <div id="errorCreateVariable" class="alert alert-danger" role="alert" style="display: none;">
                    </div>
                    <div id="okCreateVariable" class="alert alert-success" role="alert" style="display: none;">
                    </div>
				          </div>
				        </div>
				        <div class="h4 mb-0"><a id="${project.id}" class="linktoproject" href="#">${project.name}</a></div>
				        <small class="text-muted text-uppercase font-weight-bold"> <i class="fa fa-map-marker" aria-hidden="true"></i> ${project.city}, ${
            project.country
          }</small>
				        
				      </div>
				    </div>
				  </div>`;
          $('#projects').append(html);
        }
      } else {
        //TODO - Display the error
      }
    });
  },
  createProject: function() {
    var urlPath = `/api/v1/organizations/${localStorage.getItem('organizationId')}/projects`;
    console.log(urlPath);
    var props = {};
    //Recolect all imput variables
    $('#formCreateProject input.form-control').each(function() {
      props[$(this).attr('name')] = $(this).val();
    });
    $('#formCreateProject select.form-control').each(function() {
      props[$(this).attr('name')] = $(this).val();
    });
    //enviar el request al servidor
    request.post(urlPath, props, function(error, result) {
      if (error) {
        $('#errorCreateProject')
          .show()
          .delay(3000)
          .hide(1000);
      } else {
        location.reload();
      }
    });
  },
  deleteProject: function(projectId) {
    var urlPath = `/api/v1/organizations/${localStorage.getItem('organizationId')}/projects/${projectId}`;
    console.log(urlPath);
    request.delete(urlPath, function(error, result) {
      if (error) {
        alert('danger', error);
      } else {
        alert('success', 'Delete Project!');
        location.reload();
      }
    });
  },
  displayFormToUpdate: function(projectId) {
    var urlPath = `/api/v1/organizations/${localStorage.getItem('organizationId')}/projects/${projectId}`;
    console.log(urlPath);
    _.each(projectList[projectId], function(v, k) {
      $(`input[name$='${k}']`).val(v);
      $(`#${k}`).val([v]);
    });
  },
  updateProject: function() {
    //Recolect all imput variables
    var props = {};
    $('#formUpdateProject input.form-control').each(function() {
      props[$(this).attr('name')] = $(this).val();
    });
    $('#formUpdateProject select.form-control').each(function() {
      props[$(this).attr('name')] = $(this).val();
    });

    var urlPath = `/api/v1/organizations/${localStorage.getItem('organizationId')}/projects/${props.id}`;
    console.log(urlPath);
    delete props.id;
    console.log(props);
    request.put(urlPath, props, function(error, result) {
      if (error) {
        $('#errorUpdateProject')
          .show()
          .delay(3000)
          .hide(1000);
      } else {
        location.reload();
      }
    });
  }
};
