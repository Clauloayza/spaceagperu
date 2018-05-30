var $ = require('jquery');
var req = require('../../../helpers/request');
var alert = require('../../../helpers/alert');
var _ = require('underscore');

var dataTable = $('#tableUsers').DataTable({
  columns: [
    {
      title: 'Id'
    },
    {
      title: 'Email'
    },
    {
      title: 'Nombre'
    },
    {
      title: 'Telefono'
    },
    {
      title: 'Rol'
    },
    {
      title: 'Accesos'
    },
    {
      title: 'Acciones'
    }
  ],
  paginate: false,
  lengthChange: false,
  language: {
    url: '//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json'
  }
});

module.exports = function() {
  dataTable.clear().draw();
  var organizationId = localStorage.getItem('organizationId');
  var urlPath = '/admin/users';
  req.getA(urlPath, function(error, users) {
    if (error) {
      alert('danger', error.message);
      return;
    }
    _.each(users, function(userProps, k) {
      var htmlScope = `<a class="btn btn-warning displayModalUserScope" href="#" id="scope-${
        userProps.id
      }" data-toggle="modal" data-target="#displayModalUserScope">
        <i class="fa fa-cogs"></i>
        </a>`;

      var htmlAccess = `<a class="btn btn-info displayModalForUserAccess" href="#" id="edit-${
        userProps.id
      }" data-toggle="modal" data-target="#displayModalForUserAccess">
        <i class="fa fa-random"></i>
        </a>`;

      var htmlDelete = `<a class="btn btn-danger diaplayUserInfoToRemove" id="delete-${
        userProps.id
      }" href="#" data-toggle="modal" data-target="#displayModalToRemoveUser">
        <i class="fa fa-trash-o "></i>
        </a>`;

      var html = '';
      if (userProps.scope[0] === 'admin') {
        html = htmlScope;
      } else {
        html = htmlScope + htmlAccess + htmlDelete;
      }

      var row = [
        userProps.id,
        userProps.email,
        userProps.properties.name,
        userProps.properties.mobile,
        userProps.scope[0],
        formatAccess(userProps.access),
        html
      ];
      dataTable.row.add(row).draw();
    });
  });
};

function formatAccess(access) {
  if (_.keys(access.projects).length === 0) {
    return '<div class="alert alert-secondary" role="alert">-</div>';
  }

  if (access.projects == '*') {
    return '<div class="alert alert-secondary" role="alert">*</div>';
  }
  var projects = _.values(access.projects);
  var html = '';
  for (var i = 0; i < projects.length; i++) {
    html += `<div class="alert alert-secondary" role="alert">
    <strong> Proyecto: </strong> ${projects[i].name} <br>`;
    var textCategories = [projects[i].categories];
    if (textCategories[0] !== '*') {
      textCategories = projects[i].categories.map(function(o) {
        return o.categoryName;
      });
    }
    html += `<strong> Categorias: </strong> ${textCategories.join(',')} </div>`;
  }
  return html;
}
